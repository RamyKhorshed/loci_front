import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Search} from 'semantic-ui-react'

const Navbar = props => {
  const currentUser = props.currentUser;
  const loggedIn = !!props.currentUser.id;
  return (
    <div className={`ui top fixed inverted ${props.color} menu`}>
        {loggedIn ? (
          <Link to="/" className="item">
            <a className="item">Welcome {currentUser.username}</a>
          </Link>
        ) : null}
      <div className="right menu">

        {loggedIn ? (
          <a className="item">
            <Link to="/Snippets">
              <div className="ui primary inverted button">{currentUser.username}'s Snippets</div>
            </Link>
          </a>
        ) : null}
        {loggedIn ? (
          <a className="item">
            <div
              onClick={() => {
                props.handleLogout();
                props.history.push('/login');
              }}
              className="ui primary button"
            >
              Sign Out
            </div>
          </a>
        ) : (
        <div>
          <a className="item">
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          </a>
        </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
