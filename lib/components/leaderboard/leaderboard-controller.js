LeaderboardController.$inject = ['$timeout','LeaderboardFactory'];

function LeaderboardController($timeout, LeaderboardFactory){
  let vm = this;

  LeaderboardFactory.getLeaders().then((data)=>{
    vm.leaders = data;

  });

}

export { LeaderboardController }
