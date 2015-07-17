import { GameController } from './game-controller';

function game() {
  var directive = {
    link: gameLink,
    template:`
    <div class="gtHeader__container">
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
    </div>
    <div class="gtBonusPointsContainer">
      {{ 'Speed bonus: ' + vm.speedTimerBonus + '   Multi-category bonus: ' + vm.categoryBonus }}
    </div>
    <div class="gameContainer">
      <div class="questionTextContainer">
        <div class="questionText">{{ vm.question.question }}</div>
        <button ng-if="vm.incorrectState"
                ng-click="vm.resetGameState()"
                class="button gtTest__moveOnBtn ifAnimation">Incorrect. Click To Continue..</button>
      </div>
      <div class="gtTest__answerBtnRow row">
        <div class="three columns animate-repeat" ng-repeat="answer in vm.answers">
          <button
            class="button button-primary gtTest__answerBtn"
            ng-click="vm.submitAnswer($event, answer)">
            {{ ::answer.answer }}
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