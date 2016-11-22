var Backbone = require('backbone');

var Like = Backbone.Model.extend({
  idAttribute:'_id'
});

var LikesCollection = Backbone.Collection.extend({
  model: Like,
  parse: function(data){
    return data.results
  },
  url: function(){
     var queryString = '?where={"user": ' + ' {"__type": "Pointer", "className": "_User", "objectId": "' + this.objectId + '"}}';
     return 'https://kevinbrowntown.herokuapp.com/classes/Likes/' + queryString;
  }
});

module.exports = {
  Like: Like,
  LikesCollection: LikesCollection
};
