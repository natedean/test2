require('cloud/app.js');
var moment = require('moment');

var awesomeArray = [{question: "How many sharps in the key of C Major?", answers: [{answer: 0, correct: true},{answer: 1,correct: false},{answer: 2,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of G Major?", answers: [{answer: 1, correct: true},{answer: 0,correct: false},{answer: 2,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of D Major?", answers: [{answer: 2, correct: true},{answer: 0,correct: false},{answer: 1,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of A Major?", answers: [{answer: 3, correct: true},{answer: 1,correct: false},{answer: 2,correct: false},{answer: 4,correct: false}]},
                    {question: "How many sharps in the key of E Major?", answers: [{answer: 4, correct: true},{answer: 2,correct: false},{answer: 3,correct: false},{answer: 5,correct: false}]},
                    {question: "How many sharps in the key of B Major?", answers: [{answer: 5, correct: true},{answer: 3,correct: false},{answer: 4,correct: false},{answer: 6,correct: false}]},
                    {question: "How many sharps in the key of F# Major?", answers: [{answer: 6, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 7,correct: false}]},
                    {question: "How many sharps in the key of C# Major?", answers: [{answer: 7, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 6,correct: false}]},
                    {question: "How many sharps in the key of A minor?", answers: [{answer: 0, correct: true},{answer: 1,correct: false},{answer: 2,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of E minor?", answers: [{answer: 1, correct: true},{answer: 0,correct: false},{answer: 2,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of B minor?", answers: [{answer: 2, correct: true},{answer: 0,correct: false},{answer: 1,correct: false},{answer: 3,correct: false}]},
                    {question: "How many sharps in the key of F# minor?", answers: [{answer: 3, correct: true},{answer: 1,correct: false},{answer: 2,correct: false},{answer: 4,correct: false}]},
                    {question: "How many sharps in the key of C# minor?", answers: [{answer: 4, correct: true},{answer: 2,correct: false},{answer: 3,correct: false},{answer: 5,correct: false}]},
                    {question: "How many sharps in the key of G# minor?", answers: [{answer: 5, correct: true},{answer: 3,correct: false},{answer: 4,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of F Major?", answers: [{answer: 1, correct: true},{answer: 2,correct: false},{answer: 3,correct: false},{answer: 4,correct: false}]},
                    {question: "How many flats in the key of Bb Major?", answers: [{answer: 2, correct: true},{answer: 1,correct: false},{answer: 3,correct: false},{answer: 4,correct: false}]},
                    {question: "How many flats in the key of Eb Major?", answers: [{answer: 3, correct: true},{answer: 2,correct: false},{answer: 4,correct: false},{answer: 5,correct: false}]},
                    {question: "How many flats in the key of Ab Major?", answers: [{answer: 4, correct: true},{answer: 3,correct: false},{answer: 5,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of Db Major?", answers: [{answer: 5, correct: true},{answer: 3,correct: false},{answer: 4,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of Gb Major?", answers: [{answer: 6, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 7,correct: false}]},
                    {question: "How many flats in the key of Cb Major?", answers: [{answer: 7, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of D minor?", answers: [{answer: 1, correct: true},{answer: 2,correct: false},{answer: 3,correct: false},{answer: 4,correct: false}]},
                    {question: "How many flats in the key of G minor?", answers: [{answer: 2, correct: true},{answer: 1,correct: false},{answer: 3,correct: false},{answer: 4,correct: false}]},
                    {question: "How many flats in the key of C minor?", answers: [{answer: 3, correct: true},{answer: 2,correct: false},{answer: 4,correct: false},{answer: 5,correct: false}]},
                    {question: "How many flats in the key of F minor?", answers: [{answer: 4, correct: true},{answer: 3,correct: false},{answer: 5,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of Bb minor?", answers: [{answer: 5, correct: true},{answer: 3,correct: false},{answer: 4,correct: false},{answer: 6,correct: false}]},
                    {question: "How many flats in the key of Eb minor?", answers: [{answer: 6, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 7,correct: false}]}
                   ];

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
    query.lessThan("gtScore", request.params.score + 300);
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
    currentUser.increment('gtScore', request.params.amount);
    return currentUser.save(); 
  }).then(function(results){
    response.success(results);
  },function(error){
    response.error(error);
  }); 
});//end stcAdd

Parse.Cloud.define("getTime", function(request,response){
  
  var currThing = awesomeArray[Math.floor(Math.random()*awesomeArray.length)];

  response.success(currThing);
});

