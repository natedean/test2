var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion = leaderboardVersions[1];
var pointsAvailable = 10;
var gameTimer;

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

$(function(){
  
  //initialize game
  GAME.findLeaders("mtm",currLeaderboardVersion);
  getNew();
  $('#mtmPointsAvailableDisplay').text(pointsAvailable);
  gameTimer = setInterval(timer, 2000);
  
  
  function getNew(){
    var newQuestion = awesomeArray[Math.floor(Math.random()*awesomeArray.length)];
    
    $('#mtmAnswerContainer').html("");
    $('#mtmQuestion').text(newQuestion.question);
    
    var newResults = shuffle(newQuestion.answers);     
    newResults.map(function(item){
      if(item.correct){
        $('#mtmAnswerContainer').append(
          '<div id="c" class="btn btn-lg btn-default answer">' + item.answer + '</div>'
        );
      }else{
        $('#mtmAnswerContainer').append(
          '<div class="btn btn-lg btn-default answer">' + item.answer + '</div>'
        );   
      } 
    });// end map
    $('.answer').click(function(e){ // click handler
//      $('#mtmPointsAvailableText').fadeOut(200);
      if(e.target.id === "c"){
        var u = $('#u').text();
        var n = $('#n').text();
        
        if (u === ""){
          alert('You have to be signed up and logged in to play this game.  This way we can keep track of your score!');
          return $("#loginModal").modal("show");
        }
        $('#mtmGuessFeedback').text("Correct! +" + pointsAvailable).fadeIn(500);
        
        Parse.Cloud.run("add",{amount:pointsAvailable,u: u,currApp: "mtm"}).then(function(results){
          GAME.findLeaders("mtm",currLeaderboardVersion);
          getNew();
          $('#mtmGuessFeedback').fadeOut(2000);
          resetTimer();
//          $('#mtmPointsAvailableText').fadeIn(1000);
        },function(error){
          resetTimer();
//          $('#mtmPointsAvailableText').fadeIn(1000);
          console.log(error.message);
        });
      }else{
        var ans = $("#c").text();
        $('#mtmGuessFeedback').text("Incorrect. The answer is " + ans).fadeIn(500);
        setTimeout(function(){
          GAME.findLeaders("mtm",currLeaderboardVersion);
          getNew();
          resetTimer();
//          $('#mtmPointsAvailableText').fadeIn(1000);
          $('#mtmGuessFeedback').fadeOut(2000);
        },1000);
      }
    });// end click handler
}// end getNew
  
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}// end shuffle
  
// click handlers

  $('#mtmLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    GAME.findLeaders("mtm",currLeaderboardVersion);
  });
  
  $('#mtmLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.findLeaders("mtm",currLeaderboardVersion);
  });
  
  // end click handlers --------------------------------->  
  
  //timer stuff ------------------------------------------------------------------------------->
  
  function timer() {         
      if(pointsAvailable > 1){
        pointsAvailable -= 1;
      }else{
        clearInterval(gameTimer);
      }
    $('#mtmPointsAvailableDisplay').text(pointsAvailable);    
  }
  
  function resetTimer(){
    //reset timer
    if(gameTimer){
      clearInterval(gameTimer);
    }
    pointsAvailable = 10;
    $('#mtmPointsAvailableDisplay').text(pointsAvailable);
    gameTimer = setInterval(timer, 2000);
  }
  
  
});// end doc ready