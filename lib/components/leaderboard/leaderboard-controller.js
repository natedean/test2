LeaderboardController.$inject = ['$timeout','LeaderboardFactory'];

function LeaderboardController($timeout, LeaderboardFactory){
  let vm = this;

  LeaderboardFactory.getLeaders().then((data)=>{
    vm.leaders = data;

    vm.leaders.forEach((leader)=>{ console.log(leader); });
  });

}

export { LeaderboardController }
