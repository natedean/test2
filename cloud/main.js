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
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId",request.params.u);
  query.first().then(function(currentUser){
    currentUser.increment('stcScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    var query = new Parse.Query(Parse.User);
    query.select("username","stcScore");
    query.greaterThan("stcScore",0);
    query.limit(10);
    query.descending("stcScore");
    return query.find();
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end stcAdd


