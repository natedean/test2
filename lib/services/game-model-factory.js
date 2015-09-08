GameModelFactory.$inject = ['$rootScope'];

function GameModelFactory($rootScope){
  let gameModel = {
    isActive: true
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

  function deactivateGameState(){
    gameModel.isActive = false;
  }

}

export { GameModelFactory }