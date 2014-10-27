var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion;
var gameTimer;

var game = new Phaser.Game(500,500, Phaser.CANVAS, 'gcgGame',{preload: preload, create: create, update: update});

var text = "";
var counter = 0;
var notes;
var currChord;
var guitarNeck;
var fretsHeight = [0,60,120,180,250,300,350,400,450];
var fretsWidth = [10,76,156,230,308,384];
var fretWidth = 78;
var currRand = 0;
var prevRand;
var  guitarTones;
var newAnswers;

var questions = {
  easy: [
    {name: "C Major", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0}]},
    {name: "G Major", notes: [{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 3, finger: 4}]},
    {name: "D Major", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 2, finger: 2}]},
    {name: "A Major", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 2, finger: 3},{fret: 0, finger: 0}]},
    {name: "E Major", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "B Major", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 2},{fret: 4, finger: 3},{fret: 4, finger: 4},{fret: 2, finger: 1}]},
    {name: "F# Major", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4,finger: 4},{fret: 3, finger: 2},{fret: 2, finger: 1},{fret: 2, finger: 1}]},
    {name: "C# Major", notes: [{fret: -1, finger: "x"},{fret: 4, finger: 1},{fret: 6,finger: 2},{fret: 6, finger: 3},{fret: 6, finger: 4},{fret: 4, finger: 1}]},
    {name: "F Major", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 1, finger: 1}]},
    {name: "Bb Major", notes: [{fret: -1, finger: "x"},{fret: 1, finger: 1},{fret: 3,finger: 2},{fret: 3, finger: 3},{fret: 3, finger: 4},{fret: 1, finger: 1}]},
    {name: "A minor", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 2, finger: 3},{fret: 1, finger: 1},{fret: 0, finger: 0}]},
    {name: "E minor", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 2,finger: 3},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "B minor", notes: [{fret: -1, finger: "x"},{fret: 2, finger: 1},{fret: 4,finger: 3},{fret: 4, finger: 4},{fret: 3, finger: 2},{fret: 2, finger: 1}]},
    {name: "F# minor", notes: [{fret: 2, finger: 1},{fret: 4, finger: 3},{fret: 4,finger: 4},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}]},
    {name: "C# minor", notes: [{fret: -1, finger: "x"},{fret: 4, finger: 1},{fret: 6,finger: 3},{fret: 6, finger: 4},{fret: 5, finger: 2},{fret: 4, finger: 1}]}
  ],
  medium: [
    {name: "D2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 0, finger: 0}]},
    {name: "A2", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "F2", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 0, finger: 0},{fret: 1, finger: 1},{fret: 1, finger: 1}]},
    {name: "Dsus", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 3, finger: 3},{fret: 3, finger: 4}]},
    {name: "Asus", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 2, finger: 2},{fret: 3, finger: 3},{fret: 0, finger: 0}]},
    {name: "D7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 2, finger: 3}]},
    {name: "A7", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 2, finger: 3},{fret: 0, finger: 0}]},
    {name: "E7", notes: [{fret: 0, finger: 0},{fret: 2, finger: 2},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "CMaj7", notes: [{fret: -1, finger: "x"},{fret: 3, finger: 3},{fret: 2,finger: 2},{fret: 0, finger: 0},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "GMaj7", notes: [{fret: 3, finger: 2},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 2, finger: 1}]},
    {name: "DMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 2, finger: 1},{fret: 2, finger: 1},{fret: 2, finger: 1}]},
    {name: "AMaj7", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 2, finger: 3},{fret: 0, finger: 0}]},
    {name: "FMaj7", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 3,finger: 3},{fret: 2, finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0}]}
  ],
  hard: [
    {name: "AMaj9", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 2},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}],
      answers: [{answer: "AMaj9", correct: true},{answer: "A9",correct: false},{answer: "AMaj11",correct: false},{answer: "A11",correct: false}]
    },
    {name: "Ddim", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 1, finger: 2}],
      answers: [{answer: "Ddim", correct: true},{answer: "Dmin7b5",correct: false},{answer: "D9",correct: false},{answer: "Daug",correct: false}]
    },
    {name: "A7sus", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 0, finger: 0}],
      answers: [{answer: "A7sus", correct: true},{answer: "A9",correct: false},{answer: "Aaug",correct: false},{answer: "A13",correct: false}]
    }
  ]
  
} // end questions

