import shuffle from 'lodash/collection/shuffle';
import remove from 'lodash/array/remove';
import isEmpty from 'lodash/lang/isEmpty';
import includes from 'lodash/collection/includes';
import indexOf from 'lodash/array/indexOf';
import pluck from 'lodash/collection/pluck';
//import { shuffle, remove, isEmpty, includes, indexOf, pluck } from 'lodash'; // not working...
import d3 from 'd3';
import { RadialProgress } from '../../services/radial-progress-factory';

GameController.$inject = ['QuestionFactory', 'UserFactory', 'GameModelFactory', '$interval', '$rootScope'];

export function GameController(QuestionFactory, UserFactory, GameModelFactory, $interval, $rootScope){
  let vm = this;

  const intervalSpeed = 2000;
  const basePointsPerQuestion = 10;
  const categoryBonusMultiplier = 10;
  const speedTimerStartValue = 20;

  vm.categories = ['guitar', 'music theory','sight reading'];
  vm.selectedCategories = ['guitar'];
  vm.correctState = false;
  vm.resetGameState = resetGameState;
  vm.gameModel = GameModelFactory.getGameModel();

  //set initial game state
  resetGameState();

  vm.selectCategory = selectCategory;
  vm.submitAnswer = submitAnswer;

  $rootScope.$on('game-activated', resetGameState);

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
    if (!vm.gameModel.isActive){ return; }
    GameModelFactory.deactivateGameState();
    if (choice.correct){
      angular.element(e.target).addClass('gtGameContainer__answerBtn--correct');
      assignEarnedPoints();
      //$timeout(resetGameState, 3000);
    }else{
      var indexOfCorrectBtn = indexOf(pluck(vm.answers, 'correct'), true);
      var eCorrectBtn = document.querySelectorAll('.gtGameContainer__answerBtn')[indexOfCorrectBtn];
      angular.element(eCorrectBtn).addClass('gtGameContainer__answerBtn--correct gtGameContainer__answerBtn--pulsate');
    }
  }

  function assignEarnedPoints(){
    vm.speedTimerBonus = vm.speedTimer;
    vm.categoryBonus = (vm.selectedCategories.length - 1) * categoryBonusMultiplier;
    vm.pointsJustEarned = basePointsPerQuestion + vm.speedTimerBonus + vm.categoryBonus;
    UserFactory.increaseUserScore(vm.pointsJustEarned);
  }

  function resetGameState(){
    QuestionFactory.getQuestion(vm.selectedCategories).then((data)=>{
      vm.question = data;
      vm.answers = shuffle(vm.question.answers);
    });
    vm.speedTimer = speedTimerStartValue;
  }

  $interval(()=>{
    if (vm.speedTimer > 0){ vm.speedTimer--; }
  }, intervalSpeed);

}



