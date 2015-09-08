import { RadialProgress } from '../../services/radial-progress-factory';

SidebarController.$inject = ['UserFactory', 'GameModelFactory', '$scope'];

function SidebarController(UserFactory, GameModelFactory, $scope){
  let vm = this;

  vm.user = UserFactory.getUser();
  vm.gameModel = GameModelFactory.getGameModel();

  //D3 CRAZINESS
  var rp1 = RadialProgress(document.getElementById('div1'))
    .label("RADIAL 1")
    .diameter(150)
    .value(vm.user.percentageToNextLevel)
    .render();

  $scope.$watch('vm.user.score', ()=>{
    if (!vm.user.score){ return; }
    rp1.value(vm.user.percentageToNextLevel).render();
    console.log(vm.user.percentageToNextLevel);
  });
}

export { SidebarController }