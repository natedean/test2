import angular from 'angular';
import animate from '../jspm_packages/npm/angular-animate@1.4.1';

import '../dist/styles/index.css!';

import { GameModelFactory } from '../lib/services/game-model-factory';
import { QuestionFactory } from '../lib/services/question-factory';
import { LeaderboardFactory } from '../lib/services/leaderboard-factory';
import { UserFactory } from '../lib/services/user-factory';
import { MainController } from '../lib/controllers/main-controller';
import { sidebar } from '../lib/components/sidebar/sidebar-directive';
import { game } from '../lib/components/game/game-directive';
import { leaderboard } from '../lib/components/leaderboard/leaderboard-directive';
import { actionPanel } from '../lib/components/action-panel/action-panel-directive';

angular.module('myApp', [animate])
  .controller('MainController', MainController)
  .factory('QuestionFactory', QuestionFactory)
  .factory('GameModelFactory', GameModelFactory)
  .factory('LeaderboardFactory', LeaderboardFactory)
  .factory('UserFactory', UserFactory)
  .directive('game', game)
  .directive('sidebar', sidebar)
  .directive('leaderboard', leaderboard)
  .directive('actionPanel', actionPanel);



