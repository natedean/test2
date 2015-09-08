import { ActionPanelController } from './action-panel-controller';

function actionPanel() {
  var directive = {
    link: actionPanelLink,
    scope: {},
    template:`
      <div class="gtActionPanel" ng-class="{ 'gtActionPanel--active': !vm.gameModel.isActive }">
        <button ng-click="vm.activateGameState()"
        class="button gtActionPanel__moveOnBtn">Click To Continue.</button>
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

export { actionPanel }