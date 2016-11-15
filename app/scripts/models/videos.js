var Backbone = require('backbone');

var Video = Backbone.Model.extend({

});

var VideoCollection = Backbone.Collection.extend({
  model: Video,
  page: function(pageNumber){
    var top = pageNumber * 10;
    var bottom = top - 10;
    console.log(bottom, top);
    return this.filter(function(model, index){

      return (index<top && index>bottom);
    });
  }
});

module.exports = {
  Video : Video,
  VideoCollection: VideoCollection
}
