$(function(){
  
  $('#timeBtn').click(function(){
   
    Parse.Cloud.run("getTime").then(function(results){
      $('#answerContainer').html("");
      $('#question').text(results.question);
    
 var newResults = shuffle(results.answers);     
  newResults.map(function(item){
    if(item.correct){
      $('#answerContainer').append(
    '<div id="c" class="btn btn-lg btn-default answer">' + item.answer + '</div>'
    );
    }else{
      $('#answerContainer').append(
    '<div class="btn btn-lg btn-default answer">' + item.answer + '</div>'
    );   
    }
      
   });// end map  
      
     $('.answer').click(function(e){
    if(e.target.id === "c"){
      alert("correct!");
    }
    
    }); 
      
    },function(error){
      
      alert("Error" + error);
      
    });
    
  });// end click handler
  
  
  


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
}
  
  
});// end doc ready