$(function(){
  

  var leaderboardVersions = ["nearMe","topScorers"];
  var currLeaderboardVersion = leaderboardVersions[1];
  var currPlayerScore = 0;
  
  //initialize
  findLeaders();

  function findLeaders(){
    var n = $('#n').text();
    var u = $('#u').text();
    var currPlayerScore = parseInt($('#gtLandscapeSheetMusicNumber').text());
    Parse.Cloud.run("getLeaders",{version: currLeaderboardVersion, u: u, score: currPlayerScore, currApp: "gt"}).then(function(results){
        $('#gtScoresNames').html("");
        $('#gtScoresValues').html("");
        results.forEach(function(item){
          if(item.get("username") == n){
            $('#gtLandscapeSheetMusicNumber').text(item.get("gtScore"));
            $('#gtScoresNames').append('<span class="green">' + item.get("username")+'</span><br>');
            $('#gtScoresValues').append('<span class="green">' + item.get("gtScore")+'</span><br>');
            currPlayerScore = item.get("mtmScore");
          }else{
            $('#gtScoresNames').append(item.get("username")+"<br>");
            $('#gtScoresValues').append(item.get("gtScore")+"<br>");
          }
        });
      },function(error){
        alert(error.message);
      });
  }// end findLeaders
  
  
//------------------------------------------------------------------------------------------------------
  
// click handlers

  $('#gtLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    findLeaders();
  });
  
  $('#gtLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    findLeaders();
  });
  
  // end click handlers --------------------------------->

  
}); // end doc ready ------------------------------------------------------------------------------>