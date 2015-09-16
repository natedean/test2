LeaderboardController.$inject = ['LeaderboardFactory'];

export default function LeaderboardController(LeaderboardFactory){
  let vm = this;

  LeaderboardFactory.getLeaders().then((data)=>{
    vm.leaders = data;
  });

}
