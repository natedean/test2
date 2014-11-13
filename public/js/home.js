$(function(){
  
  var leaderboardVersions = ["nearMe","topScorers"];
  var currLeaderboardVersion;
  var currPlayerScore = 0;
  var leaderboardDecrementor = 1000;
  
  //initialize
  currLeaderboardVersion = leaderboardVersions[0];
  $('#gtLbNearMeBtn').addClass('selected');
  
//set decrementing timer to refresh leaderboard
 function decrementLeaderboardTimer(){
    GAME.masterLeaders(currLeaderboardVersion);
    leaderboardDecrementor = leaderboardDecrementor + 1000;
    // console.log("leaderboardDecrementor = " + leaderboardDecrementor);
    setTimeout(function(){
      decrementLeaderboardTimer();
    },leaderboardDecrementor);
  }

  decrementLeaderboardTimer();
  
  
//------------------------------------------------------------------------------------------------------
  
// click handlers

  $('#gtLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    GAME.masterLeaders(currLeaderboardVersion);
    $('#gtLbTopScorersBtn').addClass('selected');
    $('#gtLbNearMeBtn').removeClass('selected');
  });
  
  $('#gtLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.masterLeaders(currLeaderboardVersion);
    $('#gtLbNearMeBtn').addClass('selected');
    $('#gtLbTopScorersBtn').removeClass('selected');
  });
  
  // end click handlers --------------------------------->

  
}); // end doc ready ------------------------------------------------------------------------------>