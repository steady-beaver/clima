import React from 'react';
import './App.css';
import Bar from './Bar';
import Content from './Content';
import PoweredBy from './PoweredBy/PoweredBy';

//


function App() {
  return (
    <div className="App container" >
      <h1>El clima</h1>
      <Bar />
      <Content />
      <PoweredBy />
     
    </div>
  );
}

export default App;
