var Backbone = require('backbone');


var Follower = Backbone.Model.extend({
  idAttribute: '_id',
  user: ''
});

var FollowerCollection = Backbone.Collection.extend({
  model: Follower,
  parse: function(data){
    return data.results
  },
  url: function(){
     var queryString = '?where={"user": ' + ' {"__type": "Pointer", "className": "_User", "objectId": "' + this.objectId + '"}}';
     return 'https://kevinbrowntown.herokuapp.com/classes/Followers/' + queryString;
  }
});

module.exports = {
  Follower: Follower,
  FollowerCollection: FollowerCollection
};
