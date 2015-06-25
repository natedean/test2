import _ from 'lodash';
import d3 from 'd3';
import { RadialProgress } from '../../services/radial-progress-factory';

GameController.$inject = ['QuestionFactory', 'UserFactory', '$interval'];

function GameController(QuestionFactory, UserFactory, $interval){
  let vm = this;

  const intervalSpeed = 2000;
  const basePointsPerQuestion = 5;
  const categoryBonusMultiplier = 3;
  const speedTimerStartValue = 10;

  vm.user = UserFactory.getUser();

  vm.categories = ['guitar', 'music theory','sight reading'];
  vm.selectedCategories = ['guitar'];

  //get initial question
  resetGameState();

  vm.selectCategory = selectCategory;
  vm.submitAnswer = submitAnswer;

  function selectCategory(selectionAttempt){
    if (_.includes(vm.selectedCategories, selectionAttempt)){
      _.remove(vm.selectedCategories, (item)=>{ return item === selectionAttempt });
    }else{
      vm.selectedCategories.push(selectionAttempt);
    }
    if (_.isEmpty(vm.selectedCategories)){
      vm.selectedCategories = vm.categories.slice(0);
    }
  }

  function submitAnswer(choice){
    if (choice.correct){
      assignEarnedPoints();
      resetGameState();
    }
  }

  function assignEarnedPoints(){
    vm.speedTimerBonus = vm.speedTimer;
    vm.categoryBonus = (vm.selectedCategories.length - 1) * categoryBonusMultiplier;
    vm.pointsJustEarned = basePointsPerQuestion + vm.speedTimerBonus + vm.categoryBonus;
    UserFactory.increaseUserScore(vm.pointsJustEarned);
  }

  function resetGameState(){
    vm.question = QuestionFactory.getQuestion(vm.selectedCategories);
    vm.answers = _.shuffle(vm.question.answers);
    vm.speedTimer = speedTimerStartValue;
  }

  $interval(()=>{
    if (vm.speedTimer > 0){ vm.speedTimer--; }
  }, intervalSpeed);

  let userScorePercentage = 100;



  //D3 CRAZINESS
  var div1=d3.select(document.getElementById('div1'));

  var rp1 = RadialProgress(document.getElementById('div1'))
    .label("RADIAL 1")
    .diameter(150)
    .value(userScorePercentage)
    .render();

  $interval(()=>{
    userScorePercentage += 20;
    rp1.value(userScorePercentage).render();
    console.log(userScorePercentage);
  }, 3000);



}

export { GameController }

