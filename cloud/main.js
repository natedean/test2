require('cloud/app.js');
var leaderboardFunctions = require('cloud/leaderboardFunctions.js');


Parse.Cloud.define("getLeaders", function(request,response){
  leaderboardFunctions.getLeaders(request,response);
});

Parse.Cloud.define("getMasterLeaders", function(request,response){
  leaderboardFunctions.getMasterLeaders(request,response);
});

Parse.Cloud.define("add", function(request, response){ 
  Parse.Cloud.useMasterKey();
  var currColumn = request.params.currApp + "Score";
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment(currColumn, request.params.amount);
    currentUser.increment('gtScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end add

Parse.Cloud.define("testAdd", function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment("testScore", request.params.amount);
    currentUser.increment("gtScore", request.params.amount);
    return currentUser.save();
  }).then(function(currentUser){
    return query.first();
  }).then(function(results){
    response.success(results);
  },function(error){
      response.error(error);
  });
});

