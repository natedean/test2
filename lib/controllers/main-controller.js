import angular from 'angular';
import _ from 'lodash';

MainController.$inject = ['QuestionFactory', '$timeout'];

function MainController(QuestionFactory, $timeout){
  let vm = this;

  var ref = new Firebase("https://dazzling-torch-3676.firebaseio.com");
  var scoresRef = ref.child('scores');
  console.log('ref', ref);

  //FIREBASE STUFF
  ref.authAnonymously(function(error, authData) {
    vm.userId = authData.uid;
    setInitialScore();
  }, {
    remember: "sessionOnly"
  });

  function setInitialScore(){
    scoresRef.child(vm.userId).set({
      score: 0
    });
    scoresRef.child(vm.userId).child('score').on('value', function(snapshot) {
      $timeout(()=>{
        vm.userScore = snapshot.val();
      });
    });
  }

  vm.categories = ['guitar', 'music theory','sight reading'];
  vm.selectedCategories = ['guitar']
  vm.categoryMessage = setCategoryMessage();
  //get initial question
  vm.question = QuestionFactory.getQuestion(vm.selectedCategories);

  vm.selectCategory = selectCategory;

  function selectCategory(selectionAttempt){
    if (_.includes(vm.selectedCategories, selectionAttempt)){
      _.remove(vm.selectedCategories, (item)=>{ return item === selectionAttempt });
    }else{
      vm.selectedCategories.push(selectionAttempt);
    }
    if (_.isEmpty(vm.selectedCategories)){
      vm.selectedCategories = vm.categories.slice(0);
    }

    vm.categoryMessage = setCategoryMessage();
    // PLACEHOLDER
    vm.question = QuestionFactory.getQuestion(vm.selectedCategories);
    console.log('Attemping to increase score.');
    scoresRef.child(vm.userId).child('score').transaction(function(currScore) {
      if (currScore === null){ return 0; }
      return currScore+1;
    });


  }

  function setCategoryMessage(){
    if (vm.selectedCategories.length <= 1){ return 'Choose to receive questions from more than one category for bonus points'; }
    let num = vm.selectedCategories.length === vm.categories.length ? 'All' : vm.selectedCategories.length;
    return `${num} categories selected. ${(vm.selectedCategories.length - 1) * 3} bonus points per question`;
  }
}

export { MainController }