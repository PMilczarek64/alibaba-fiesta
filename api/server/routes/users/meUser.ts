import express from 'express';

const meUser = express.Router();

meUser.get('/', (req, res) => {
  const session = req.session as any;
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  res.json({ userId: session?.userId, login: session?.login });
});

export default meUser;