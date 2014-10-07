var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion = leaderboardVersions[1];
var currPlayerScore = 0;

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
  findLeaders();
  getNew();
  
  
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
    $('.answer').click(function(e){
      if(e.target.id === "c"){
        var u = $('#u').text();
        var n = $('#n').text();
        
        if (u === ""){
          alert('You have to be signed up and logged in to play this game.  This way we can keep track of your score!');
          return $("#loginModal").modal("show");
        }
        $('#mtmGuessFeedback').text("Correct! +" + 5).fadeIn(500);
        Parse.Cloud.run("mtmAdd",{amount:5,u: u}).then(function(results){
        findLeaders();
        getNew();
        $('#mtmGuessFeedback').fadeOut(2000);
        },function(error){
          alert(error.message);
        });
      }else{
        var ans = $("#c").text();
        $('#mtmGuessFeedback').text("Incorrect. The answer is " + ans).fadeIn(500);
        setTimeout(function(){
          findLeaders();
          getNew();
          $('#mtmGuessFeedback').fadeOut(2000);
        },1000);
      }
    });
}// end getNew
  
  function findLeaders(){
    var n = $('#n').text();
    var u = $('#u').text();
    Parse.Cloud.run("mtmGetLeaders",{version: currLeaderboardVersion, u: u, score: currPlayerScore}).then(function(results){
        $('#mtmScoresNames').html("");
        $('#mtmScoresValues').html("");
        results.forEach(function(item){
          if(item.get("username") == n){
            $('#mtmLandscapeSheetMusicNumber').text(item.get("mtmScore"));
            $('#mtmScoresNames').append('<span class="green">' + item.get("username")+'</span><br>');
            $('#mtmScoresValues').append('<span class="green">' + item.get("mtmScore")+'</span><br>');
            currPlayerScore = item.get("mtmScore");
          }else{
            $('#mtmScoresNames').append(item.get("username")+"<br>");
            $('#mtmScoresValues').append(item.get("mtmScore")+"<br>");
          }
        });
      },function(error){
        alert(error.message);
      });
  }// end findLeaders

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
}
  
// click handlers

  $('#mtmLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    findLeaders();
  });
  
  $('#mtmLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    findLeaders();
  });
  
  // end click handlers --------------------------------->  
  
  
});// end doc ready