import React from 'react';
import './App.css';
import SearchPapers from './components/SearchPapers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Paper Review Platform</p>
        <SearchPapers />
      </header>
    </div>
  );
}

export default App;

