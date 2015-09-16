import LeaderboardController from './leaderboard-controller';

export default function leaderboard() {
  var directive = {
    link: leaderboardLink,
    scope: {},
    template:`
      <div class="gtLeaderboard__container">
        <div class="gtLeaderboard__leaderPane" ng-repeat="leader in vm.leaders">
          <h3 class="gtLeaderboard__leaderName">{{ leader.firstName }} {{ leader.lastName}}</h3>
          <p class="gtLeaderboard__leaderEmail">Email: {{ leader.email }}</p>
        </div>
      </div>
    `,
    restrict: 'E',
    controller: LeaderboardController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function leaderboardLink(scope, elem, attrs) {
    /* */
  }
}