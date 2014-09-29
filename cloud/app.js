
var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.cookieParser('YOUR_SIGNING_SECRET'));
app.use(parseExpressCookieSession({ fetchUser: true, cookie: { maxAge: 3600000 } }));



// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/', function(req, res) {
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('home', { message: 'Welcome Home ' + user.get("username") + '!' });
    });
  }else{
    res.render('home', { message: 'Welcome Home!' });
  }
  
});

app.get('/nashville-number-system', function(req, res) {
  res.render('nns');
});

app.get('/chord-chart-builder', function(req, res) {
  res.render('chartbuilder');
});

app.get('/spell-that-chord', function(req, res) {
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('spellThatChord', { message: 'Welcome Home ' + user.get("username") + '!' });
    });
  }else{
    res.render('spellThatChord', { message: 'Welcome Home!' });
  }

});

// You could have a "Log In" link on your website pointing to this.
app.get('/login', function(req, res) {
  // Renders the login form asking for username and password.
  res.render('login.ejs',{loginMessage: "",signupMessage: ""});
});

// You could have a "Log Out" link on your website pointing to this.
app.get('/logout', function(req, res) {
  Parse.User.logOut();
  res.redirect('/');
});

// Clicking submit on the login form triggers this.
app.post('/login', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: error.message,signupMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup', function(req, res) {
  Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, ACL: new Parse.ACL()}).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: "",signupMessage: error.message});
  });
});




// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
