import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


class Movie extends React.Component {
  render() {
    return (
      <div className="column is-4">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt='Profile' src={this.props.image}></img>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
                <p className="title is-4">Genre: {this.props.genres}</p>
                {this.props.cast ? <p className="subtitle">Cast: {this.props.cast}</p> : null}
                <Link to={`/review/${this.props.id}`}>
                  <a class="button">
                        View Reviews
                  </a>
                </Link>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Movie;
