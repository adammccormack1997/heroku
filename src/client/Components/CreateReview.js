import React, {Component} from 'react';
import axios from 'axios';

export default class CreateReview extends Component {

  constructor(props) {
    super(props);

    this.onChangeReviewName = this.onChangeReviewName.bind(this);
    this.onChangeReviewReview = this.onChangeReviewReview.bind(this);
    this.onChangeReviewRating = this.onChangeReviewRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      review_name: '',
      review_review: '',
      review_rating: '',
      review_completed: false
    };
  }

  onChangeReviewName(e) {
    this.setState({
      review_name: e.target.value
    });
  }

  onChangeReviewReview(e) {
    this.setState({
      review_review: e.target.value
    });
  }

  onChangeReviewRating(e) {
    this.setState({
      review_rating: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('Form submitted:');
    console.log(`Review Name: ${this.state.review_name}`);
    console.log(`Review Review: ${this.state.review_review}`);
    console.log(`Review Rating: ${this.state.review_rating}`);
    console.log(`Review Completed: ${this.state.review_completed}`);

    const newReview = {
      review_name: this.state.review_name,
      review_review: this.state.review_review,
      review_rating: this.state.review_rating,
      review_completed: this.state.review_completed
    };

    axios.post('/api/reviews', newReview)
      .then(res => console.log(res.data));

    this.setState({
      review_name: '',
      review_review: '',
      review_rating: '',
      review_completed: false
    });
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Review</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input className="input" type="text" placeholder="Enter Name"
              value={this.state.review_name}
              onChange={this.onChangeReviewName}
            />

          </div>
          <div className="form-group">
            <label>Rating: </label>
            <input className="input" type="text" placeholder="Enter Your Rating"
              value={this.state.review_review}
              onChange={this.onChangeReviewReview}
            />
          </div>


          <div className="form-group">
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Terrible"
                checked={this.state.review_rating === 'Terrrible'}
                onChange={this.onChangeReviewRating}
              />
              <label className="form-check-label">Terrible</label>
            </div>
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Okay"
                checked={this.state.review_rating === 'Okay'}
                onChange={this.onChangeReviewRating}
              />
              <label className="form-check-label">Okay</label>
            </div>
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Amazing"
                checked={this.state.review_rating === 'Amazing'}
                onChange={this.onChangeReviewRating}
              />
              <label className="form-check-label">Amazing</label>
            </div>
          </div>
          <a class="button">
                Create Review
          </a>
        </form>
      </div>
    );
  }
}
