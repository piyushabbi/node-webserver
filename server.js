const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Register Partials
hbs.registerPartials(__dirname+'/views/partials');

// Configure hbs
app.set('view engine', 'hbs');

// Express Middleware to log data related to req made by the page.
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  fs.appendFileSync('server.log', log+'\n');
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Add middleware function to serve up static html directory
// Here, Public directory is served
app.use(express.static(__dirname+'/public'));

/**
 * http handler for setting routes
 * @param url
 * @param callback to send data based on the req
 */
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    name: "Piyush",
    likes: ['eating', 'sleeping'],
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear()
  })
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error Accessing Page'
  });
});

// App hosts to this port
app.listen(port, () => {
  console.log(`Server is running n port ${port}!`);
});
