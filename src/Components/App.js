import React, { Component } from 'react';
import logo from './logo.svg';
import Container from './Container';
import Login from './Login';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { api } from '../Services/api';

class App extends Component {


  constructor() {
    super();

    this.state = {
      auth: {
        user: {}
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('there is a token');
      // make a request to the backend and find our user
      api.auth.getCurrentUser().then(user => {
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: data };
    console.log(data);
    localStorage.setItem('token', data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { user: {} } });
  };

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="header">Welcome to Loci</h1>
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        </header>
        <Route
          exact
          path="/"
          render={props => <Login {...props} handleLogin={this.login} />}
        />
        <Route
          path="/search"
          component={Container}
        />
      </div>
    </Router>
    );
  }
}

export default App;
