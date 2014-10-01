require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Welcome Home!");
});

Parse.Cloud.define("stcGetLeaders", function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.select("stcScore", "username");
  if(request.params.version === "nearMe"){
    query.lessThan("stcScore", request.params.score + 300);
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


Parse.Cloud.define("stcAdd", function(request, response){ 
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment('stcScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end stcAdd


