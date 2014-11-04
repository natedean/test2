$(function(){
  
  var leaderboardVersions = ["nearMe","topScorers"];
  var currLeaderboardVersion;
  var currPlayerScore = 0;
  
  
  //initialize
  var u = $('#u').text();

    currLeaderboardVersion = leaderboardVersions[0];
    $('#gtLbNearMeBtn').addClass('selected');

  GAME.masterLeaders(currLeaderboardVersion);
   
//set timer to refresh leaderboard
 setInterval(function(){
   GAME.masterLeaders(currLeaderboardVersion);
 },5000);
  
  
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