LeaderboardFactory.$inject = ['$http'];

function LeaderboardFactory($http){

  return {
    getLeaders
  };

  function getLeaders(){
    return $http.get('http://localhost:3000/test').then(data => data.data);
  }

}

export { LeaderboardFactory }