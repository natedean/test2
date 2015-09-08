ActionPanelController.$inject = ['GameModelFactory'];

function ActionPanelController(GameModelFactory){
  let vm = this;

  vm.gameModel = GameModelFactory.getGameModel();

  vm.activateGameState = activateGameState;

  function activateGameState(){
    GameModelFactory.activateGameState();
  }
}

export { ActionPanelController }