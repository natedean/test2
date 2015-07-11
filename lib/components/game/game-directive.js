import { GameController } from './game-controller';

function game() {
  var directive = {
    link: gameLink,
    template:`
    <div class="gtSidebar__container">
      <ul>
        <li class="gtSidebar__item">
          <p class="gtSidebar__text gtSidebar__text--label">username</p>
          <p class="gtSidebar__text gtSidebar__username">{{ vm.user.id }}</p>
          <p class="gtSidebar__text gtSidebar__text--label">score</p>
          <p class="gtSidebar__text gtSidebar__score">{{ vm.user.score }}</p>
        </li>
        <li class="gtSidebar__item">
          <div id="div1">
            <span class="gtSidebar__text gtSidebar__text--label gtSidebar__levelLabel">{{ 'level ' + vm.user.currLevel }}</span>
          </div>
        </li>
        <li class="gtSidebar__item"></li>
        <li class="gtSidebar__item"></li>
      </ul>
    </div>
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
      </div>
      <div class="gtTest__answerBtnRow row">
        <div class="three columns animate-repeat" ng-repeat="item in vm.answers">
          <button
            class="button button-primary gtTest__answerBtn"
            ng-click="vm.submitAnswer(item)">
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