ActionPanelController.$inject = ['GameModelFactory'];

export default function ActionPanelController(GameModelFactory){
  let vm = this;

  vm.gameModel = GameModelFactory.getGameModel();

  vm.activateGameState = activateGameState;

  function activateGameState(){
    GameModelFactory.activateGameState();
  }
}