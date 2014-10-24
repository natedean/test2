$(function(){
  
  var settings = [{level: "easy", points: 10, numLetters: 3},{level: "medium", points: 15, numLetters: 4},{level: "hard", points: 20, numLetters: 5}];
  var leaderboardVersions = ["nearMe","topScorers"];
  
  var currDifficultySetting = settings[0]; // set initial to easy object
  var pointsAvailable = currDifficultySetting.points;
  var currChord;
  var currSpelling;
  var currNumbers;
  var currGuess;
  var prevChord;
  var gameTimer;
  var sharpsOrFlats;
  var currLeaderboardVersion;
  var currLetterNumber = 1;
  var toneIndex = 0;
    
var easyChordsFlats = [{chord:"C Major",spelling:"C E G",numbers:"1 3 5"},{chord:"C minor",spelling:"C Eb G",numbers:"1 b3 5"},{chord:"G minor",spelling:"G Bb D",numbers:"1 b3 5"},{chord:"D minor",spelling:"D F A",numbers:"1 b3 5"},{chord:"A minor",spelling:"A C E",numbers:"1 b3 5"},{chord:"E minor",spelling:"E G B",numbers:"1 b3 5"},{chord:"F Major",spelling:"F A C",numbers:"1 3 5"},{chord:"F minor",spelling:"F Ab C",numbers:"1 b3 5"},{chord:"Bb Major",spelling:"Bb D F",numbers:"1 3 5"},{chord:"Bb minor",spelling:"Bb Db F",numbers:"1 b3 5"},{chord:"Db Major",spelling:"Db F Ab",numbers:"1 3 5"},{chord:"Eb Major",spelling:"Eb G Bb",numbers:"1 3 5"},{chord:"Eb minor",spelling:"Eb Gb Bb",numbers:"1 b3 5"},{chord:"Ab Major",spelling:"Ab C Eb",numbers:"1 3 5"}];
var easyChordsSharps = [{chord:"G Major",spelling:"G B D",numbers:"1 3 5"},{chord:"D Major",spelling:"D F# A",numbers:"1 3 5"},{chord:"A Major",spelling:"A C# E",numbers:"1 3 5"},{chord:"E Major",spelling:"E G# B",numbers:"1 3 5"},{chord:"B Major",spelling:"B D# F#",numbers:"1 3 5"},{chord:"F# Major",spelling:"F# A# C#",numbers:"1 3 5"},{chord:"B minor",spelling:"B D F#",numbers:"1 b3 5"},{chord:"F# minor",spelling:"F# A C#",numbers:"1 b3 5"},{chord:"C# minor",spelling:"C# E G#",numbers:"1 b3 5"}];
var mediumChordsFlats = [{chord:"C Maj7",spelling:"C E G B",numbers:"1 3 5 7"},{chord:"C min7",spelling:"C Eb G Bb",numbers:"1 b3 5 b7"},{chord:"G min7",spelling:"G Bb D F",numbers:"1 b3 5 b7"},{chord:"D min7",spelling:"D F A C",numbers:"1 b3 5 b7"},{chord:"A min7",spelling:"A C E G",numbers:"1 b3 5 b7"},{chord:"E min7",spelling:"E G B D",numbers:"1 b3 5 b7"},{chord:"F Maj7",spelling:"F A C E",numbers:"1 3 5 7"},{chord:"F min7",spelling:"F Ab C Eb",numbers:"1 b3 5 b7"},{chord:"Bb Maj7",spelling:"Bb D F A",numbers:"1 3 5 7"},{chord:"Bb min7",spelling:"Bb Db F Ab",numbers:"1 b3 5 b7"},{chord:"Eb Maj7",spelling:"Eb G Bb D",numbers:"1 3 5 7"},{chord:"Eb min7",spelling:"Eb Gb Bb Db",numbers:"1 b3 5 b7"},{chord:"Ab Maj7",spelling:"Ab C Eb G",numbers:"1 3 5 7"},{chord:"C7",spelling:"C E G Bb",numbers:"1 3 5 b7"},{chord:"F7",spelling:"F A C Eb",numbers:"1 3 5 b7"},{chord:"Bb7",spelling:"Bb D F Ab",numbers:"1 3 5 b7"},{chord:"Eb7",spelling:"Eb G Bb Db",numbers:"1 3 5 b7"},{chord:"Ab7",spelling:"Ab C Eb Gb",numbers:"1 3 5 b7"},{chord:"C min7b5",spelling:"C Eb Gb Bb",numbers:"1 b3 b5 b7"},{chord:"E min7b5",spelling:"E G Bb D",numbers:"1 b3 b5 b7"},{chord:"A min7b5",spelling:"A C Eb G",numbers:"1 b3 b5 b7"},{chord:"D min7b5",spelling:"D F Ab C",numbers:"1 b3 b5 b7"},{chord:"C6",spelling:"C E G A",numbers:"1 3 5 6"},{chord:"F6",spelling:"F A C D",numbers:"1 3 5 6"},{chord:"Bb6",spelling:"Bb D F G",numbers:"1 3 5 6"},{chord:"Eb6",spelling:"Eb G Bb C",numbers:"1 3 5 6"},{chord:"F add9",spelling:"F A C G",numbers:"1 3 5 9"},{chord:"Eb add9",spelling:"Eb G Bb F",numbers:"1 3 5 9"},{chord:"Ab add9",spelling:"Ab C Eb Bb",numbers:"1 3 5 9"}];
var mediumChordsSharps = [{chord:"G Maj7",spelling:"G B D F#",numbers:"1 3 5 7"},{chord:"D Maj7",spelling:"D F# A C#",numbers:"1 3 5 7"},{chord:"A Maj7",spelling:"A C# E G#",numbers:"1 3 5 7"},{chord:"E Maj7",spelling:"E G# B D#",numbers:"1 3 5 7"},{chord:"B Maj7",spelling:"B D# F# A#",numbers:"1 3 5 7"},{chord:"B min7",spelling:"B D F# A",numbers:"1 b3 5 b7"},{chord:"F# min7",spelling:"F# A C# E",numbers:"1 b3 5 b7"},{chord:"C# min7",spelling:"C# E G# B",numbers:"1 b3 5 b7"},{chord:"G7",spelling:"G B D F",numbers:"1 3 5 b7"},{chord:"D7",spelling:"D F# A C",numbers:"1 3 5 b7"},{chord:"A7",spelling:"A C# E G",numbers:"1 3 5 b7"},{chord:"E7",spelling:"E G# B D",numbers:"1 3 5 b7"},{chord:"B7",spelling:"B D# F# A",numbers:"1 3 5 b7"},{chord:"B min7b5",spelling:"B D F A",numbers:"1 b3 b5 b7"},{chord:"F# min7b5",spelling:"F# A C E",numbers:"1 b3 b5 b7"},{chord:"C# min7b5",spelling:"C# E G B",numbers:"1 b3 b5 b7"},{chord:"G# min7b5",spelling:"G# B D F#",numbers:"1 b3 b5 b7"},{chord:"G6",spelling:"G B D E",numbers:"1 3 5 6"},{chord:"A6",spelling:"A C# E F#",numbers:"1 3 5 6"},{chord:"E6",spelling:"E G# B C#",numbers:"1 3 5 6"},{chord:"G add9",spelling:"G B D A",numbers:"1 3 5 9"},{chord:"D add9",spelling:"D F# A E",numbers:"1 3 5 9"},{chord:"A add9",spelling:"A C# E B",numbers:"1 3 5 9"},{chord:"E add9",spelling:"E G# B F#",numbers:"1 3 5 9"}];
var hardChordsFlats = [{chord:"C min9",spelling:"C Eb G Bb D",numbers:"1 b3 5 b7 9"},{chord:"D min9",spelling:"D F A C E",numbers:"1 b3 5 b7 9"},{chord:"G min9",spelling:"G Bb D F A",numbers:"1 b3 5 b7 9"},{chord:"F min9",spelling:"F Ab C Eb G",numbers:"1 b3 5 b7 9"},{chord:"F Maj9",spelling:"F A C E G",numbers:"1 3 5 7 9"},{chord:"Bb Maj9",spelling:"Bb D F A C",numbers:"1 3 5 7 9"},{chord:"Bb min9",spelling:"Bb Db F Ab C",numbers:"1 b3 5 b7 9"},{chord:"Db Maj9",spelling:"Db F Ab C Eb",numbers:"1 3 5 7 9"},{chord:"Eb Maj9",spelling:"Eb G Bb D F",numbers:"1 3 5 7 9"},{chord:"Eb min9",spelling:"Eb Gb Bb Db F",numbers:"1 b3 5 b7 9"},{chord:"Ab Maj9",spelling:"Ab C Eb G Bb",numbers:"1 3 5 7 9"},{chord:"C9",spelling:"C E G Bb D",numbers:"1 3 5 b7 9"},{chord:"F9",spelling:"F A C Eb G",numbers:"1 3 5 b7 9"},{chord:"Bb9",spelling:"Bb D F Ab C",numbers:"1 3 5 b7 9"},{chord:"Eb9",spelling:"Eb G Bb Db F",numbers:"1 3 5 b7 9"},{chord:"Ab9",spelling:"Ab C Eb Gb Bb",numbers:"1 3 5 b7 9"}];
var hardChordsSharps = [{chord:"C Maj9",spelling:"C E G B D",numbers:"1 3 5 7 9"},{chord:"G Maj9",spelling:"G B D F# A",numbers:"1 3 5 7 9"},{chord:"D Maj9",spelling:"D F# A C# E",numbers:"1 3 5 7 9"},{chord:"A Maj9",spelling:"A C# E G# B",numbers:"1 3 5 7 9"},{chord:"E Maj9",spelling:"E G# B D# F#",numbers:"1 3 5 7 9"},{chord:"A min9",spelling:"A C E G B",numbers:"1 b3 5 b7 9"},{chord:"E min9",spelling:"E G B D F#",numbers:"1 b3 5 b7 9"},{chord:"F# min9",spelling:"F# A C# E G#",numbers:"1 b3 5 b7 9"},{chord:"C# min9",spelling:"C# E G# B D#",numbers:"1 b3 5 b7 9"},{chord:"G9",spelling:"G B D F A",numbers:"1 3 5 b7 9"},{chord:"D9",spelling:"D F# A C E",numbers:"1 3 5 b7 9"},{chord:"A9",spelling:"A C# E G B",numbers:"1 3 5 b7 9"},{chord:"E9",spelling:"E G# B D F#",numbers:"1 3 5 b7 9"},{chord:"F#9",spelling:"F# A# C# E G#",numbers:"1 3 5 b7 9"}];

// initialize game
setNewChord();
var u = $('#u').text();
  if(u){ // user logged in
    currLeaderboardVersion = leaderboardVersions[0];
    $('#stcLbNearMeBtn').addClass('selected');
  }else{
    currLeaderboardVersion = leaderboardVersions[1];
  }  
GAME.findLeaders("stc",currLeaderboardVersion); 
  
ion.sound({
    sounds: [
        {
            name: "A"
        },
        {
            name: "Asharp"
        },
        {
            name: "B"
        },
        {
            name: "C"
        },
        {
            name: "Csharp"
        },
        {
            name: "D"
        },
        {
            name: "Dsharp"
        },
        {
            name: "E"
        },
        {
            name: "F"
        },
        {
            name: "Fsharp"
        },
        {
            name: "G"
        },
        {
            name: "Gsharp"
        },
        {
            name: "high_A"
        },
        {
            name: "high_Asharp"
        },
        {
            name: "high_B"
        },
        {
            name: "high_C"
        },
        {
            name: "high_Csharp"
        },
        {
            name: "high_D"
        },
        {
            name: "high_Dsharp"
        },
        {
            name: "high_E"
        },
        {
            name: "high_F"
        },
        {
            name: "high_Fsharp"
        },
        {
            name: "high_G"
        },
        {
            name: "high_Gsharp"
        },
        
    ],
    volume: 0.5,
    path: "../sounds/mp3s_oggs/",
    preload: true
});  

  
 //timer stuff ------------------------------------------------------------------------------->
  
  function timer() {         
      if(pointsAvailable > 1){
        pointsAvailable -= 1;
      }else{
        clearInterval(gameTimer);
      }
    $('#stcPortraitSheetMusicNumber').text(pointsAvailable);    
  }
  
  
// end timer logic ----------------------------------------------------------------------------->
  
  function setNewChord(){
    var rand;
    
    currLetterNumber = 1;
    toneIndex = 0;
    
    if (Math.round(Math.random()) < .5){
      sharpsOrFlats = "flats";
    }else{
      sharpsOrFlats = "sharps";
    }
    
    
    if(sharpsOrFlats == "flats"){
      $('#stcPianoKeyFirstRowTwo').css('background-image', 'url("/images/stc/Bflat.png")');
      $('#stcPianoKeyFirstRowFive').css('background-image', 'url("/images/stc/Dflat.png")');
      $('#stcPianoKeySecondRowOne').css('background-image', 'url("/images/stc/Eflat.png")');
      $('#stcPianoKeySecondRowFour').css('background-image', 'url("/images/stc/Gflat.png")');
      $('#stcPianoKeySecondRowSix').css('background-image', 'url("/images/stc/Aflat.png")');
    }else{
      $('#stcPianoKeyFirstRowTwo').css('background-image', 'url("/images/stc/Asharp.png")');
      $('#stcPianoKeyFirstRowFive').css('background-image', 'url("/images/stc/Csharp.png")');
      $('#stcPianoKeySecondRowOne').css('background-image', 'url("/images/stc/Dsharp.png")');
      $('#stcPianoKeySecondRowFour').css('background-image', 'url("/images/stc/Fsharp.png")');
      $('#stcPianoKeySecondRowSix').css('background-image', 'url("/images/stc/Gsharp.png")');
    }
    
    switch(currDifficultySetting.level) {
    case "easy":
        pointsAvailable = currDifficultySetting.points;
        if(sharpsOrFlats == "flats"){
          rand = Math.floor(Math.random()*easyChordsFlats.length);
          currChord = easyChordsFlats[rand].chord;
          currSpelling = easyChordsFlats[rand].spelling;
          currNumbers = easyChordsFlats[rand].numbers;
        }else{
          rand = Math.floor(Math.random()*easyChordsSharps.length);
          currChord = easyChordsSharps[rand].chord;
          currSpelling = easyChordsSharps[rand].spelling;
          currNumbers = easyChordsSharps[rand].numbers;
        }
        break;
    case "medium":
        pointsAvailable = currDifficultySetting.points;
        if(sharpsOrFlats == "flats"){
          rand = Math.floor(Math.random()*mediumChordsFlats.length);
          currChord = mediumChordsFlats[rand].chord;
          currSpelling = mediumChordsFlats[rand].spelling;
          currNumbers = mediumChordsFlats[rand].numbers;
        }else{
          rand = Math.floor(Math.random()*mediumChordsSharps.length);
          currChord = mediumChordsSharps[rand].chord;
          currSpelling = mediumChordsSharps[rand].spelling;
          currNumbers = mediumChordsSharps[rand].numbers;
        }
        break;
    case "hard":
        pointsAvailable = currDifficultySetting.points;
        if(sharpsOrFlats == "flats"){
          rand = Math.floor(Math.random()*hardChordsFlats.length);
          currChord = hardChordsFlats[rand].chord;
          currSpelling = hardChordsFlats[rand].spelling;
          currNumbers = hardChordsFlats[rand].numbers;
        }else{
          rand = Math.floor(Math.random()*hardChordsSharps.length);
          currChord = hardChordsSharps[rand].chord;
          currSpelling = hardChordsSharps[rand].spelling;
          currNumbers = hardChordsSharps[rand].numbers;
        }
        break;
    default:
        console.log('error in setNewChord function');
        break;
   }
    
    $('#stcChordDisplay').text(currChord);
    $('#stcCheatSheetChord').text(currChord);
    $('#stcCheatSheetSpelling').text(currSpelling);
    $('#stcCheatSheetNumbers').text(currNumbers);
    
    //reset timer
    if(gameTimer){
      clearInterval(gameTimer);
    }
    $('#stcPortraitSheetMusicNumber').text(pointsAvailable);
    gameTimer = setInterval(timer, 2000);
    
  }//end setNewChord function
  
  function fillAnswerLetter(letter){
    switch(currDifficultySetting.level) {
    case "easy":
        $( '#stcEasy' + currLetterNumber ).text( letter ).addClass("white");
        
        if(currLetterNumber < 4){
          currLetterNumber++;
        } 
        if(currLetterNumber > 3){
          currGuess = "" + $('#stcEasy1').text() + " " + $('#stcEasy2').text() + " " + $('#stcEasy3').text();
          evaluateAnswer(currGuess);
        }
        break;
    case "medium":
        $( '#stcMedium' + currLetterNumber ).text( letter ).addClass("white");
        
        if(currLetterNumber < 5){
          currLetterNumber++;
        } 
        if(currLetterNumber > 4){
          currGuess = "" + $('#stcMedium1').text() + " " + $('#stcMedium2').text() + " " + $('#stcMedium3').text() + " " + $('#stcMedium4').text();
          evaluateAnswer(currGuess);
        }
        break;
    case "hard":
        $( '#stcHard' + currLetterNumber ).text( letter ).addClass("white");
        
        if(currLetterNumber < 6){
          currLetterNumber++;
        } 
        if(currLetterNumber > 5){
          currGuess = "" + $('#stcHard1').text() + " " + $('#stcHard2').text() + " " + $('#stcHard3').text() + " " + $('#stcHard4').text() + " " + $('#stcHard5').text();
          evaluateAnswer(currGuess);
        }
        break;
    default:
        console.log('error in fillAnswerLetter function');
        break;
   }  
  }// end fillAnswerLetter function
  
  function evaluateAnswer(guess){
    var u = $('#u').text();
    var n = $('#n').text();
    
    if (u === ""){
      alert('You have to be signed up and logged in to play this game.  This way we can keep track of your score!');
      return $("#loginModal").modal("show");
    }
    
    if(guess == currSpelling){
      $('#stcGuessFeedback').text("Correct! +" + pointsAvailable).fadeIn(500);
      Parse.Cloud.run("add",{amount:pointsAvailable,u: u,currApp: "stc"}).then(function(results){
        clearLetters();
        setNewChord();
        GAME.findLeaders("stc",currLeaderboardVersion);
        $('#stcGuessFeedback').fadeOut(2000);
      },function(error){
        console.log(error.message);
      });
    }else{
      $('#stcGuessFeedback').text("Try again!").fadeIn(500,function(){
        $('#stcGuessFeedback').fadeOut(2000);
      });
    }
   
  }// end evaluateAnswer
  
  function clearLetters(){
    
    if(currLetterNumber > 1){
      currLetterNumber = 1;
    }   
    switch(currDifficultySetting.level) {
    case "easy":        
        $( '#stcEasy1,#stcEasy2,#stcEasy3' ).text( "?" ).removeClass("white");
        break;
    case "medium":
        $( '#stcMedium1,#stcMedium2,#stcMedium3,#stcMedium4' ).text( "?" ).removeClass("white");
        break;
    case "hard":
        $( '#stcHard1,#stcHard2,#stcHard3,#stcHard4,#stcHard5' ).text( "?" ).removeClass("white");
        break;
    default:
        console.log('error in fillAnswerLetter function');
        break;
   }
  }// end clearLetters

  
//------------------------------------------------------------------------------------------------------
  
// click handlers
  $('#stcCheatSheetBtn').click(function(){
    pointsAvailable = pointsAvailable - 5;
    if(pointsAvailable < 1){
      pointsAvailable = 1;
    }
  });
  
 $('#stcNewChordBtn').click(function(){
   setNewChord();
 });
  
  $('#stcEasyBtn').click(function(){
    currDifficultySetting = settings[0];
    $('#stcMediumAnswerDisplay').hide();
    $('#stcHardAnswerDisplay').hide();
    
    $('#stcEasyAnswerDisplay').show();
    setNewChord();
  });
  
  $('#stcMediumBtn').click(function(){
    currDifficultySetting = settings[1];
    $('#stcEasyAnswerDisplay').hide();
    $('#stcHardAnswerDisplay').hide();
    
    $('#stcMediumAnswerDisplay').show();
    setNewChord();
  });
  
  $('#stcHardBtn').click(function(){
    currDifficultySetting = settings[2];
    $('#stcEasyAnswerDisplay').hide();
    $('#stcMediumAnswerDisplay').hide();
    
    $('#stcHardAnswerDisplay').show();
    setNewChord();
  });

  // C Csharp D Dsharp E F Fsharp G Gsharp A  Asharp B  high_C high_Csharp high_D high_Dsharp high_E high_F high_Fsharp high_G high_Gsharp high_A high_Asharp high_B highest_C
  // 1 2      3 4      5 6 7      8 9      10 11     12 13     14          15     16          17     18     19          20     21          22     23          24     25
  
  $('.stcPianoKeyFirstRow,.stcPianoKeySecondRow').click(function(){
    switch(this.id) {
    case "stcPianoKeyFirstRowOne":
        if(toneIndex < 10){
          toneIndex = 10;
          ion.sound.play("A");
        }else{
          toneIndex = 22;
          ion.sound.play("high_A");
        }
        fillAnswerLetter('A');
        break;
    case "stcPianoKeyFirstRowTwo":
        if(toneIndex < 11){
          toneIndex = 11;
          ion.sound.play("Asharp");
        }else{
          toneIndex = 23;
          ion.sound.play("high_Asharp");
        }
        if(sharpsOrFlats == "flats"){
          fillAnswerLetter("Bb");
        }else{
          fillAnswerLetter("A#");
        }
        break;
    case "stcPianoKeyFirstRowThree":
        if(toneIndex < 12){
          toneIndex = 12;
          ion.sound.play("B");
        }else{
          toneIndex = 24;
          ion.sound.play("high_B");
        }
        fillAnswerLetter('B');
        break;
    case "stcPianoKeyFirstRowFour":
        if(toneIndex < 1){
          toneIndex = 1;
          ion.sound.play("C");
        }else if (toneIndex < 13){
          toneIndex = 13;
          ion.sound.play("high_C");
        }else{
          toneIndex = 25;
          ion.sound.play("highest_C");
        }
        fillAnswerLetter('C');
        break;
    case "stcPianoKeyFirstRowFive": 
        if(toneIndex < 2){
          toneIndex = 2;
          ion.sound.play("Csharp");
        }else{
          toneIndex = 14;
          ion.sound.play("high_Csharp");
        }
        if(sharpsOrFlats == "flats"){
          fillAnswerLetter("Db");
        }else{
          fillAnswerLetter("C#");
        }
        break;
    case "stcPianoKeyFirstRowSix":
        if(toneIndex < 3){
          toneIndex = 3;
          ion.sound.play("D");
        }else{
          toneIndex = 15;
          ion.sound.play("high_D");
        }
        fillAnswerLetter('D');
        break;
    case "stcPianoKeySecondRowOne":
        if(toneIndex < 4){
          toneIndex = 4;
          ion.sound.play("Dsharp");
        }else{
          toneIndex = 16;
          ion.sound.play("high_Dsharp");
        }
        if(sharpsOrFlats == "flats"){
          fillAnswerLetter("Eb");
        }else{
          fillAnswerLetter("D#");
        }
        break;
    case "stcPianoKeySecondRowTwo":
        if(toneIndex < 5){
          toneIndex = 5;
          ion.sound.play("E");
        }else{
          toneIndex = 17;
          ion.sound.play("high_E");
        }
        fillAnswerLetter('E');
        break;
    case "stcPianoKeySecondRowThree":
        if(toneIndex < 6){
          toneIndex = 6;
          ion.sound.play("F");
        }else{
          toneIndex = 18;
          ion.sound.play("high_F");
        }
        fillAnswerLetter('F');
        break;
    case "stcPianoKeySecondRowFour":
        if(toneIndex < 7){
          toneIndex = 7;
          ion.sound.play("Fsharp");
        }else{
          toneIndex = 19;
          ion.sound.play("high_Fsharp");
        }
        if(sharpsOrFlats == "flats"){
          fillAnswerLetter("Gb");
        }else{
          fillAnswerLetter("F#");
        };
        break;
    case "stcPianoKeySecondRowFive":
        if(toneIndex < 8){
          toneIndex = 8;
          ion.sound.play("G");
        }else{
          toneIndex = 20;
          ion.sound.play("high_G");
        }
        fillAnswerLetter('G');
        break;
    case "stcPianoKeySecondRowSix":
        if(toneIndex < 9){
          toneIndex = 9;
          ion.sound.play("Gsharp");
        }else{
          toneIndex = 21;
          ion.sound.play("high_Gsharp");
        }
        if(sharpsOrFlats == "flats"){
          fillAnswerLetter("Ab");
        }else{
          fillAnswerLetter("G#");
        }
        break;
    default:
        fillAnswerLetter('other');
    }
  });
  
  $('#stcBkspBtn').click(function(){
    if(currLetterNumber > 1){
      currLetterNumber--;
    }   
    switch(currDifficultySetting.level) {
    case "easy":        
        $( '#stcEasy' + currLetterNumber ).text( "?" ).removeClass("white");
        break;
    case "medium":
        $( '#stcMedium' + currLetterNumber ).text( "?" ).removeClass("white");
        break;
    case "hard":
        $( '#stcHard' + currLetterNumber ).text( "?" ).removeClass("white");
        break;
    default:
        console.log('error in fillAnswerLetter function');
        break;
   }
  });
  
  $('#stcClearBtn').click(function(){
    clearLetters();
  });
  
  $('#stcLbTopScorersBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[1];
    GAME.findLeaders("stc",currLeaderboardVersion);
    $('#stcLbTopScorersBtn').addClass('selected');
    $('#stcLbNearMeBtn').removeClass('selected');
  });
  
  $('#stcLbNearMeBtn').click(function(){
    currLeaderboardVersion = leaderboardVersions[0];
    GAME.findLeaders("stc",currLeaderboardVersion);
    $('#stcLbNearMeBtn').addClass('selected');
    $('#stcLbTopScorersBtn').removeClass('selected');
  });
  
  // end click handlers --------------------------------->

  
}); // end doc ready ------------------------------------------------------------------------------>