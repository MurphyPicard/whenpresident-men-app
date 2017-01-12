var express = require('express');
var app = express();
var hbs = require('hbs');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var Candidate = require('./db/connection');
var mongoose = require('mongoose');


//Mongoose Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:whenpresident');

//Config hbs
app.set('view engine', 'hbs');
app.set('views', './views');

//Middleware
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

//Home
app.get('/', (req, res) => {
  res.render('app-welcome');
});

//Index
app.get('/candidates', (req, res) => {
  Candidate.find()
    .then((candidates) => {
      res.render('candidates-index', {
        candidates
      });
    })
    .catch((err) => {
      if(err)console.log(err);
    });

});

app.get('/candidates/new', (req, res) => {
  res.render('candidates-new');
});

//Show
app.get('/candidates/:id', (req, res) => {
  Candidate.findOne({_id: req.params.id})
    .then((candidate) => {
      res.render('candidates-show', {
        candidate
    })
    .catch((err) => {
      if(err)console.log(err);
    });
  })
});

//Create
app.post('/candidates', (req, res) => {
  Candidate.create(req.body.candidate)
    .then((candidate) => {
      res.redirect(`/candidates/${candidate._id}`);
    })
    .catch((err) => {
      if(err)console.log(err);
    });
});


app.listen(3001, () => {
  console.log('//******* LISTENING ON PORT 3001 *********//');
});
