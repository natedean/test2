$(function(){
  
  var currDifficultySetting = "Easy";
  
var easyChordsFlats = [{chord:"C Major",spelling:""},{chord:"C minor",spelling:""},{chord:"G minor",spelling:""},{chord:"D minor",spelling:""},{chord:"A minor",spelling:""},{chord:"E minor",spelling:""},{chord:"F Major",spelling:""},{chord:"F minor",spelling:""},{chord:"Bb Major",spelling:""},{chord:"Bb minor",spelling:""},{chord:"Db Major",spelling:""},{chord:"Eb Major",spelling:""},{chord:"Eb minor",spelling:""},{chord:"Ab Major",spelling:""}];
var easyChordsSharps = [{chord:"G Major",spelling:""},{chord:"D Major",spelling:""},{chord:"A Major",spelling:""},{chord:"E Major",spelling:""},{chord:"B Major",spelling:""},{chord:"F# Major",spelling:""},{chord:"B minor",spelling:""},{chord:"F# minor",spelling:""},{chord:"C# minor",spelling:""}];
var mediumChordsFlats = [{chord:"C Maj7",spelling:""},{chord:"C min7",spelling:""},{chord:"G min7",spelling:""},{chord:"D min7",spelling:""},{chord:"A min7",spelling:""},{chord:"E min7",spelling:""},{chord:"F Maj7",spelling:""},{chord:"F min7",spelling:""},{chord:"Bb Maj7",spelling:""},{chord:"Bb min7",spelling:""},{chord:"Eb Maj7",spelling:""},{chord:"Eb min7",spelling:""},{chord:"Ab Maj7",spelling:""},{chord:"C7",spelling:""},{chord:"F7",spelling:""},{chord:"Bb7",spelling:""},{chord:"Eb7",spelling:""},{chord:"Ab7",spelling:""},{chord:"C min7b5",spelling:""},{chord:"E min7b5",spelling:""},{chord:"A min7b5",spelling:""},{chord:"D min7b5",spelling:""},{chord:"C6",spelling:""},{chord:"F6",spelling:""},{chord:"Bb6",spelling:""},{chord:"Eb6",spelling:""},{chord:"F add9",spelling:""},{chord:"Eb add9",spelling:""},{chord:"Ab add9",spelling:""}];
var mediumChordsSharps = [{chord:"G Maj7",spelling:""},{chord:"D Maj7",spelling:""},{chord:"A Maj7",spelling:""},{chord:"E Maj7",spelling:""},{chord:"B Maj7",spelling:""},{chord:"B min7",spelling:""},{chord:"F# min7",spelling:""},{chord:"C# min7",spelling:""},{chord:"G7",spelling:""},{chord:"D7",spelling:""},{chord:"A7",spelling:""},{chord:"E7",spelling:""},{chord:"B7",spelling:""},{chord:"B min7b5",spelling:""},{chord:"F# min7b5",spelling:""},{chord:"C# min7b5",spelling:""},{chord:"G# min7b5",spelling:""},{chord:"G6",spelling:""},{chord:"A6",spelling:""},{chord:"E6",spelling:""},{chord:"G add9",spelling:""},{chord:"D add9",spelling:""},{chord:"A add9",spelling:""},{chord:"E add9",spelling:""}];
var hardChordsFlats = [{chord:"C min9",spelling:""},{chord:"D min9",spelling:""},{chord:"G min9",spelling:""},{chord:"F min9",spelling:""},{chord:"F Maj9",spelling:""},{chord:"Bb Maj9",spelling:""},{chord:"Bb min9",spelling:""},{chord:"Db Maj9",spelling:""},{chord:"Eb Maj9",spelling:""},{chord:"Eb min9",spelling:""},{chord:"Ab Maj9",spelling:""},{chord:"C9",spelling:""},{chord:"F9",spelling:""},{chord:"Bb9",spelling:""},{chord:"Eb9",spelling:""},{chord:"Ab9",spelling:""}];
var hardChordsSharps = [{chord:"C Maj9",spelling:""},{chord:"G Maj9",spelling:""},{chord:"D Maj9",spelling:""},{chord:"A Maj9",spelling:""},{chord:"E Maj9",spelling:""},{chord:"A min9",spelling:""},{chord:"E min9",spelling:""},{chord:"F# min9",spelling:""},{chord:"C# min9",spelling:""},{chord:"G9",spelling:""},{chord:"D9",spelling:""},{chord:"A9",spelling:""},{chord:"E9",spelling:""},{chord:"F#9",spelling:""}];

  $('#stcEasyBtn').click(function(){
    currDifficultySetting = "Easy";
    $('#stcMediumAnswerDisplay').hide();
    $('#stcHardAnswerDisplay').hide();
    
    $('#stcEasyAnswerDisplay').show();

  });
  
  $('#stcMediumBtn').click(function(){
    currDifficultySetting = "medium";
    $('#stcEasyAnswerDisplay').hide();
    $('#stcHardAnswerDisplay').hide();
    
    $('#stcMediumAnswerDisplay').show();

  });
  
  $('#stcHardBtn').click(function(){
    currDifficultySetting = "hard";
    $('#stcEasyAnswerDisplay').hide();
    $('#stcMediumAnswerDisplay').hide();
    
    $('#stcHardAnswerDisplay').show();

  });

  
 

  
});