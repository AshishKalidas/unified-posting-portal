import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const port = 3000;

// Enable CORS for http://localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

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
