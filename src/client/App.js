import React, { Component } from 'react';
import { Link, HashRouter, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Movie from './Movie';
import Secret from './Secret';
import MovieList from './MovieList';
import ReviewList from './ReviewList';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import CreateReview from './Components/CreateReview';
import EditReview from './Components/EditReview';


class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login() {
    this.setState({loggedIn: true});
  }


  render() {
    return (
      <div>
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" className="navbar-brand">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/movie">View Movies</Link>
            {!this.state.loggedIn && <Link className="navbar-item" to="/login">Login</Link>}
            {!this.state.loggedIn && <Link className="navbar-item" to="/register">Register</Link>}
            {!this.state.loggedIn && <Link className="navbar-item" to="/logout">Logout</Link>}
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/review/:id" component={ReviewList}/>
          <Route path="/edit/:id" component={EditReview} />
          <Route path="/create-review" component={CreateReview} />
          <Route path="/movie" component={withAuth(MovieList)} />
          <Route path="/register" component={Register} />
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;
