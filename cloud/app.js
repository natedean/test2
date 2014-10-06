
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
      res.render('home', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id
                                   });
    });
  }else{
    res.render('home', { message: 'Welcome ', n: "Guest", u: ""});
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
      res.render('spellThatChord', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id,
                                     score: user.get("stcScore")
                                   });
    });
  }else{
    res.render('spellThatChord', { message: 'Welcome ', n: "Guest", u: "", score: 0 });
  }

});

app.get('/music-theory-master', function(req, res) {
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('musicTheoryMaster', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id,
                                     score: user.get("stcScore")
                                   });
    });
  }else{
    res.render('musicTheoryMaster', { message: 'Welcome ', n: "Guest", u: "", score: 0 });
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
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email."});
  }else if(req.body.username.length > 10){
    res.render('login', {loginMessage: "",signupMessage: "Username cannot exceed 10 characters. Try a shorter one."});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, gtScore: 0, ACL: new Parse.ACL()}).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message});
    });
  }
  
  
});

// Clicking submit on the login form triggers this.
app.post('/login-stc', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/spell-that-chord');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: error.message,signupMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup-stc', function(req, res) {
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email."});
  }else if(req.body.username.length > 10){
    res.render('login', {loginMessage: "",signupMessage: "Username cannot exceed 10 characters. Try a shorter one."});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, ACL: new Parse.ACL()}).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/spell-that-chord');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message});
    });
  }
});

// Attach the Express app to Cloud Code.
app.listen();
