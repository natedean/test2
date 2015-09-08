GameModelFactory.$inject = [];

function GameModelFactory(){
  let gameModel = {
    isActive: true
  };

  return {
    getGameModel,
    setActiveState
  };

  function getGameModel(){
    return gameModel;
  }

  function setActiveState(status){
    gameModel.isActive = status;
  }

}

export { GameModelFactory }