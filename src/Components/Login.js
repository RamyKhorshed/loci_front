import React from 'react';
import { api } from '../Services/api';
import { Link } from 'react-router-dom';
import {Segment,  Grid, Label, Header} from 'semantic-ui-react'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }
  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      api.auth.getCurrentUser().then(user => {
        if (user.error) {
          this.props.history.push('/login');
        }
        else {
          this.props.history.push('/');
        }

      });
    }
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.auth.login(this.state.fields).then(res => {
      if (!res.error) {
        this.props.handleLogin(res);
        this.props.history.push('/');
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>

        <Segment very padded basic>
          <Header as="h1" color="blue"> Welcome to Loci</Header>
        </Segment>

        {this.state.error ? <Segment very padded basic><Label basic padded color='red' >Incorrect Username/Password Combination</Label> </Segment>: null}

        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Login
            </button>
            <Link to="/user/new">
                <div className="ui basic blue button">Create New User</div>
            </Link>
          </form>
        </div>
      </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
