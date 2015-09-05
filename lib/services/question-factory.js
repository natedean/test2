QuestionFactory.$inject = ['$http'];

function QuestionFactory($http){

  return {
    getQuestion: getQuestion
  }

  function getQuestion(category){
    //let arrLength = questions.length;
    //let rand = random(0, arrLength - 1);
    //return questions[rand];
    return $http.get('http://localhost:3000/question').then( data =>{
      return data.data;
    });
  }
}

export { QuestionFactory }