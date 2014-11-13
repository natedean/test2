Parse.initialize("jjrIZ3jiKnpq02brttE2FXl9BuZCmj9ZuY1UTJaU",
                   "DkUgGQuFMOOPfyi06JcEWy6W6Qh4bSz2bOMY2wSg");

window.fbAsyncInit = function() {
    FB.init({
      appId      : '387284918091017',
      xfbml      : true,
      version    : 'v2.2'
    });
  
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

var windowWidth = window.innerWidth;

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
          if( i === 1 ){
            if(currLeaderboardVersion === "nearMe"){
              $('#leaderboardMessage').text(item.get("username") + ' is currently the man');
            }else{
               $('#leaderboardMessage').text(item.get("username") + ' is the all time greatest');
            }
          }
          
          if(item.get("username") == n){
            $('#masterLeaderboardTable').append('<tr>');
            $('#masterLeaderboardTable').append('<td class="green">' + i + '</td>');
            $('#masterLeaderboardTable').append('<td class="green">' + item.get("username") + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get(currApp) + '</td>');
            $('#masterLeaderboardTable').append('<td class="green scoreTd">' + item.get("gtScore") + '</td>');
            $('#masterLeaderboardTable').append('</tr>');
            currPlayerStcScore = item.get(currApp);
            $('#currUserScore').text(currPlayerStcScore);
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
      
      $('.chart').html("");
      
      var scoresArray = results.map(function(item){
        return item.get(currApp);
      });
      
      var maxWidth = $('.leaderboardContainer').width();
         
      var x = d3.scale.linear()
          .domain([0, d3.max(scoresArray)])
          .range([0, maxWidth]);

      d3.select(".chart")
        .selectAll("div")
          .data(results)
        .enter().append("div")
          .style("width", function(d) { return x(d.get(currApp)) + "px"; })

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
          if( i === 1 ){
            if(currLeaderboardVersion === "nearMe"){
              $('#leaderboardMessage').text(item.get("username") + ' is the king of GuitarThinker.com... for now');
            }else{
               $('#leaderboardMessage').text(item.get("username") + ' is the all time ruler of GuitarThinker.com');
            }
            
          }
          
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
      
      var maxWidth = $('.leaderboardContainer').width();
         
      var x = d3.scale.linear()
          .domain([0, d3.max(scoresArray)])
          .range([0, maxWidth]);

      d3.select(".chart")
        .selectAll("div")
          .data(results)
        .enter().append("div")
          .style("width", function(d) { return x(d.get("gtScore")) + "px"; })
      },function(error){
        console.log(error.message);
      });
    }//end masterLeaders
  }
})();// end GAME