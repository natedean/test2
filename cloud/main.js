require('cloud/app.js');
var leaderBoardAdjustor = 50;


// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Welcome Home!");
});

Parse.Cloud.define("gtGetLeaders", function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.select("gtScore", "username");
  if(request.params.version === "nearMe"){
    query.greaterThan("gtScore",0);
    query.lessThan("gtScore", request.params.score + leaderBoardAdjustor);
    query.descending("gtScore");
    query.limit(10);
    
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    query.greaterThan("gtScore",0);
    query.limit(10);
    query.descending("gtScore");
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
});//end gtGetLeaders


Parse.Cloud.define("stcGetLeaders", function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.select("stcScore", "username");
  if(request.params.version === "nearMe"){
    query.greaterThan("stcScore",0);
    query.lessThan("stcScore", request.params.score + leaderBoardAdjustor);
    query.descending("stcScore");
    query.limit(10);
    
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    query.greaterThan("stcScore",0);
    query.limit(10);
    query.descending("stcScore");
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
});//end getStcLeaders

Parse.Cloud.define("mtmGetLeaders", function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.select("mtmScore", "username");
  if(request.params.version === "nearMe"){
    query.greaterThan("mtmScore",0);
    query.lessThan("mtmScore", request.params.score + leaderBoardAdjustor);
    query.descending("mtmScore");
    query.limit(10);
    
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    query.greaterThan("mtmScore",0);
    query.limit(10);
    query.descending("mtmScore");
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
});//end getMtmLeaders


Parse.Cloud.define("stcAdd", function(request, response){ 
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment('stcScore', request.params.amount);
    currentUser.increment('gtScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end stcAdd


Parse.Cloud.define("mtmAdd", function(request, response){ 
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment('mtmScore', request.params.amount);
    currentUser.increment('gtScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end stcAdd

