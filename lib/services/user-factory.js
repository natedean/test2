import Firebase from '../../jspm_packages/npm/firebase@2.2.7';
import _ from 'lodash';

UserFactory.$inject = ['$timeout'];

function UserFactory($timeout){
  let ref = new Firebase("https://dazzling-torch-3676.firebaseio.com");
  let scoresRef = ref.child('scores');

  let user = {};
  let levelStructure = {
    1: 0,
    2: 100,
    3: 250,
    4: 500,
    5: 1000,
    6: 2000,
    7: 4000,
    8: 8000,
    9: 16000,
    10: 32000,
    11: 64000
  }

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
        user.currLevel = calcLevel(user.score);
        user.percentageToNextLevel = Math.ceil(((user.score - levelStructure[user.currLevel]) / levelStructure[user.currLevel + 1]) * 100);
      });
    });
  }

  function calcLevel(score){
    for (let i = 1; i < _.keys(levelStructure).length; i++){
      console.log(i);
      console.log(`levelStructure[i]: ${levelStructure[i]}, levelStructure[i + 1]: ${levelStructure[i + 1]}`);
      if(score >= levelStructure[i] && score < levelStructure[i + 1]){ return i; }
    }
  }

  function increaseUserScore(amount){
    scoresRef.child(user.id).child('score').transaction(function(currScore) {
      if (currScore === null){ return 0; }
      return currScore + amount;
    });
  }
}

export { UserFactory }

