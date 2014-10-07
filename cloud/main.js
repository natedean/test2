require('cloud/app.js');
var leaderBoardAdjustor = 50;

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Welcome Home!");
});


Parse.Cloud.define("getLeaders", function(request,response){
  Parse.Cloud.useMasterKey();
  var currColumn = request.params.currApp + "Score";
  console.log("currColumn = " + currColumn);
  var query = new Parse.Query(Parse.User);
  query.select(currColumn, "username");
  if(request.params.version === "nearMe"){
    query.lessThan(currColumn, request.params.score + leaderBoardAdjustor);
    query.descending(currColumn);
    query.limit(10);
    
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    query.greaterThan(currColumn,0);
    query.limit(10);
    query.descending(currColumn);
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
});//end getLeaders

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

