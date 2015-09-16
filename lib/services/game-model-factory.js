GameModelFactory.$inject = ['$rootScope'];

export default function GameModelFactory($rootScope){
  let gameModel = {
    isActive: true,
    inactiveState: {
      isCorrectAnswer: undefined
    }
  };

  return {
    getGameModel,
    activateGameState,
    deactivateGameState
  };

  function getGameModel(){
    return gameModel;
  }

  function activateGameState(){
    gameModel.isActive = true;

    $rootScope.$broadcast('game-activated');
  }

  function deactivateGameState(isUserCorrect){
    gameModel.isActive = false;

    gameModel.inactiveState.isCorrectAnswer = isUserCorrect;
  }
}
