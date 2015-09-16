import RadialProgress from '../../services/radial-progress-factory';

SidebarController.$inject = ['UserFactory', 'GameModelFactory', 'ConstantsFactory', '$scope', '$timeout'];

export default function SidebarController(UserFactory, GameModelFactory, ConstantsFactory, $scope, $timeout){
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
    
    $timeout(()=>{
      rp1.value(vm.user.percentageToNextLevel).render();
      console.log(vm.user.percentageToNextLevel);
    }, ConstantsFactory.SLIDE_TRANSITION_TIME); // wait for sidebar to slide before starting chart animation
  });
}