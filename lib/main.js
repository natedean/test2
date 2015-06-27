import angular from 'angular';
import animate from '../jspm_packages/npm/angular-animate@1.4.1';

import '../public/styles/index.css!';

import { QuestionFactory } from '../lib/services/question-factory';
import { UserFactory } from '../lib/services/user-factory';
import { MainController } from '../lib/controllers/main-controller';
import { game } from '../lib/components/game/game-directive';

angular.module('myApp', [animate])
  .controller('MainController', MainController)
  .factory('QuestionFactory', QuestionFactory)
  .factory('UserFactory', UserFactory)
  .directive('game', game);



