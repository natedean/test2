require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Welcome Home!");
});

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  if (!request.object.get("email")) {
    response.error("email is required for signup");
  } else {
    response.success();
  }
});


Parse.Cloud.define("stcAdd", function(request, response){
  var currentUser = Parse.User.current();
  currentUser.increment('stcScore', request.params.amount);
  currentUser.save().then(function(){
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.User);
    query.select("username","stcScore");
    query.descending("stcScore");
    return query.find();
  }).then(function(results){  
    response.success(results);
  },function(error){
    console.log(error.message);
  });
  
});

//Parse.Cloud.define("stcLeaderboard", function(request, response){
//  Parse.Cloud.useMasterKey();
//  var query = new Parse.Query(Parse.User);
//  query.select("username","stcScore");
//  query.descending("stcScore");
//  query.find().then(function(results){
//    console.log("Success");
//    console.log(results);
//    response.success(results);
//  },function(error){
//    response.error(error);
//  });
  
  
//  query.limit(10);
//  query.find().then(function(results){
//    results.forEach(function(user){
//      console.log(user.get("stcScore"));
//    });
//    response.success();
//  },function(error){
//    console.log(error.message);
//  });
//});
