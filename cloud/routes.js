exports.home = function(req,res){
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('home', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id});
    });
  }else{
    res.render('home', { message: 'Welcome ', n: "Guest", u: ""});
  }
}

exports.nns = function(req,res){
  res.render('nns');
}

exports.chartBuilder = function(req,res){
  res.render('chartbuilder');
}

exports.spellThatChord = function(req,res){
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
}

exports.musicTheoryMaster = function(req,res){
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('musicTheoryMaster', {  message: 'Logged in as ',
                                         n: user.get("username"),
                                         u: user.id
                                   });
    });
  }else{
    res.render('musicTheoryMaster', { message: 'Welcome ', n: "Guest", u: "" });
  }  
}

exports.guitarChordGame = function(req,res){
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('guitarChordGame', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id
                                   });
    });
  }else{
    res.render('guitarChordGame', { message: 'Welcome ', n: "Guest", u: ""});
  }
}

exports.login = function(req,res){
  res.render('login',{loginMessage: "",signupMessage: ""});
}

exports.logout = function(req,res){
  Parse.User.logOut();
  res.redirect('/');
}

exports.test = function(req,res){
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('test', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id});
    });
  }else{
    res.render('test', { message: 'Welcome ', n: "Guest", u: ""});
  }
}