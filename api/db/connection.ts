import mysql, { Connection }from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let db: Connection | null = null;

export async function connectToDB() {
  if (db) return db; // already connected

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to MySQL!');
    return db;
  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
    throw err;
  }
}

export default db;
