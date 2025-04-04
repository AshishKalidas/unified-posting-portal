import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS for http://localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use(express.json()); // for parsing application/json

app.post('/auth/instagram/store-token', (req, res) => {
  const { accessToken, userId, username } = req.body;
  if (!accessToken || !userId || !username) {
    return res.status(400).send({ message: 'Missing access token, user ID, or username' });
  }

  // In-memory storage for tokens (for demo purposes only)
  // Replace with database or secure storage in production
  console.log('Storing token for user ' + username + ' (ID: ' + userId + ')');
  // Here you would typically store the token in a database
  res.send({ message: 'Token stored successfully' });
});

app.get('/', (req, res) => {
  res.send('Social Media Manager Server is running!');
});

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
});