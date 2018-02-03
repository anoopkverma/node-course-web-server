const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
})

// User defined Midleware
app.use((req, res, next) => {
  let now = new Date().toString();
  fs.appendFile('server.log', `${now} ${req.method} : ${req.url}\n`, (error) => {
    if (error) {
      console.log(error);
    }
  });
  next();
})

//user defined middleware for handling maintenance situations.
app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "My Website"
  });
});

app.get('/details', (req, res) => {
  res.send({
    error: 'Unable to connect the server.',
    name: 'domain.name.in',
    likes: [
      'playing cricket',
      'watching movies',
      'listening old songs',
    ]
  });
});
app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
