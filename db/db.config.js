import 'dotenv/config';
import mysql2 from 'mysql2/promise';

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const ensurePrams = (params) => {
  if(params === undefined || params === null) {
    throw new Error('Params cannot be undefined or null');
  }
  const isArray = Array.isArray(params);
  const isObject = typeof params === 'object' && !isArray;  
  if (!isArray && !isObject) {
    throw new Error('Params must be an array or an object');
  }
};

export const safeExcute= async(query, params) => {
  if(typeof query !== 'string' || query.trim().length === 0) {
    throw new Error('Invalid query');
  }

  ensurePrams(params);
  const [rows] = await db.execute(query, params);
  return rows;
};

export default db;