import React, { Component } from 'react';
import logo from './logo.svg';
import Container from './Container';
import Login from './Login';
import Navbar from './Navbar';
import NewUser from './NewUser';
import FullSnippetList from './FullSnippetList';
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
      currentSnippet:[],
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
        this.setState({ auth: updatedState });
      }).then(this.getSnippet).then(this.getUsers())
      ;
    }
  }

  currentSnippetUpdate = (currentSnippet) => {
    this.setState({
      ...this.state,
      currentSnippet
    });
  }

  removeCurrentSnippet = (index) => {
    let newArray = []
    newArray = this.state.currentSnippet
    delete newArray[index]
    this.currentSnippetUpdate(newArray)
  }

  removeSnippet = (index) => {
    let newArray = []
    newArray = this.state.snippetInfo
    delete newArray[index]
    this.setState({
      ...this.state,
      snippetInfo:newArray
    });
    this.updateDatabase(index)
  }

  // Set State for Snippet Information
  snippetUpdate = (snippetInfo) => {
    let array = []
    array = this.state.snippetInfo
    array.push(snippetInfo)
    this.setState({
      ...this.state,
      snippetInfo:array
    });
  }

  updateDatabase = (index) =>{
    let user_id = this.state.auth.user.id
    let URL = "http://localhost:3000/api/v1/users/"+user_id

    fetch(URL, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          user_id,
          index
        }
      )
    })
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
        data.forEach((user) => fetchArray.push([user.username, user.id]))
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
    console.log(this.state.userInfo)
    return (
      <Router>
      <div className="App">
        <Navbar
          currentUser={this.state.auth.user}
          userInfo={this.state.userInfo}
          handleLogout={this.logout} />
        <header className="App-header">
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
          render={props => <Container {...props}
            snippetUpdate={this.snippetUpdate}
            user={this.state.auth.user}
            currentSnippet={this.state.currentSnippet}
            currentSnippetUpdate={this.currentSnippetUpdate}
            removeCurrentSnippet={this.removeCurrentSnippet}
          />}
        />
        <Route
          path="/Snippets"
          render={props =><FullSnippetList {...props}
            snippetInfo={this.state.snippetInfo}
            removeSnippet={this.removeSnippet}
          />}
        />
      </div>
    </Router>
    );
  }
}

export default App;
