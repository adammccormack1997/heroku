const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');

const Movie = require('./models/Movie');
const Review = require('./models/Review');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb+srv://adammccormack97:Zzxxcc123@moviedb-wzivq.mongodb.net/test?retryWrites=true';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/movie', withAuth, function(req, res) {
  res.send('This is a movie');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get('/api/movies', function(req, res) {
  Movie.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/reviews', function(req, res) {
  Review.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/movies/:id', function(req, res) {
  Movie.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/movies/:id/reviews', function(req, res) {
  Movie.findOne({_id: req.params.id}, function(err, data) { // find lec by id by one provided in url parameters.
    if (err) throw err;// go find modules
    Review.find({movie_id: data._id}, function(err, reviews) {
      if (err) throw err;

      res.send(reviews); // sent back to module list
    });
  });
});

// delete review with specific ID from DB
app.delete('/api/reviews', (req, res) => {
  Review.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// create new review based on info supplied in request body
app.post('/api/reviews', (req, res) => {
  db.collection('reviews').insertOne(req.body, (err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});
// update review based on info supplied in request body
app.put('/api/reviews', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  Review.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(process.env.PORT || 8080);
