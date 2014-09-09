$(function(){

  FastClick.attach(document.body); // FASTCLICK!!
  
  
  $('.dragChord').draggable({
     appendTo: "body",
        helper: "clone",
     grid: [ 10, 10 ],
     stop: function(event, ui) {   
     $(ui.helper).clone(true).appendTo('body').addClass('clone').draggable({
         containment: "textarea",
        grid: [ 10, 10 ]
        });
     }
    });
 
 
    // delete button
    $('.delete').click(function(){
         if ($('.clone').length > 0) $('.clone:last').remove();
    }); 
    // deleteAll button
    $('.deleteAll').click(function(){
         if ($('.clone').length > 0) $('.clone').remove();
    }); 
  
  
  // ---------------------  HANDLE MODULATION ----------------------------------
  
  var A =  ["A","B","C#","D","E","F#","G#"];
  var Bb = ["Bb","C","D","Eb","F","G","A"];
  var B =  ["B","C#","D#","E","F#","G#","A#"];
  var C =  ["C","D","E","F","G","A","B"];
  var Db = ["Db","Eb","F","Gb","Ab","Bb","C"];
  var D =  ["D","E","F#","G","A","B","C#"];
  var Eb = ["Eb","F","G","Ab","Bb","C","D"];
  var E =  ["E","F#","G#","A","B","C#","D#"];
  var F =  ["F","G","A","Bb","C","D","E"];
  var Gb = ["Gb","Ab","Bb","Cb","Db","Eb","F"];
  var G =  ["G","A","B","C","D","E","F#"];
  var Ab = ["Ab","Bb","C","Db","Eb","F","G"];
  var Numb = [1,2,3,4,5,6,7];
  
  function convert(key,num){
                 
      if (key === "A"){
           return(A[num-1]);
      }
      else if (key === "Bb"){
           return(Bb[num-1]);
      }
      else if (key === "B"){
           return(B[num-1]);
      }
      else if (key === "C"){
           return(C[num-1]);
      }
      else if (key === "Db"){
           return(Db[num-1]);
      }
      else if (key === "D"){
           return(D[num-1]);
      }
      else if (key === "Eb"){
           return(Eb[num-1]);
      }
      else if (key === "E"){
           return(E[num-1]);
      }
      else if (key === "F"){
           return(F[num-1]);
      }
    else if (key === "Gb"){
           return(Gb[num-1]);
      }
    else if (key === "G"){
           return(G[num-1]);
      }
    else if (key === "Ab"){
           return(Ab[num-1]);
      }
    else if (key === "Numb"){
           return(Numb[num-1]);
      }
   
  }
    

  $('.keySelectorRow .dropdown-menu li a').click(function(){
    var currKey = $(this).attr('value');
    
    if(currKey !== "Numb"){
      $('#key').html("Key of&nbsp; " + currKey);
    }else{
      $('#key').html("Number Chart");
    }
    
    $('.chord').each(function(){
      var num = $(this).attr('value');
      var result = convert(currKey,num);
      $(this).html(result);
    });
  }); 
  
  // -----------------------  END HANDLING OF MODULATION ----------------------------------------------------------
  
  

});