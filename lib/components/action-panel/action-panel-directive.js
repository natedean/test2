import { ActionPanelController } from './action-panel-controller';

function actionPanel() {
  var directive = {
    link: actionPanelLink,
    scope: {},
    template:`
      <h1>THIS IS THE ACTION PANEL</h1>
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