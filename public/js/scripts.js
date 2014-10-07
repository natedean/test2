Parse.initialize("jjrIZ3jiKnpq02brttE2FXl9BuZCmj9ZuY1UTJaU",
                   "DkUgGQuFMOOPfyi06JcEWy6W6Qh4bSz2bOMY2wSg");


var GAME = (function(){
  var currPlayerScore = 0; //initialize
  
  return {
    findLeaders: function(){
      var app = arguments[0];
      var currLeaderboardVersion = arguments[1];
      var n = $('#n').text();
      var u = $('#u').text();
    Parse.Cloud.run("getLeaders",{version: currLeaderboardVersion, u: u, score: currPlayerScore, currApp: app}).then(function(results){
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
        alert(error.message);
      });
    }// end findLeaders
  }
})();// end GAME