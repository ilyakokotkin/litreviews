import React from 'react';
import './App.css';
import SearchPapers from './components/SearchPapers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to LitReviews</p>
        <SearchPapers />
      </header>
    </div>
  );
}

export default App;

