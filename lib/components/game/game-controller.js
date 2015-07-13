import shuffle from 'lodash/collection/shuffle';
import remove from 'lodash/array/remove';
import isEmpty from 'lodash/lang/isEmpty';
import includes from 'lodash/collection/includes';
import indexOf from 'lodash/array/indexOf';
import pluck from 'lodash/collection/pluck';
import d3 from 'd3';
import { RadialProgress } from '../../services/radial-progress-factory';

GameController.$inject = ['QuestionFactory', 'UserFactory', '$interval', '$scope', '$timeout'];

function GameController(QuestionFactory, UserFactory, $interval, $scope, $timeout){
  let vm = this;

  const intervalSpeed = 2000;
  const basePointsPerQuestion = 10;
  const categoryBonusMultiplier = 10;
  const speedTimerStartValue = 20;

  vm.user = UserFactory.getUser();

  vm.categories = ['guitar', 'music theory','sight reading'];
  vm.selectedCategories = ['guitar'];
  vm.incorrectState = false;
  vm.gameStateLocked = false;
  vm.resetGameState = resetGameState;

  //get initial question
  resetGameState();

  vm.selectCategory = selectCategory;
  vm.submitAnswer = submitAnswer;

  function selectCategory(selectionAttempt){
    if (includes(vm.selectedCategories, selectionAttempt)){
      remove(vm.selectedCategories, (item)=>{ return item === selectionAttempt });
    }else{
      vm.selectedCategories.push(selectionAttempt);
    }
    if (isEmpty(vm.selectedCategories)){
      vm.selectedCategories = vm.categories.slice(0);
    }
  }

  function submitAnswer(e, choice){
    if (vm.gameStateLocked){ return; }
    vm.gameStateLocked = true;
    if (choice.correct){
      angular.element(e.target).addClass('gtTest__answerBtn--correct');
      vm.question.question = 'Correct!';
      assignEarnedPoints();
      $timeout(resetGameState, 1000);
    }else{
      vm.incorrectState = true;
      var indexOfCorrectBtn = indexOf(pluck(vm.answers, 'correct'), true);
      var eCorrectBtn = document.querySelectorAll('.gtTest__answerBtn')[indexOfCorrectBtn];
      angular.element(eCorrectBtn).addClass('gtTest__answerBtn--correct gtTest__answerBtn--pulsate');
    }
  }

  function assignEarnedPoints(){
    vm.speedTimerBonus = vm.speedTimer;
    vm.categoryBonus = (vm.selectedCategories.length - 1) * categoryBonusMultiplier;
    vm.pointsJustEarned = basePointsPerQuestion + vm.speedTimerBonus + vm.categoryBonus;
    UserFactory.increaseUserScore(vm.pointsJustEarned);
  }

  function resetGameState(){
    vm.incorrectState = false;
    vm.question = QuestionFactory.getQuestion(vm.selectedCategories);
    vm.answers = shuffle(vm.question.answers);
    vm.speedTimer = speedTimerStartValue;
    vm.gameStateLocked = false;
  }

  $interval(()=>{
    if (vm.speedTimer > 0){ vm.speedTimer--; }
  }, intervalSpeed);


  //D3 CRAZINESS
  var div1=d3.select(document.getElementById('div1'));

  var rp1 = RadialProgress(document.getElementById('div1'))
    .label("RADIAL 1")
    .diameter(150)
    .value(vm.user.percentageToNextLevel)
    .render();

  $scope.$watch('vm.user.score', ()=>{
    if (!vm.user.score){ return; }
    rp1.value(vm.user.percentageToNextLevel).render();
    console.log(vm.user.percentageToNextLevel);
  });

}

export { GameController }


