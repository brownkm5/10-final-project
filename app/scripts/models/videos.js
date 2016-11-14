var Backbone = require('backbone');

var Video = Backbone.Model.extend({

});

var VideoCollection = Backbone.Collection.extend({
  model: Video  
});

module.exports = {
  Video : Video,
  VideoCollection: VideoCollection
}
