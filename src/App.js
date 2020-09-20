import React from 'react';
import './App.css';
import Bar from './Bar';
import Content from './Content';
import ParallaxEffect from './ParallaxEffect/ParallaxEffect';
import PoweredBy from './PoweredBy/PoweredBy';

//


function App() {
  return (
    <div className="App container" >
      <h1>Clima</h1>
      <Bar />
      <Content />
      <ParallaxEffect />
      <PoweredBy />
    </div>
  );
}

export default App;
