import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import Container from './Container';
import './App.css';
import {api} from '../api'
import Navbar from './Navbar';
import Login from './Login';

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
      <div className="App">
        <header className="App-header">
          <Navbar
         color="blue"
         title="Painterest"
         description="our app"
         icon="paint brush"
         currentUser={this.state.auth.user}
         handleLogout={this.logout}
       />
       <div className="ui container grid">
          <div id="content" className="sixteen wide column">
            <Route
              exact
              path="/login"
              render={props => <Login {...props} handleLogin={this.login} />}
            />
          </div>
        </div>
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        </header>
        <Container />
      </div>
    );
  }
}

export default App;
