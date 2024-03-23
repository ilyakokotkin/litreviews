import React, { useState } from 'react';
import axios from 'axios';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  link: string;
}

const SearchPapers: React.FC = () => {
  const [term, setTerm] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  
  const searchPapers = async (term: string) => {
    const response = await axios.get(`http://localhost:4000/search?term=${term}`);
    setPapers(response.data.papers);
  };

  return (
    <div>
      <input type="text" placeholder="Search papers..." onChange={(e) => searchPapers(e.target.value)} />
      <ul>
        {papers.map((paper) => (
          <li key={paper.id}>
            <a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}</a> by {paper.authors.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPapers;

