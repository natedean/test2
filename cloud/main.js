require('cloud/app.js');
var moment = require('moment');

var leaderboardFunctions = require('cloud/leaderboardFunctions.js');

Parse.Cloud.define("getLeaders", function(request,response){
  leaderboardFunctions.getLeaders(request,response);
});

Parse.Cloud.define("getMasterLeaders", function(request,response){
  leaderboardFunctions.getMasterLeaders(request,response);
});

Parse.Cloud.define("add", function(request, response){ 
  Parse.Cloud.useMasterKey();
  if(request.params.amount > 20){
    return response.error('Fake');
  }
  var currColumn = request.params.currApp + "Score";
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment(currColumn, request.params.amount);
    currentUser.increment('gtScore', request.params.amount);
    currentUser.set('lastScoreTime', moment().format('MMMM Do YYYY'));
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end add



