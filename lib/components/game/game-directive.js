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
    <div class="gtGame">
      <div class="gtGame__questionTextContainer">
        <div class="gtGame__questionText">{{ vm.question.question }}</div>
            <!--<div class="gtGame__correctAnswerTextContainer">-->
              <!--<div class="gtGame__correctAnswerText">Correct!</div>-->
              <!--<div class="gtGame__bonusText">{{ 'Speed bonus: ' + vm.speedTimerBonus }}</div>-->
              <!--<div class="gtGame__bonusText">{{ 'Multi-category bonus: ' + vm.categoryBonus }}</div>-->
            <!--</div>-->
        <!--<button ng-if="!vm.gameModel.isActive"-->
                <!--ng-click="vm.resetGameState()"-->
                <!--class="button gtGame__moveOnBtn ifAnimation">Incorrect. Click To Continue..</button>-->
      </div>
      <div class="gtGame__answerBtnRow row">
        <div class="gtGame__answerBtnContainer animate-repeat" ng-repeat="answer in vm.answers">
          <button
            class="button button-primary gtGame__answerBtn"
            ng-click="vm.submitAnswer($event, answer)">
            {{ ::answer.answer }}
          </button>
        </div>
      </div>
      <action-panel></action-panel>
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