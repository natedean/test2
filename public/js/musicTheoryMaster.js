var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion;
var pointsAvailable = 5;
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
                    {question: "How many flats in the key of Eb minor?", answers: [{answer: 6, correct: true},{answer: 4,correct: false},{answer: 5,correct: false},{answer: 7,correct: false}]},
                    {question: "What is the 1st Church Mode?", answers: [{answer: "Ionian", correct: true},{answer: "Dorian",correct: false},{answer: "Phrygian",correct: false},{answer: "Lydian",correct: false}]},
                    {question: "What is the 2nd Church Mode?", answers: [{answer: "Dorian", correct: true},{answer: "Mixolydian",correct: false},{answer: "Phrygian",correct: false},{answer: "Lydian",correct: false}]},
                    {question: "What is the 3rd Church Mode?", answers: [{answer: "Phrygian", correct: true},{answer: "Mixolydian",correct: false},{answer: "Ionian",correct: false},{answer: "Lydian",correct: false}]},
                    {question: "What is the 4th Church Mode?", answers: [{answer: "Lydian", correct: true},{answer: "Mixolydian",correct: false},{answer: "Ionian",correct: false},{answer: "Dorian",correct: false}]},
                    {question: "What is the 5th Church Mode?", answers: [{answer: "Mixolydian", correct: true},{answer: "Phrygian",correct: false},{answer: "Aeolian",correct: false},{answer: "Locrian",correct: false}]},
                    {question: "What is the 6th Church Mode?", answers: [{answer: "Aeolian", correct: true},{answer: "Phrygian",correct: false},{answer: "Lydian",correct: false},{answer: "Locrian",correct: false}]},
                    {question: "What is the 7th Church Mode?", answers: [{answer: "Locrian", correct: true},{answer: "Phrygian",correct: false},{answer: "Aeolian",correct: false},{answer: "Mixolydian",correct: false}]},
                    {question: "What notes of the major scale make up a Major chord?", answers: [{answer: "1 3 5", correct: true},{answer: "1 2 3",correct: false},{answer: "1 3 4",correct: false},{answer: "1 b3 5",correct: false}]},
                    {question: "What notes of the major scale make up a minor chord?", answers: [{answer: "1 b3 5", correct: true},{answer: "1 2 3",correct: false},{answer: "1 3 4",correct: false},{answer: "1 3 5",correct: false}]},
                    {question: "What notes of the major scale make up a diminished chord?", answers: [{answer: "1 b3 b5", correct: true},{answer: "1 2 3",correct: false},{answer: "1 3 5",correct: false},{answer: "1 b3 5",correct: false}]},
                    {question: "What notes of the major scale make up a augmented chord?", answers: [{answer: "1 3 #5", correct: true},{answer: "1 #3 5",correct: false},{answer: "1 3 5",correct: false},{answer: "1 b3 5",correct: false}]},
                    {question: "What notes of the major scale make up a suspended chord?", answers: [{answer: "1 4 5", correct: true},{answer: "1 3 5",correct: false},{answer: "1 b3 5",correct: false},{answer: "1 5 6",correct: false}]},
                    {question: "What notes of the major scale make up a 2 chord?", answers: [{answer: "1 2 5", correct: true},{answer: "1 3 5",correct: false},{answer: "1 2 3",correct: false},{answer: "1 2 4",correct: false}]},
                    {question: "What notes of the major scale make up a 7 chord?", answers: [{answer: "1 3 5 b7", correct: true},{answer: "1 3 5 7",correct: false},{answer: "1 3 7 8",correct: false},{answer: "1 3 5 6",correct: false}]},
                    {question: "What notes of the major scale make up a Maj7 chord?", answers: [{answer: "1 3 5 7", correct: true},{answer: "1 3 5 b7",correct: false},{answer: "1 2 3 4",correct: false},{answer: "1 3 7 9",correct: false}]},
                    {question: "What notes of the major scale make up a min7 chord?", answers: [{answer: "1 b3 5 b7", correct: true},{answer: "1 3 5 b7",correct: false},{answer: "1 2 b3 4",correct: false},{answer: "1 b3 7 9",correct: false}]},
                    {question: "What is the second chord in the key of A Major?", answers: [{answer: "Bmin", correct: true},{answer: "C",correct: false},{answer: "Gmin",correct: false},{answer: "D",correct: false}]},
                    {question: "What is the second chord in the key of E Major?", answers: [{answer: "F#min", correct: true},{answer: "A",correct: false},{answer: "B",correct: false},{answer: "Dmin",correct: false}]},
                    {question: "What is the second chord in the key of B Major?", answers: [{answer: "C#min", correct: true},{answer: "D#",correct: false},{answer: "Emin",correct: false},{answer: "E",correct: false}]},
                    {question: "What is the third chord in the key of C Major?", answers: [{answer: "Emin", correct: true},{answer: "F",correct: false},{answer: "Gmin",correct: false},{answer: "Amin",correct: false}]},
                    {question: "What is the third chord in the key of G Major?", answers: [{answer: "Bmin", correct: true},{answer: "Emin",correct: false},{answer: "D",correct: false},{answer: "Amin",correct: false}]},
                    {question: "What is the third chord in the key of A Major?", answers: [{answer: "C#min", correct: true},{answer: "C",correct: false},{answer: "Gmin",correct: false},{answer: "Emin",correct: false}]},
                    {question: "What is the third chord in the key of E Major?", answers: [{answer: "G#min", correct: true},{answer: "G",correct: false},{answer: "Gmin",correct: false},{answer: "A",correct: false}]},
                    {question: "What is the fourth chord in the key of C Major?", answers: [{answer: "F", correct: true},{answer: "G",correct: false},{answer: "Emin",correct: false},{answer: "Amin",correct: false}]},
                    {question: "What is the fourth chord in the key of G Major?", answers: [{answer: "C", correct: true},{answer: "D",correct: false},{answer: "Emin",correct: false},{answer: "A",correct: false}]},
                    {question: "What is the fourth chord in the key of A Major?", answers: [{answer: "D", correct: true},{answer: "E",correct: false},{answer: "F#min",correct: false},{answer: "B",correct: false}]},
                    {question: "What is the fifth chord in the key of C Major?", answers: [{answer: "G", correct: true},{answer: "E",correct: false},{answer: "F#min",correct: false},{answer: "F",correct: false}]},
                    {question: "What is the fifth chord in the key of G Major?", answers: [{answer: "D", correct: true},{answer: "A",correct: false},{answer: "Emin",correct: false},{answer: "C",correct: false}]}
                   ];

