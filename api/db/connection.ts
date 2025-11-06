import mysql, { Connection }from 'mysql2/promise';
import dotenv from 'dotenv';
import session, { Store } from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

dotenv.config();

let db: Connection | null = null;
let sessionStore: Store | null = null;

export async function connectToDB() {
  if (db) return { db, sessionStore }; // already connected

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const MySQLStore = MySQLStoreFactory(session);
    sessionStore = new MySQLStore( {
      expiration: 24 * 60 * 60 * 1000,
      createDatabaseTable: true,
    }, db as any);
    console.log('✅ Connected to MySQL!');
    return { db, sessionStore };
  } catch (err) {
    console.error('❌ MySQL connection failed:', err);
    throw err;
  }
}