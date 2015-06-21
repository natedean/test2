import { GameController } from './game-controller';

function game() {
  var directive = {
    link: gameLink,
    template:`
    <div class="gtHeader__container">
      <span>My Level: 1</span>
      <span>My Score: {{ vm.user.score }}</span>
      <h5 class="gtTest__gameHeader">What Kind Of Questions Do You Want?</h5>
      <div class="categoryButtonsContainer">
        <button
          ng-repeat="category in vm.categories"
          class="button categoryBtn"
          ng-class="{'categoryBtn--dormant': vm.selectedCategories.indexOf(category) < 0}"
          ng-click="vm.selectCategory(category)">
          {{ ::category }}
        </button>
      </div>
      <p class="categoryMessage">{{ vm.categoryMessage }}</p>
    </div>
    <div class="gameContainer">
      <div class="questionTextContainer">
        <span class="questionText">{{ vm.question.question }}</span>
      </div>
      <div class="gtTest__answerBtnRow row">
        <div class="three columns" ng-repeat="item in vm.question.answers">
          <button
            class="button button-primary gtTest__answerBtn"
            ng-click="vm.submitAnswer()">
            {{ ::item.answer }}
          </button>
        </div>
      </div>
    </div>
    `,
    restrict: 'E',
    controller: GameController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function gameLink(scope, elem, attrs) {
    /* */
  }
}

export { game }