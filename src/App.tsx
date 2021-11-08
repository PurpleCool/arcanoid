import React from 'react';
import Board from './components/GameField/GameField';
import Controls from './components/Controls/Controls';
import './App.scss'

function App() {
  return (
    <div className="App">
      <Board />
      <Controls />
    </div>
  );
}

export default App;
