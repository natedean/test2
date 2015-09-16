GameModelFactory.$inject = ['ConstantsFactory','$rootScope', '$timeout'];

export default function GameModelFactory(ConstantsFactory, $rootScope, $timeout){
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
    
    $timeout(()=>{
      $rootScope.$broadcast('game-activated');
    }, ConstantsFactory.SLIDE_TRANSITION_TIME);
  }

  function deactivateGameState(isUserCorrect){
    gameModel.isActive = false;

    gameModel.inactiveState.isCorrectAnswer = isUserCorrect;
  }
}
