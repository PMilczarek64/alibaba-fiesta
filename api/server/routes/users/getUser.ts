import { Router } from 'express';
import { connectToDB } from '../../../db/connection.js';

const getUser = Router();

getUser.post('/', async (req, res) => {
  const { login } = req.body;
  if (!login) {
    return res.status(400).json({ success: false, message: 'User login is required' });
  }

  try {
    const db = await connectToDB();
    const [rows] = await db.execute(
      'SELECT id FROM users WHERE login = ?',
      [login],
    );
    console.log(rows); //TODO: add user login logic
    // if ((rows as any).length === 0) return res.status(404).json({ success: false, message: 'User not found' });

  } catch (err) {
    console.error('❌ Failed to delete user:', err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  res.json({
    success: true,
    message: `🗑️ Sending user with ID: ${'a'}`, //TODO:
    params: {},
  });
});

export default getUser;