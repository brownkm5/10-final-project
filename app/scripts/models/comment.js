var Backbone = require('backbone');

var Comments = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var CommentCollection = Backbone.Collection.extend({
  model: Comments,
  queryString: '',
  parse: function(data){
    return data.results
  },
  video: function(clipId){
    this.queryString = '?where={"video": "' + clipId + '"}';
    return this;
  },
  url: function(){
    var url = 'https://kevinbrowntown.herokuapp.com/classes/Comments/' + this.queryString;
    this.queryString = '';
    return url;
  }
});

module.exports = {
  Comments: Comments,
  CommentCollection: CommentCollection
}
