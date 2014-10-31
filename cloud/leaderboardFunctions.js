var leaderBoardAdjustor = 25;

exports.getLeaders = function(request,response){
  Parse.Cloud.useMasterKey();
  var currColumn = request.params.currApp + "Score";
  var query = new Parse.Query(Parse.User);
  query.select(currColumn, "username", "gtScore");
  if(request.params.version === "nearMe"){
    var currUserQuery = new Parse.Query(Parse.User);
    currUserQuery.equalTo("objectId",request.params.u);
    currUserQuery.first().then(function(currUser){
      query.lessThan(currColumn, currUser.get(currColumn) + leaderBoardAdjustor);
      query.descending(currColumn);
      query.limit(15);
      return query.find();
    }).then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    query.greaterThan(currColumn,0);
    query.limit(15);
    query.descending(currColumn);
    query.find().then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
};//end getLeaders

exports.getMasterLeaders = function(request,response){
  Parse.Cloud.useMasterKey();
  var query = new Parse.Query(Parse.User);
  query.select("username","gcgScore","stcScore","mtmScore","gtScore");
  var currUserQuery = new Parse.Query(Parse.User);
  currUserQuery.equalTo("objectId",request.params.u);
  if(request.params.version === "nearMe"){
    currUserQuery.first().then(function(currUser){
      query.lessThan("gtScore", currUser.get("gtScore") + leaderBoardAdjustor);
      query.descending("gtScore");
      query.limit(15);
      return query.find();
    }).then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }else{
    currUserQuery.first().then(function(currUser){
    query.greaterThan("gtScore",0);
    query.limit(15);
    query.descending("gtScore");
    return query.find();
    }).then(function(results){
      response.success(results);
    },function(error){
      response.error(error);
    });
  }
}