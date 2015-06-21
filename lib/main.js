import angular from 'angular';
import '../public/styles/normalizeAndSkeleton.css!';
import '../public/styles/test.css!';

import { QuestionFactory } from '../lib/services/question-factory';
import { UserFactory } from '../lib/services/user-factory';
import { MainController } from '../lib/controllers/main-controller';

angular.module('myApp', [])
  .controller('MainController', MainController)
  .factory('QuestionFactory', QuestionFactory)
  .factory('UserFactory', UserFactory);


