import React, { Component } from 'react';
import logo from './logo.svg';
import Container from './Container';
import Login from './Login';
import Navbar from './Navbar';
import NewUser from './NewUser';
import SnippetList from './SnippetList';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route} from 'react-router-dom';
import { api } from '../Services/api';

class App extends Component {


  constructor() {
    super();

    this.state = {
      auth: {
        user: {}
      },
      snippetInfo:[],
      userInfo:[]
    };
  }


  // Find Our User
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('there is a token');
      api.auth.getCurrentUser().then(user => {
        const updatedState = { ...this.state.auth, user: user };
        console.log(updatedState)
        this.setState({ auth: updatedState });
      }).then(this.getSnippet).then(this.getUsers)
      ;
    }
  }

  // Set State for Snippet Information
  snippetUpdate = (snippetInfo) => {
    this.setState({
      ...this.state,
      snippetInfo
    });
  }

  // Get Snippets
  getSnippet = () => {
    let user_id = this.state.auth.user.id
    let URL = "http://localhost:3000/api/v1/users/"+user_id

    fetch(URL).then((resp)=> {
      return resp.json()
    }).then((data) => {
      let   fetchArray = []
      if (!!data) {
        data.snippets.forEach((snippet) => fetchArray.push([snippet.title, snippet.content]))
        var snippetInfo = this.state.snippetInfo.slice()
        snippetInfo=fetchArray;
        this.setState({
           ...this.state,
           snippetInfo
         });
      }
      }
    )
  }

  getUsers = () => {
    let URL = "http://localhost:3000/api/v1/users"

    fetch(URL).then((resp)=> {
      return resp.json()
    }).then((data) => {
      let   fetchArray = []
      if (!!data) {
        data.forEach((user) => fetchArray.push([user.username, user.first_name, user.last_name]))
        var userInfo = this.state.userInfo.slice()
        userInfo=fetchArray;
        this.setState({
           ...this.state,
           userInfo
         });
      }
      }
    )
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: data };
    localStorage.setItem('token', data.jwt);
    this.setState({ auth: updatedState });
    this.getSnippet()
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { user: {} } });
  };

  render() {
    return (
      <Router>
      <div className="App">
        <Navbar
          currentUser={this.state.auth.user}
          userInfo={this.state.userInfo}
          handleLogout={this.logout} />
        <header className="App-header">
          <h1 className="header">Welcome to Loci</h1>
          <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        </header>
        <Route
          path="/user/new"
          render={props => <NewUser {...props} handleLogin={this.login} />}
          />
        <Route
          path="/login"
          render={props => <Login {...props} handleLogin={this.login} />}
        />
        <Route
          exact
          path="/"
          render={props => <Container {...props}  snippetUpdate={this.snippetUpdate} user={this.state.auth.user} snippetInfo={this.state.snippetInfo} />}
        />
        <Route
          path="/Snippets"
          render={props =><SnippetList {...props}  snippetInfo={this.state.snippetInfo}/>}
        />
      </div>
    </Router>
    );
  }
}

export default App;
