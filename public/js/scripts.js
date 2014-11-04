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
        $('#masterLeaderboardTable').html("");
        var i = 1;
        var currApp = app + "Score";
        results.forEach(function(item){
          if(item.get("username") == n){
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td class="green">' + i + '</td>');
            $('#masterLeaderboardTable').append('<td class="green">' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get(currApp) + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
            if( app === "stc" ){
              currPlayerStcScore = item.get("stcScore");
              $('#stcLandscapeSheetMusicNumber').text(currPlayerStcScore);
            } 
         }else{
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td>' + i + '</td>');
            $('#masterLeaderboardTable').append('<td>' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get(currApp) + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
         }
          i++;
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
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("gcgScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("stcScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("mtmScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
         }else{
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td>' + i + '</td>');
            $('#masterLeaderboardTable').append('<td>' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("gcgScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("stcScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("mtmScore") + '</td>');
            $('#masterLeaderboardTable').append('<td class="scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
         }
          i++;
        });
      
      $('.chart').html("");
      
      var scoresArray = results.map(function(item){
        return item.get("gtScore");
      });
      
      var maxWidth = $('#chartColumn').width();
         
      var x = d3.scale.linear()
          .domain([0, d3.max(scoresArray)])
          .range([0, maxWidth]);

      d3.select(".chart")
        .selectAll("div")
          .data(results)
        .enter().append("div")
          .style("width", function(d) { return x(d.get("gtScore")) + "px"; })
          .text(function(d) { return d.get("username") });
         
      
      },function(error){
        console.log(error.message);
      });
    }//end masterLeaders
  }
})();// end GAME