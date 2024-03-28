const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(cors());

const pool = new Pool({
  // Configure your PostgreSQL connection details here
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.get('/search', async (req, res) => {
  const term = req.query.term;

  try {
    const result = await pool.query(
      'SELECT * FROM papers WHERE title ILIKE $1 OR authors ILIKE $1',
      [`%${term}%`]
    );

    res.json({ papers: result.rows });
  } catch (error) {
    console.error('Error searching papers:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});