$(function(){
  
  //initialize game
  getNew();
  var u = $('#u').text();
  currLeaderboardVersion = leaderboardVersions[0];
  GAME.findLeaders("mtm",currLeaderboardVersion);
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
          '<div id="c" class="mtmAnswerButton">' + item.answer + '</div>'
        );
      }else{
        $('#mtmAnswerContainer').append(
          '<div class="mtmAnswerButton">' + item.answer + '</div>'
        );   
      } 
    });// end map
    $('.mtmAnswerButton').click(function(e){ // click handler
      var u = $('#u').text();
      if (u === ""){
          alert('You have to be signed up and logged in to play this game.  This way we can keep track of your score!');
          return $("#loginModal").modal("show");
      }
      if(e.target.id === "c"){
        var n = $('#n').text();
        $('#mtmGuessFeedback').text("Correct! +" + pointsAvailable).fadeIn(500);
       
        Parse.Cloud.run("add",{amount:pointsAvailable,u: u,currApp: "mtm"}).then(function(results){
          GAME.findLeaders("mtm",currLeaderboardVersion);
          setTimeout(function(){
             $('#mtmGuessFeedback').fadeOut(500);
            getNew();
            resetTimer();
          },2000);
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
          $('#mtmGuessFeedback').fadeOut(500);
          getNew();
          resetTimer();
//          $('#mtmPointsAvailableText').fadeIn(1000);
          
        },4000);
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
    $('#mtmLbTopScorersBtn').addClass('selected');
    $('#mtmLbNearMeBtn').removeClass('selected');
  });
  
  $('#mtmLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.findLeaders("mtm",currLeaderboardVersion);
    $('#mtmLbNearMeBtn').addClass('selected');
    $('#mtmLbTopScorersBtn').removeClass('selected');
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
    pointsAvailable = 5;
    $('#mtmPointsAvailableDisplay').text(pointsAvailable);
    gameTimer = setInterval(timer, 2000);
  }
  
  
});// end doc ready