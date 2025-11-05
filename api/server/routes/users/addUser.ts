import { Router } from 'express';
import { connectToDB } from '../../../db/connection.js';
import { OkPacketParams } from 'mysql2';

const addUser = Router();

addUser.post('/', async (req, res) => {
  const { username, passwordHash } = req.body;
  if (!username || !passwordHash) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  let newUserId = null;

  try {
    const db = await connectToDB();
    const [result] = await db.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
    newUserId = result.constructor.name === 'OkPacket' ? (result as OkPacketParams)?.insertId : null;
  } catch (err: any) {
    console.error('❌ MySQL error during user insert:', err?.message);
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  res.json({
    success: true,
    message: '✅ User added successfully',
    params: {
      newUserId,
    },
  });
});

export default addUser;