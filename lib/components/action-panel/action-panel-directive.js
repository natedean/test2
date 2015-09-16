import ActionPanelController from './action-panel-controller';

export default function actionPanel() {
  var directive = {
    link: actionPanelLink,
    scope: {},
    template:`
      <div class="gtActionPanel"
           ng-class="{ 'gtActionPanel--active': !vm.gameModel.isActive ,
                       'gtActionPanel--correct': vm.gameModel.inactiveState.isCorrectAnswer }">
      <div class="gtActionPanel__textContainer">
      </div>
        <button ng-click="vm.activateGameState()"
                class="button gtActionPanel__moveOnBtn">
          {{ vm.gameModel.inactiveState.isCorrectAnswer ? 'Correct!' : 'Incorrect' }}
          <br>
          Click To Continue
        </button>
      </div>
    `,
    restrict: 'E',
    controller: ActionPanelController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function actionPanelLink(scope, elem, attrs) {
    /* */
  }
}