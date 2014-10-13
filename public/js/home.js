$(function(){
  
  var leaderboardVersions = ["nearMe","topScorers"];
  var currLeaderboardVersion;
  var currPlayerScore = 0;
  
  var homeHeroTexts = ["I wouldn't be a successful singing nanny if it wasn't for GuitarThinker.com!","I sure wish we had GuitarThinker.com in the 1940's, but all we had were terrible Nazis.","When I was a little girl I dreamed of GuitarThinker.com, and now it's finally here.", "The nuns in the abbey shared GuitarThinker.com with me, and I've never been the same since.","If you think studying music is boring, you are going to love GuitarThinker.com.","GuitarThinker.com changed my life.  I used to be afraid to study music - now I love it.","The hills are alive with the sound of GuitarThinker.com.","Mind blown.  GuitarThinker.com fundamentally altered who I am, and how I study music."];
  
  //initialize
  var u = $('#u').text();
  if(u){ // user logged in
    currLeaderboardVersion = leaderboardVersions[0];
    $('#gtLbNearMeBtn').addClass('selected');
  }else{
    currLeaderboardVersion = leaderboardVersions[1];
  }
  GAME.masterLeaders(currLeaderboardVersion);
  $('#homeHeroText').text('"' + homeHeroTexts[Math.floor(Math.random()*homeHeroTexts.length)] + '"');

    
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