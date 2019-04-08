import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };

    this.updateReviews = this.updateReviews.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/movies/${this.props.match.params.id}/reviews`) // asks api for all movies /movieId/reviews
      .then(response => {
        this.setState({ reviews: response.data });
      })
      .catch(error => {
        console.log(error);
      }); // implemented in server side code
    this.updateReviews();
  }

  updateReviews() {
    // make a GET request to the server for the user data, store it in state
    axios.get('api/reviews')
      .then(response => {
        this.setState({ reviews: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(reviewId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete('api/reviews', {
        data: {
          id: reviewId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateReviews();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // take  each individual review and map into react component
    const reviewList = this.state.reviews.map(u => (
      <Review
        key={u._id}
        id={u._id}
        name={u.name}
        rating={u.rating}
        review={u.review}
      />
    ));

    return (
      <div>
        {reviewList.length ?
          <div>
            <h2>All Reviews</h2>
            <div>{reviewList}</div></div> :
          <h2>No Reviews</h2> }
        <Link to={'/create-review'}>
          <a class="button">
            Create New Review
          </a>
        </Link>
      </div>
    );
  }
}

const Review = (props) => {
  return (
    <div>
      <h1 className = "title">Name: {props.name}</h1>
      <h2 className = "subtitle"> Rating: {props.rating}</h2>
      <p className = "subtitle is-5">Review: {props.review}</p>
    </div>
  );
};

export default ReviewList;
