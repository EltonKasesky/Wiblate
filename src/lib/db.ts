// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// export const query = async (text: string, params: (string | number)[]) => {
//   try {
//     const client = await pool.connect();
//     try {
//       // Log the query and parameters for debugging
//       console.log('Executing query:', text);
//       console.log('With parameters:', params);

//       const res = await client.query(text, params);
//       return res.rows;
//     } finally {
//       client.release();
//     }
//   } catch (error) {
//     console.error('Database query error:', error);
//     throw error;
//   }
// };

import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

export const query = async (text: string, params: (string | number)[]) => {
  try {
    const client = await pool.connect();
    try {
      console.log('Executing query:', text);
      console.log('With parameters:', params);

      const res = await client.query(text, params);
      return res.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};