import { SidebarController } from './sidebar-controller';

function sidebar() {
  var directive = {
    link: sidebarLink,
    scope: {},
    template:`
    <div class="gtSidebar__container" ng-class="{ 'gtSidebar__container--active': !vm.gameModel.isActive }">
      <ul>
        <li class="gtSidebar__item">
          <p class="gtSidebar__text gtSidebar__text--label">username</p>
          <p class="gtSidebar__text gtSidebar__username">
            {{ vm.user.id.substring(0,9) === 'anonymous' ? 'anonymous' : vm.user.id || '...'  }}
          </p>
          <p class="gtSidebar__text gtSidebar__text--label gtSidebar__scoreLabel">score</p>
          <p class="gtSidebar__text gtSidebar__score">{{ vm.user.score === undefined ? '...' : vm.user.score }}</p>
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
    `,
    restrict: 'E',
    controller: SidebarController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function sidebarLink(scope, elem, attrs) {
    /* */
  }
}

export { sidebar }