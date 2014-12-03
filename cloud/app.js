
var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var app = express();
var routes = require('cloud/routes.js');


app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.cookieParser('YOUR_SIGNING_SECRET'));
app.use(parseExpressCookieSession({ fetchUser: true, cookie: { maxAge: 3600000 * 24 * 30} }));

// ROUTING
app.get('/', routes.home);
app.get('/nashville-number-system', routes.nns);
app.get('/chord-chart-builder', routes.chartBuilder);
app.get('/spell-that-chord', routes.spellThatChord);
app.get('/music-theory-master', routes.musicTheoryMaster);
app.get('/guitar-chord-game', routes.guitarChordGame);
app.get('/login', routes.login);
app.get('/logout', routes.logout);

// -------------------------- END ROUTING ----------------------------------------------------

var maxCharacters = 14;
var defaultSignupMessage = "Username cannot exceed 14 characters. Try a shorter one.";

// Clicking submit on the login form triggers this.
app.post('/login', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: error.message,signupMessage: "",resetMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup', function(req, res) {
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email.",resetMessage: ""});
  }else if(req.body.username.length > maxCharacters){
    res.render('login', {loginMessage: "",signupMessage: defaultSignupMessage,resetMessage: ""});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, mtmScore: 0, gcgScore: 0, gtScore: 0, ACL: new Parse.ACL() }).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message,resetMessage: ""});
    });
  } 
});

// Clicking submit on the login form triggers this.
app.post('/reset', function(req, res) {
  Parse.User.requestPasswordReset(req.body.email, {
    success:function() {
        res.render('login', {loginMessage: "",signupMessage: "",resetMessage: "Password email has been sent"});
    },
    error:function(error) {
        res.render('login', {loginMessage: "",signupMessage: "",resetMessage: error.message});
    }
});
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
    res.render('login', {loginMessage: error.message,signupMessage: "",resetMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup-stc', function(req, res) {
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email.",resetMessage: ""});
  }else if(req.body.username.length > maxCharacters){
    res.render('login', {loginMessage: "",signupMessage: defaultSignupMessage,resetMessage: ""});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, mtmScore: 0, gcgScore: 0, gtScore: 0, ACL: new Parse.ACL() }).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/spell-that-chord');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message,resetMessage: ""});
    });
  }
});

// Clicking submit on the login form triggers this.
app.post('/login-mtm', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/music-theory-master');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: error.message,signupMessage: "",resetMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup-mtm', function(req, res) {
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email.",resetMessage: ""});
  }else if(req.body.username.length > maxCharacters){
    res.render('login', {loginMessage: "",signupMessage: defaultSignupMessage,resetMessage: ""});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, mtmScore: 0, gcgScore: 0, gtScore: 0, ACL: new Parse.ACL() }).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/music-theory-master');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message,resetMessage: ""});
    });
  }
});

// Clicking submit on the login form triggers this.
app.post('/login-gcg', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/guitar-chord-game');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {loginMessage: error.message,signupMessage: "",resetMessage: ""});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup-gcg', function(req, res) {
  if(req.body.email === ""){
    res.render('login', {loginMessage: "",signupMessage: "You must have an email address. If you lose your password, it can be recovered via email.",resetMessage: ""});
  }else if(req.body.username.length > maxCharacters){
    res.render('login', {loginMessage: "",signupMessage: defaultSignupMessage,resetMessage: ""});
  }else{
      Parse.User.signUp(req.body.username, req.body.password, { email: req.body.email, stcScore: 0, mtmScore: 0, gcgScore: 0, gtScore: 0, ACL: new Parse.ACL() }).then(function() {
      // Login succeeded, redirect to homepage.
      // parseExpressCookieSession will automatically set cookie.
      res.redirect('/guitar-chord-game');
    },
    function(error) {
      // Login failed, redirect back to login form.
      res.render('login', {loginMessage: "",signupMessage: error.message,resetMessage: ""});
    });
  }
});

// Attach the Express app to Cloud Code.
app.listen();
