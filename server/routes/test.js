module.exports = function* (next){
  var peopleCollection = this.mongo.db('simple').collection('people');
  var people = yield peopleCollection.find({}).toArray();

  this.body = people;
};