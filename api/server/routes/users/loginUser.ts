import { Router } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { getUserByLogin } from './getUser.js';

const loginUser = Router();

// const sessions = {}; // use Redis in future

loginUser.post('/', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Missing password or login' });
  const user = await getUserByLogin(login) as Record<string, any>;
  if (!user) return res.status(401).json({ error: 'User not found in DB' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const sessionId = crypto.randomBytes(32).toString('hex');
  //   sessions[sessionId] = { userId: user.id, createdAt: Date.now() };

  res.cookie('session', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ ok: true, userId: user.id, login: user.login });
});

// loginUser.get('/api/me', (req, res) => {
//   const sessionId = req.cookies.session;
//   const session = sessions[sessionId];
//   if (!session) return res.status(401).json({ error: 'Not authenticated' });
//   res.json({ userId: session.userId });
// });

// logout.post('/api/logout', (req, res) => {
// //   const sid = req.cookies.session;
// //   delete sessions[sid];
//   res.clearCookie('session');
//   res.json({ ok: true });
// });

// loginUser.listen(3000);

export default loginUser;
