
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import axios from 'axios';

const app = express();
const port = 3000;

// Enable CORS for the origin that matches the client origin
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:8080',
      /\.lovableproject\.com$/
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    let allowed = false;
    for (const allowedOrigin of allowedOrigins) {
      if (typeof allowedOrigin === 'string' && origin === allowedOrigin) {
        allowed = true;
        break;
      } else if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
        allowed = true;
        break;
      }
    }
    
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json()); // for parsing application/json

// In-memory storage for tokens (for demo purposes only)
// Replace with database or secure storage in production
const tokenStore = new Map();

// Store for Instagram verification
const instagramVerification = {
  token: crypto.randomBytes(16).toString('hex'), // Generate a random verify token
  mode: 'subscribe'
};

// Endpoint for Instagram webhook verification
app.get('/instagram/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === instagramVerification.mode && token === instagramVerification.token) {
    // Respond with the challenge to confirm the verification
    console.log('Instagram webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    // Verification failed
    console.error('Instagram webhook verification failed');
    res.status(403).send('Verification failed');
  }
});

// Return the verification token for client use
app.get('/auth/instagram/verification-token', (req, res) => {
  res.send({ token: instagramVerification.token });
});

// Handle Instagram token exchange
app.post('/auth/instagram/exchange-token', async (req, res) => {
  try {
    const { code, redirect_uri, client_id, client_secret } = req.body;
    
    if (!code || !redirect_uri || !client_id || !client_secret) {
      return res.status(400).json({ 
        error: true, 
        error_message: 'Missing required parameters'
      });
    }
    
    // Exchange code for access token with Instagram API
    const tokenUrl = 'https://api.instagram.com/oauth/access_token';
    const formData = new URLSearchParams();
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirect_uri);
    formData.append('code', code);
    
    const tokenResponse = await axios.post(tokenUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (tokenResponse.data.error_message) {
      return res.status(400).json({ 
        error: true, 
        error_message: tokenResponse.data.error_message 
      });
    }

    const accessToken = tokenResponse.data.access_token;
    const userId = tokenResponse.data.user_id;
    
    // Fetch basic user data from Instagram Graph API
    const profileUrl = `https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`;
    const profileResponse = await axios.get(profileUrl);

    // Store token
    tokenStore.set(userId, { 
      accessToken, 
      username: profileResponse.data.username,
      provider: 'instagram'
    });
    
    // Return success with user data
    res.json({ 
      success: true,
      userId: userId,
      username: profileResponse.data.username
    });
    
  } catch (error) {
    console.error('Instagram token exchange error:', error);
    res.status(500).json({ 
      error: true, 
      error_message: error.message || 'Failed to exchange token'
    });
  }
});

// Handle TikTok token exchange
app.post('/auth/tiktok/exchange-token', async (req, res) => {
  try {
    const { code, redirect_uri, client_key, client_secret } = req.body;
    
    if (!code || !redirect_uri || !client_key || !client_secret) {
      return res.status(400).json({ 
        error: true, 
        error_message: 'Missing required parameters'
      });
    }

    // Exchange code for access token with TikTok API
    const tokenUrl = 'https://open-api.tiktok.com/oauth/access_token/';
    const params = new URLSearchParams({
      client_key,
      client_secret,
      code,
      grant_type: 'authorization_code',
      redirect_uri
    });
    
    const tokenResponse = await axios.post(`${tokenUrl}?${params.toString()}`);
    
    if (tokenResponse.data.error) {
      return res.status(400).json({ 
        error: true, 
        error_message: tokenResponse.data.error.description
      });
    }

    const data = tokenResponse.data.data;
    const accessToken = data.access_token;
    const openId = data.open_id;
    
    // Store token
    tokenStore.set(openId, { 
      accessToken, 
      username: `tiktok_user_${openId.substr(0, 5)}`,
      provider: 'tiktok'
    });
    
    // Return success with user data
    res.json({ 
      success: true,
      userId: openId,
      username: `tiktok_user_${openId.substr(0, 5)}`
    });
    
  } catch (error) {
    console.error('TikTok token exchange error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: true, 
      error_message: error.message || 'Failed to exchange token'
    });
  }
});

app.post('/auth/instagram/store-token', (req, res) => {
  const { accessToken, userId, username } = req.body;
  if (!accessToken || !userId || !username) {
    return res.status(400).send({ message: 'Missing access token, user ID, or username' });
  }

  // Store token in memory
  tokenStore.set(userId, { accessToken, username, provider: 'instagram' });
  console.log('Storing token for user ' + username + ' (ID: ' + userId + ')');
  
  res.send({ message: 'Token stored successfully' });
});

// Endpoint to retrieve user's tokens
app.get('/auth/user-tokens', (req, res) => {
  // In a real app, you'd authenticate this request
  // Here we just return all tokens for demo purposes
  const tokens = Array.from(tokenStore.entries()).map(([userId, data]) => ({
    userId,
    username: data.username,
    provider: data.provider
  }));
  
  res.send({ tokens });
});

// Endpoint to check if a user is connected
app.get('/auth/check-connection/:provider/:userId', (req, res) => {
  const { provider, userId } = req.params;
  
  if (tokenStore.has(userId)) {
    const userData = tokenStore.get(userId);
    if (userData.provider === provider) {
      return res.send({ isConnected: true, username: userData.username });
    }
  }
  
  res.send({ isConnected: false });
});

// Generic social media API proxy endpoint
app.post('/api/social/:provider/:endpoint', (req, res) => {
  const { provider, endpoint } = req.params;
  const { userId, data } = req.body;
  
  if (!tokenStore.has(userId)) {
    return res.status(401).send({ message: 'User not authenticated' });
  }
  
  const userData = tokenStore.get(userId);
  if (userData.provider !== provider) {
    return res.status(401).send({ message: 'Provider mismatch' });
  }
  
  // Here you would make actual API calls to the social media platform
  // For demo, we return mock data
  console.log(`API call to ${provider}/${endpoint} with data:`, data);
  
  // Mock API response
  res.send({
    success: true,
    data: {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/', (req, res) => {
  res.send('Social Media Manager Server is running!');
});

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
  console.log(`Instagram verify token: ${instagramVerification.token}`);
});