var settings = [{level: questions.easy, points: 10},{level: questions.medium, points: 15},{level: questions.hard, points: 20}];
var currDifficultySetting = settings[0];
var pointsAvailable = currDifficultySetting.points;
  

  
//timer stuff ------------------------------------------------------------------------------->
  function timer() {         
      if(pointsAvailable > 1){
        pointsAvailable -= 1;
      }else{
        clearInterval(gameTimer);
      }
    $('#gcgPointsAvailableDisplay').text(pointsAvailable);    
  }
  
  function resetTimer(){
    //reset timer
    if(gameTimer){
      clearInterval(gameTimer);
    }
    pointsAvailable = currDifficultySetting.points;
    $('#gcgPointsAvailableDisplay').text(pointsAvailable);
    gameTimer = setInterval(timer, 2000);
  }
//---------------------------------------------------------------------------

function preload(){
  //images
  game.load.image('1', '/images/gcg/1.png');
  game.load.image('2', '/images/gcg/2.png');
  game.load.image('3', '/images/gcg/3.png');
  game.load.image('4', '/images/gcg/4.png');
  game.load.image('0', '/images/gcg/O.png');
  game.load.image('x', '/images/gcg/X.png');
  game.load.image('guitarNeck', '/images/gcg/GuitarNeck.png');
  
  game.load.audio('guitarTones', [ '../sounds/guitarTones.mp3', '../sounds/guitarTones.ogg' ]);

}// end preload

