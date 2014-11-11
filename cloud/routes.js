exports.home = function(req,res){
  if(Parse.User.current()){
    Parse.User.current().fetch().then(function(user){
      res.render('home', { message: 'Logged in as ',
                                     n: user.get("username"),
                                     u: user.id});
    });
  }else{
    res.render('home', { message: 'You are not logged in ', n: "", u: ""});
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
    res.render('spellThatChord', { message: 'You are not logged in  ', n: "", u: "", score: 0 });
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
    res.render('musicTheoryMaster', { message: 'You are not logged in  ', n: "", u: "" });
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
    res.render('guitarChordGame', { message: 'You are not logged in  ', n: "", u: ""});
  }
}

exports.login = function(req,res){
  res.render('login',{loginMessage: "",signupMessage: ""});
}

exports.logout = function(req,res){
  Parse.User.logOut();
  res.redirect('/');
}

