import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use a variável de ambiente correta
  ssl: {
    rejectUnauthorized: false, // Dependendo do banco de dados, pode ser necessário
  },
});

export const query = async (text: string, params: (string | number)[]) => {
  try {
    const client = await pool.connect();
    try {
      // Log the query and parameters for debugging
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
