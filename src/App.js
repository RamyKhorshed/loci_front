import React, { Component } from 'react';
import logo from './logo.svg';
import Container from './Components/Container';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header">Welcome to Loci</h1>
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        </header>
        <Container />
      </div>
    );
  }
}

export default App;
