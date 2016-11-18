var Backbone = require('backbone');


var Follower = Backbone.Model.extend({
  idAttribute: '_id',
  user: ''
});

var FollowerCollection = Backbone.Collection.extend({
  model: Follower,
  url: 'https://kevinbrowntown.herokuapp.com/classes/Followers',
  parse: function(data){
    return data.results
  },
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };

    return this;
  },
  // url: function(){
  //    var url = this.baseUrl;
  //
  //    if(this.whereClause.field){
  //      var field = this.whereClause.field;
  //      delete this.whereClause.field;
  //      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
  //    }
  //
  //    return url;
  // },
});

module.exports = {
  Follower: Follower,
  FollowerCollection: FollowerCollection
};
