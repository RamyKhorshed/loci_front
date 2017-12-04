import React, { Component } from 'react';
import logo from './logo.svg';
import Container from './Container';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="header">Welcome to Loci</h1>
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        </header>
        <Container />
      </div>
    </Router>
    );
  }
}

export default App;
