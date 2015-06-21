import _ from 'lodash';

MainController.$inject = ['QuestionFactory', 'UserFactory'];

function MainController(QuestionFactory, UserFactory){
  let vm = this;

  vm.user = UserFactory.getUser();

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
    UserFactory.increaseUserScore(10);
  }

  function setCategoryMessage(){
    if (vm.selectedCategories.length <= 1){ return 'Choose to receive questions from more than one category for bonus points'; }
    let num = vm.selectedCategories.length === vm.categories.length ? 'All' : vm.selectedCategories.length;
    return `${num} categories selected. ${(vm.selectedCategories.length - 1) * 3} bonus points per question`;
  }
}

export { MainController }