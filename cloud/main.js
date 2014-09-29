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
    response.error(error);
  });
  
});