function create(){
  
  game.stage.backgroundColor = '#ffffff';
  guitarNeck = game.add.sprite(0, 50, 'guitarNeck');
  guitarNeck.scale.set(.3);
  
  guitarTones = game.add.audio('guitarTones');
  guitarTones.allowMultiple = true;

  guitarTones.addMarker('60', 0, 2);
  guitarTones.addMarker('61', 2, 2);
  guitarTones.addMarker('62', 4, 2);
  guitarTones.addMarker('63', 6, 2);
  guitarTones.addMarker('64', 8, 2);
  guitarTones.addMarker('65', 10, 2);
  guitarTones.addMarker('66', 12, 2);
  guitarTones.addMarker('67', 14, 2);
  
  guitarTones.addMarker('50', 10, 2);
  guitarTones.addMarker('51', 12, 2);
  guitarTones.addMarker('52', 14, 2);
  guitarTones.addMarker('53', 16, 2);
  guitarTones.addMarker('54', 18, 2);
  guitarTones.addMarker('55', 20, 2);
  guitarTones.addMarker('56', 22, 2);
  guitarTones.addMarker('57', 24, 2);
  
  guitarTones.addMarker('40', 20, 2);
  guitarTones.addMarker('41', 22, 2);
  guitarTones.addMarker('42', 24, 2);
  guitarTones.addMarker('43', 26, 2);
  guitarTones.addMarker('44', 28, 2);
  guitarTones.addMarker('45', 30, 2);
  guitarTones.addMarker('46', 32, 2);
  guitarTones.addMarker('47', 34, 2);
  
  guitarTones.addMarker('30', 30, 2);
  guitarTones.addMarker('31', 32, 2);
  guitarTones.addMarker('32', 34, 2);
  guitarTones.addMarker('33', 36, 2);
  guitarTones.addMarker('34', 38, 2);
  guitarTones.addMarker('35', 40, 2);
  guitarTones.addMarker('36', 42, 2);
  guitarTones.addMarker('37', 44, 2);
  
  guitarTones.addMarker('20', 38, 2);
  guitarTones.addMarker('21', 40, 2);
  guitarTones.addMarker('22', 42, 2);
  guitarTones.addMarker('23', 44, 2);
  guitarTones.addMarker('24', 46, 2);
  guitarTones.addMarker('25', 48, 2);
  guitarTones.addMarker('26', 50, 2);
  guitarTones.addMarker('27', 52, 2);
  
  guitarTones.addMarker('10', 48, 2);
  guitarTones.addMarker('11', 50, 2);
  guitarTones.addMarker('12', 52, 2);
  guitarTones.addMarker('13', 54, 2);
  guitarTones.addMarker('14', 56, 2);
  guitarTones.addMarker('15', 58, 2);
  guitarTones.addMarker('16', 60, 2);
  guitarTones.addMarker('17', 62, 2);
  

  text = game.add.text(150, 0, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
     
  //START!!
  setNewChord();
}

function update(){
  
  game.input.onDown.addOnce(setNewChord, this);
  
}// end update


function setNewChord(){
  counter = 0;
  prevRand = currRand;
  $('#gcgAnswerContainer').html("");
//  $('#gcgPointsAvailableDisplay').text("");
  
  function getRand(){
    var rand = game.rnd.integerInRange(0, currDifficultySetting.level.length-1);
    if ( rand === prevRand ) {
      console.log("getRand re-running");
      return getRand();
    }else{
      return rand;
    }
  }
  
  if(notes){
    notes.destroy();
  }
  
  notes = game.add.group();

  currRand = getRand();
  
  currChord = currDifficultySetting.level[currRand];
  
  game.time.events.repeat(300, 6, setNotes, this);
  setTimeout(function(){
    setAnswers();
    resetTimer();
  },2000);
    
//  text.setText(currChord.name); DEBUG
}

function setNotes(){
    var currFret = currChord.notes[counter].fret;
    var currFinger = (currChord.notes[counter].finger).toString();
    var toneString = (6 - counter).toString() + currFret;
    if (currFret < 0 ){
      // this is an X
      var note = notes.create(fretsWidth[counter] + 6, fretsHeight[0], 'x', 0);
      note.scale.set(.6);
    }else{ 
      // not an X
      guitarTones.play(toneString);
      if( currFinger == 0){
        var note = notes.create(fretsWidth[counter] + 5, fretsHeight[currFret], currFinger, 0);
        note.scale.set(.6);
      }else{
        var note = notes.create(fretsWidth[counter], fretsHeight[currFret], currFinger, 0);
        note.scale.set(.4);
      } 
    }
    counter += 1;
}

function setAnswers(){
  newAnswers = shuffle(currChord.answers);     
    newAnswers.map(function(item){
      if(item.correct){
        $('#gcgAnswerContainer').append(
          '<div id="c" class="btn btn-lg btn-default answer">' + item.answer + '</div>'
        );
      }else{
        $('#gcgAnswerContainer').append(
          '<div class="btn btn-lg btn-default answer">' + item.answer + '</div>'
        );   
      } 
    });// end map
    $('.answer').click(function(e){ // click handler
//      $('#gcgPointsAvailableText').fadeOut(200);
      if(e.target.id === "c"){
        var u = $('#u').text();
        var n = $('#n').text();
        
        if (u === ""){
          alert('You have to be signed up and logged in to play this game.  This way we can keep track of your score!');
          return $("#loginModal").modal("show");
        }
        $('#gcgGuessFeedback').text("Correct! +" + pointsAvailable).fadeIn(500);
        
        Parse.Cloud.run("add",{amount:pointsAvailable,u: u,currApp: "gcg"}).then(function(results){
          GAME.findLeaders("gcg",currLeaderboardVersion);
      
          $('#gcgGuessFeedback').fadeOut(2000);

//          $('#gcgPointsAvailableText').fadeIn(1000);
        },function(error){
//          $('#gcgPointsAvailableText').fadeIn(1000);
          console.log(error.message);
        });
      }else{
        var ans = $("#c").text();
        $('#gcgGuessFeedback').text("Incorrect. The answer is " + ans).fadeIn(500);
        setTimeout(function(){
          GAME.findLeaders("gcg",currLeaderboardVersion);
         

//          $('#gcgPointsAvailableText').fadeIn(1000);
          $('#gcgGuessFeedback').fadeOut(2000);
        },1000);
      }
      setTimeout(function(){
        setNewChord();
      },2000);
    });// end click handler
}

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

// ------ JQUERY DOC READY STARTS NOW ----------------------------------->

$(function(){
  
//initialize game
  
  var u = $('#u').text();
  if(u){ // user logged in
    currLeaderboardVersion = leaderboardVersions[0];
    $('#gcgLbNearMeBtn').addClass('selected');
  }else{
    currLeaderboardVersion = leaderboardVersions[1];
  }  
  GAME.findLeaders("gcg",currLeaderboardVersion);
  $('#gcgPointsAvailableDisplay').text(pointsAvailable);
  gameTimer = setInterval(timer, 2000);
  

  


  // click handlers
   $('#gcgEasyBtn').click(function(){
    currDifficultySetting = settings[0];
    $('#gcgEasyBtn').addClass('selected');
    $('#gcgMediumBtn, #gcgHardBtn').removeClass('selected'); 
    setNewChord();
  });
  
  $('#gcgMediumBtn').click(function(){
    currDifficultySetting = settings[1];
    $('#gcgMediumBtn').addClass('selected');
    $('#gcgEasyBtn, #gcgHardBtn').removeClass('selected'); 
    setNewChord();
  });
  
  $('#gcgHardBtn').click(function(){
    currDifficultySetting = settings[2];
    $('#gcgHardBtn').addClass('selected');
    $('#gcgEasyBtn, #gcgMediumBtn').removeClass('selected'); 
    setNewChord();
  });
  
  $('#gcgLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    GAME.findLeaders("gcg",currLeaderboardVersion);
    $('#gcgLbTopScorersBtn').addClass('selected');
    $('#gcgLbNearMeBtn').removeClass('selected');
  });
  
  $('#gcgLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.findLeaders("gcg",currLeaderboardVersion);
    $('#gcgLbNearMeBtn').addClass('selected');
    $('#gcgLbTopScorersBtn').removeClass('selected');
  });
  
});// end doc ready