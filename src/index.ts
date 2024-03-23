import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('PubMed Review Service');
});

// Mock search endpoint
app.get('/search', (req: Request, res: Response) => {
  res.json({
    papers: [
      { id: "1", title: "Sample Paper 1", authors: ["Author One", "Author Two"], link: "https://example.com/paper1" },
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
;
