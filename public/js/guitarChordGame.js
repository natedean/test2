var leaderboardVersions = ["nearMe","topScorers"];
var currLeaderboardVersion;
var pointsAvailable = 10;
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

var tone10;

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
    {name: "AMaj9", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 0, finger: 0}]},
    {name: "Ddim", notes: [{fret: -1, finger: "x"},{fret: -1, finger: "x"},{fret: 0,finger: 0},{fret: 1, finger: 1},{fret: 0, finger: 0},{fret: 1, finger: 2}]},
    {name: "A7sus", notes: [{fret: -1, finger: "x"},{fret: 0, finger: 0},{fret: 2,finger: 1},{fret: 0, finger: 0},{fret: 3, finger: 3},{fret: 0, finger: 0}]},
  ]
  
} // end questions

var settings = [{level: questions.easy, points: 10},{level: questions.medium, points: 15},{level: questions.hard, points: 20}];
var currDifficultySetting = settings[0];

function preload(){
  //images
  game.load.image('1', '/images/gcg/1.png');
  game.load.image('2', '/images/gcg/2.png');
  game.load.image('3', '/images/gcg/3.png');
  game.load.image('4', '/images/gcg/4.png');
  game.load.image('bullet', '/images/gcg/bullet.png');
  game.load.image('guitarNeck', '/images/gcg/GuitarNeck.png');

  //tones
  for (var i=1; i < 7; i++){
    for (var j=0; j < 8; j++){
      var toneString = i.toString() + j.toString();
      game.load.audio(toneString, [ '../sounds/guitar_tones/' + toneString + '.mp3','../sounds/guitar_tones/' + toneString + '.ogg' ]);
    }
  }

}// end preload

function create(){
  game.stage.backgroundColor = '#ffffff';
  guitarNeck = game.add.sprite(0, 50, 'guitarNeck');
  guitarNeck.scale.set(.3);

  text = game.add.text(150, 0, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });
    
}

function update(){
  
  game.input.onDown.addOnce(updateText, this);
  
}// end update


function updateText(){
  counter = 0;
  prevRand = currRand;
  
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
  console.log("currRand = " + currRand);
  currChord = currDifficultySetting.level[currRand];
  
  game.time.events.repeat(300, 6, setNotes, this);
  
//  text.setText(currChord.name); DEBUG
}

function setNotes(){
    var currFret = currChord.notes[counter].fret;
    var currFinger = (currChord.notes[counter].finger).toString();
    var toneString = (6 - counter).toString() + currFret;
    var currTone = game.add.audio(toneString);
    if (currFret < 0 ){
      // this is an X
      var note = notes.create(fretsWidth[counter], fretsHeight[0], 'bullet', 0);
    }else{ 
      // not an X
      currTone.play();
      var note = notes.create(fretsWidth[counter], fretsHeight[currFret], currFinger, 0);
      note.scale.set(.4);
    }
    
    counter += 1;
}

$(function(){
  // click handlers
   $('#gcgEasyBtn').click(function(){
    currDifficultySetting = settings[0];
    $('#gcgMediumAnswerDisplay').hide();
    $('#gcgHardAnswerDisplay').hide();
    
    $('#gcgEasyAnswerDisplay').show();
    setNewChord();
  });
  
  $('#gcgMediumBtn').click(function(){
    currDifficultySetting = settings[1];
    $('#gcgEasyAnswerDisplay').hide();
    $('#gcgHardAnswerDisplay').hide();
    
    $('#gcgMediumAnswerDisplay').show();
    setNewChord();
  });
  
  $('#gcgHardBtn').click(function(){
    currDifficultySetting = settings[2];
    $('#gcgEasyAnswerDisplay').hide();
    $('#gcgMediumAnswerDisplay').hide();
    
    $('#gcgHardAnswerDisplay').show();
    setNewChord();
  });
});