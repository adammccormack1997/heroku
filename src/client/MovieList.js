import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Movie from './Movie';
import axios from 'axios';
import './app.css';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [] };
  }
  // when componement mounts make get trequest for all modules
  componentDidMount() {
    axios.get('api/movies') // asks api for lecturers
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // take lecturer data and map to each lecturer componenet// componenet defined in lecturer.js
    const movieList = this.state.movies.map(u => (
      <Movie
        key={u._id}
        id={u._id}
        movie={u.movie}
        year={u.year}
        cast={u.cast}
        genres={u.genres}
        image={u.image}
      />
    ));

    return (
      <div>
        <h2 className="subtitle">All Movies</h2>
        <div className = "columns is-multiline">{movieList}</div>
      </div>
    );
  }
}

export default MovieList;
