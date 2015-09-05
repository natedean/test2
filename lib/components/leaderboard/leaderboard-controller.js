LeaderboardController.$inject = ['$timeout','LeaderboardFactory','$http'];

function LeaderboardController(LeaderboardFactory){
  let vm = this;

  LeaderboardFactory.getLeaders().then((data)=>{
    vm.leaders = data;
  });

}

export { LeaderboardController }
