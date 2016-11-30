var React = require('react');

var token = require('../../../key.js').token;

var like = require('../models/likes.js');
var model = require('../models/likes.js');
var TemplateComponent = require('./template.jsx');

var VideosContainer = React.createClass({
  render: function(){
    var self = this;
    var likeCollection = this.props.likeCollection;

    var videos = likeCollection.map(function(video){
      return (
        <div key={video.cid} className="liked-videos">
          <h3 className='gamertag'>{video.get('gamertag')}</h3>
          <h3>{video.get('title')}</h3>
          <div className="embed-responsive embed-responsive-16by9">
            <li className='videos'>
              <video src={video.get('url')} width="520" height="440" controls></video>
            </li>
          </div>
          <div className="buttons">
            <button onClick={function(){self.props.handleDelete(video)}} type='button' className='fa fa-trash-o btn btn-danger'></button>
            <button onClick={function(){self.props.handleComment(video)}} type="button" name="button" className='fa fa-comment btn btn-warning'></button>
          </div>
        </div>
      )
    });
    return (
      <div>
        <h3 className='title'>My Liked Videos</h3>
        <ul>{videos}</ul>
      </div>

    )
  }
});

var LikesContainer = React.createClass({
  getInitialState: function(){
    var userObjectId = JSON.parse(localStorage.getItem('user')).objectId;
    return {
      likeCollection: new like.LikesCollection(),
      objectId: userObjectId,
      test: true
    }
  },
  parseSetup: function(token){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
        // if(token){
        //   xhr.setRequestHeader('X-Parse-Session-Token', token);
        // }
      }
    });
  },
  ajaxSetup: function(){
    var userToken = token;
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Auth', 'da4b685574e5546dbd34e64ed1e6c8c7946435d7');
      }
    });
  },

  componentWillMount: function(){
    this.parseSetup();
    var self = this;
    var likeCollection = this.state.likeCollection;

    likeCollection.user(this.state.objectId).fetch().then(function(){
      self.setState({likeCollection: likeCollection});
      self.getLikes();
    });
  },
  getLikes: function(){
    this.ajaxSetup();
    var self = this;
    var likeCollection = this.state.likeCollection;

    // Get all the updated urls from xbox api
    var imageFetches = likeCollection.map(function(video){
      return $.ajax("https://xboxapi.com/v2/" + video.attributes.xuid + "/" + "game-clip-details" +  "/" + video.attributes.scid +  "/" + video.attributes.clipId).then(function(response){
        video.set('url', response.gameClipUris[0].uri);
        // console.log(response.gameClipUris[0].uri);
      });
    });

    // Wait for all xbox requests to finish
    Promise.all(imageFetches).then(function(){
      self.setState({likeCollection: likeCollection});
    });

  },
  handleDelete: function(video){
    this.parseSetup();
    var self = this;
    // console.warn(video);
    video.destroy().then(function(){
      self.setState({likeCollection: self.state.likeCollection});
    });
  },

  handleComment: function(video){
    var videoData = {xuid: video.get('xuid'), scid: video.get('scid'), clipId: video.get('clipId'), title: video.get('title')};

    localStorage.setItem('video', JSON.stringify(videoData));
    this.props.router.navigate('#comments/' + video.get('clipId') + '/', {trigger: true});
  },

  render: function(){
    return (
      <TemplateComponent>
        <VideosContainer handleComment={this.handleComment} likeCollection={this.state.likeCollection} handleDelete={this.handleDelete}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  LikesContainer: LikesContainer
};
