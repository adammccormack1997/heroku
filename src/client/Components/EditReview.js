import React, {Component} from 'react';
import axios from 'axios';

export default class EditReview extends Component {

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

  componentDidMount() {
    axios.get('/api/reviews/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          review_name: response.data.review_namee,
          review_review: response.data.review_review,
          review_rating: response.data.review_ratingy,
          review_completed: response.data.review_completed
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  onChangeReviewCompleted(e) {
    this.setState((prevState,props) => ({
      review_completed: !prevState.review_completed
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      _id: this.props.match.params.id,
      review_name: this.state.review_name,
      review_review: this.state.review_review,
      review_rating: this.state.review_rating,
      review_completed: this.state.review_completed
    };
    axios.put('/api/reviews/', obj)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Update Review</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input  type="text"
              className="form-control"
              value={this.state.review_name}
              onChange={this.onChangeReviewName}
            />
          </div>
          <div className="form-group">
            <label>Review: </label>
            <input  type="text"
              className="form-control"
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
                checked={this.state.review_rating === 'Terrible'}
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
            <div className="form-check">
              <input  type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeReviewCompleted}
                checked={this.state.review_completed}
                value={this.state.review_completed}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
              </label>
            </div>
            <br/>
            <div className="form-group">
              <input type="submit" value="Update Review" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
