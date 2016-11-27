var Backbone = require('backbone');

var Like = Backbone.Model.extend({
  idAttribute:'objectId'
});

var LikesCollection = Backbone.Collection.extend({
  model: Like,
  queryString: '',
  parse: function(data){
    return data.results
  },
  user: function(objectId){
    this.queryString = '?where={"user": ' + ' {"__type": "Pointer", "className": "_User", "objectId": "' + objectId + '"}}';
    return this;
  },
  url: function(){
    var url = 'https://kevinbrowntown.herokuapp.com/classes/Likes/' + this.queryString;
    this.queryString = '';
    return url;
  }
});

module.exports = {
  Like: Like,
  LikesCollection: LikesCollection
};
