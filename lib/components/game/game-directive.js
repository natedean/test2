import { GameController } from './game-controller';

function game() {
  var directive = {
    link: gameLink,
    scope: {},
    template:`
    <div class="gtGameHeader">
      <h5 class="gtGameHeader__cta">What Kind Of Questions Do You Want?</h5>
      <div class="gtGameHeader__categoryButtonsContainer">
        <button
          ng-repeat="category in vm.categories"
          class="button gtGameHeader__categoryBtn"
          ng-class="{'gtGameHeader__categoryBtn--dormant': vm.selectedCategories.indexOf(category) < 0}"
          ng-click="vm.selectCategory(category)">
          {{ ::category }}
        </button>
      </div>
    </div>
    <div class="gtGameContainer">
      <div class="gtGameContainer__questionTextContainer">
        <div class="gtGameContainer__questionText">{{ vm.question.question }}</div>
            <div class="gtGameContainer__correctAnswerTextContainer">
              {{ 'Speed bonus: ' + vm.speedTimerBonus + '   Multi-category bonus: ' + vm.categoryBonus }}
            </div>
        <button ng-if="vm.incorrectState"
                ng-click="vm.resetGameState()"
                class="button gtGameContainer__moveOnBtn ifAnimation">Incorrect. Click To Continue..</button>
      </div>
      <div class="gtGameContainer__answerBtnRow row">
        <div class="three columns animate-repeat" ng-repeat="answer in vm.answers">
          <button
            class="button button-primary gtGameContainer__answerBtn"
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