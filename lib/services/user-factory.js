import Firebase from '../../jspm_packages/npm/firebase@2.2.7';

UserFactory.$inject = ['$timeout'];

function UserFactory($timeout){
  let ref = new Firebase("https://dazzling-torch-3676.firebaseio.com");
  let scoresRef = ref.child('scores');

  let user = {};

  setUser();

  return {
    getUser,
    increaseUserScore
  };

  function getUser(){
    return user;
  }

  function whatever(){
    console.log('whatever.');
  }

  function setUser(){
    ref.authAnonymously(function(error, authData) {
      user.id = authData.uid;
      setInitialScore();
    }, {
      remember: "sessionOnly"
    });
  }

  function setInitialScore(){
    scoresRef.child(user.id).set({
      score: 0
    });
    scoresRef.child(user.id).child('score').on('value', function(snapshot) {
      $timeout(()=>{
        user.score = snapshot.val();
      });
    });
  }

  function increaseUserScore(amount){
    scoresRef.child(user.id).child('score').transaction(function(currScore) {
      if (currScore === null){ return 0; }
      return currScore + amount;
    });
  }
}

export { UserFactory }

