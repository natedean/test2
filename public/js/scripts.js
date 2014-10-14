Parse.initialize("jjrIZ3jiKnpq02brttE2FXl9BuZCmj9ZuY1UTJaU",
                   "DkUgGQuFMOOPfyi06JcEWy6W6Qh4bSz2bOMY2wSg");


var GAME = (function(){
  
  return {
    findLeaders: function(){
      var app = arguments[0];
      var currLeaderboardVersion = arguments[1];
      var n = $('#n').text();
      var u = $('#u').text();
    Parse.Cloud.run("getLeaders",{version: currLeaderboardVersion, u: u, currApp: app}).then(function(results){
        $('#' + app + 'ScoresNames').html("");
        $('#' + app + 'ScoresValues').html("");
        var currColumn = app + "Score";
        results.forEach(function(item){
          if(item.get("username") == n){
            $('#' + app + 'LandscapeSheetMusicNumber').text(item.get(currColumn));
            $('#' + app + 'ScoresNames').append('<span class="green">' + item.get("username")+'</span><br>');
            $('#' + app + 'ScoresValues').append('<span class="green">' + item.get(currColumn)+'</span><br>');
            currPlayerScore = item.get(currColumn);
          }else{
            $('#' + app + 'ScoresNames').append(item.get("username")+"<br>");
            $('#' + app + 'ScoresValues').append(item.get(currColumn)+"<br>");
          }
        });
      },function(error){
        console.log(error.message);
      });
    },// end findLeaders
    masterLeaders: function(){
      var currLeaderboardVersion = arguments[0];
      var n = $('#n').text();
      var u = $('#u').text();
    Parse.Cloud.run("getMasterLeaders",{version: currLeaderboardVersion, u: u}).then(function(results){
        $('#masterLeaderboardTable').html("");
        var i = 1;
        results.forEach(function(item){
          if(item.get("username") == n){
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td class="green">' + i + '</td>');
            $('#masterLeaderboardTable').append('<td class="green">' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("stcScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("mtmScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
            currPlayerScore = item.get("gtScore");
         }else{
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td>' + i + '</td>');
            $('#masterLeaderboardTable').append('<td>' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("stcScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("mtmScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
         }
          i++;
        });
      },function(error){
        console.log(error.message);
      });
    }//end masterLeaders
  }
})();// end GAME