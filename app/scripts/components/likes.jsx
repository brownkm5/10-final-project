var React = require('react');

var token = require('../../../key.js').token;

var like = require('../models/likes.js');
var model = require('../models/likes.js');
var TemplateComponent = require('./template.jsx');

var VideosContainer = React.createClass({
  getInitialState: function(){
    var userObjectId = JSON.parse(localStorage.getItem('user')).objectId;
    return {
      likeCollection: new like.LikesCollection(),
      objectId: userObjectId
    }
  },
  componentWillMount: function(){
    this.parseSetup();
    var self = this;
    var likeCollection = this.state.likeCollection;

    likeCollection.objectId = this.state.objectId;

    likeCollection.fetch().then(function(){
      self.setState({likeCollection: likeCollection});
    });
    console.log(likeCollection);
  },
  parseSetup: function(token){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
      }
    });
  },
  render: function(){
    var likeCollection = this.state.likeCollection;
    var videos = likeCollection.map(function(video){

      return (
        <li className='videos' key={video.cid}>
          <h3>{video.attributes.title}</h3>
          <h3>{video.attributes.gamertag}</h3>
          <video src={video.attributes.url} width="520" height="440" controls></video>
        </li>
      )
    });
    return (
      <ul>{videos}</ul>
    )
  }
});

var LikesContainer = React.createClass({
  render: function(){
    return (
      <TemplateComponent>
        <VideosContainer />
      </TemplateComponent>
    )
  }
});

module.exports = {
  LikesContainer: LikesContainer
};
