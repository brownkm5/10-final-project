var Backbone = require('backbone');

var User = Backbone.Model.extend({

});

var UserCollection = Backbone.Collection.extend({
  model: User
});


module.exports = {
  User: User,
  UserCollection: UserCollection
}
