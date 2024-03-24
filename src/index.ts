import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import axios from 'axios';

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection configuration
const pool = new Pool({
// TODO
});

interface Review {
	paperId: string;
	review: string;
}

app.get('/', (req: Request, res: Response) => {
  const { term } = req.query;

  try {
	  const response = await axios.get 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi', {
      params: {
        db: 'pubmed',
        term: term,
        retmode: 'json',
      },
    });
});

const paperIds = response.data.esearchresult.idlist;

// Search endpoint
app.get('/search', async (req: Request, res: Response) => {
  const { term } = req.query;

  try {
    // Search for the paper in your database
    const paperResult = await pool.query('SELECT * FROM papers WHERE title ILIKE $1', [`%${term}%`]);

    if (paperResult.rows.length > 0) {
      // Paper found in the database
      const paperId = paperResult.rows[0].id;

      // Retrieve associated reviews from the database
      const reviewsResult = await pool.query('SELECT * FROM reviews WHERE paper_id = $1', [paperId]);

      res.json({
        paper: paperResult.rows[0],
        reviews: reviewsResult.rows,
      });
    } else {
      // Paper not found in the database, fetch from PubMed or Google Scholar API
      const response = await axios.get('https://api.example.com/search', {
        params: {
          query: term,
        },
      });

      const paperData = response.data;

      // Save the paper details in your database
      const insertResult = await pool.query(
        'INSERT INTO papers (title, authors, year, affiliations, link) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [paperData.title, paperData.authors, paperData.year, paperData.affiliations, paperData.link]
      );

      const newPaper = insertResult.rows[0];

      res.json({
        paper: newPaper,
        reviews: [],
        message: 'No reviews available for this paper. Would you like to leave the first review?',
      });
    }
  } catch (error) {
    console.error('Error searching papers:', error);
    res.status(500).json({ error: 'An error occurred while searching papers' });
  }
});

// Review submission endpoint
app.post('/reviews', async (req: Request, res: Response) => {
  const { paperId, content } = req.body;

  try {
    // Save the review in your database
    await pool.query('INSERT INTO reviews (paper_id, content) VALUES ($1, $2)', [paperId, content]);

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'An error occurred while submitting the review' });
  }
});
