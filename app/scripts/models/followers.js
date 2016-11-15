var Backbone = require('backbone');


var Follower = Backbone.Model.extend({
  idAttribute: '_id',
  user: ''
});

var FollowerCollection = Backbone.Collection.extend({
  model: Follower,
  url: 'https://kevinbrowntown.herokuapp.com/classes/Followers'
});

module.exports = {
  FollowerCollection: FollowerCollection
};
