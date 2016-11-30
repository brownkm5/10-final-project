var React = require('react');
var $ = require('jquery');

var like = require('../models/likes.js');
var model = require('../models/videos.js');
var TemplateComponent = require('./template.jsx');

var token = require('../../../key.js').token;

var VideoComponent = React.createClass({
  getInitialState: function(){
    var videos = '';
    var xuid = this.props.user;
    var response = '';

  return {
    videos: videos,
    xuid: xuid,
    videoCollection : new model.VideoCollection(),
    pageNumber: 1
  }
},
componentWillMount: function(){
  this.getVideos();

},
  getVideos: function(){
    var self = this;
    var xuid = this.state.xuid;
    var videoCollection = this.state.videoCollection;

    $.ajax('https://xboxapi.com/v2/' + xuid + '/game-clips').then(function(response){
      // console.log(response);
      var videos = response.map(function(video){
        // console.log(video);
        return (
          {title: video.titleName,
          uri: video.gameClipUris,
          recordDate: video.dateRecorded,
          xuid: video.xuid,
          clipDetails: video.gameClipDetails,
          scid: video.scid,
          clipId: video.gameClipId
        }
        );
      });
      videoCollection.add(videos);
      self.setState({videoCollection: videoCollection});
    });
  },
  handlePageNext: function(){
    var pageNumber = this.state.pageNumber + 1;
    this.setState({pageNumber: pageNumber});
  },
  handlePageLast: function(){
    var pageNumber = this.state.pageNumber;
    if (pageNumber > 1) {
       pageNumber = this.state.pageNumber - 1;
       this.setState({pageNumber: pageNumber});
    }
    // console.log(pageNumber);

  },
  render: function(){
    var self = this;
    var collection = this.state.videoCollection;
    var pageNumber = this.state.pageNumber;
    var follower = localStorage.getItem('follower');

    var uris = collection.page(pageNumber).map(function(video){
      // console.log(video);
      return (
        <div key={video.cid} className=''>
          <h3>{video.get('title')}</h3>

          <div className="embed-responsive embed-responsive-16by9">
            <li>
              <video src={video.get('uri')[0].uri} width="520" height="440" controls></video>
            </li>
          </div>
            <button onClick={function(){self.props.handleLike(video)}} type="button" name="button" className='fa fa-thumbs-up like-button btn btn-info'></button>
            <button onClick={function(){self.props.handleComment(video)}} type="button" name="button" className='fa fa-comment btn btn-warning'></button>
        </div>
      )
    });

    return (
      <div>
        <div>
          <h3>Clips saved by {follower}.</h3>
          <div className="pagenation col-sm-12">
            <button type='button' className='btn btn-primary' onClick={this.handlePageLast}>Last Page</button>
            <h3>Page {pageNumber}</h3>
            <button type='button' className='btn btn-primary' onClick={this.handlePageNext}>Next Page</button>
          </div>
          <div className='video-container'>
            <ul className='col-sm-12'>
              {uris}
            </ul>
          </div>
          <div className="pagenation">
            <button type='button' className='btn btn-primary' onClick={this.handlePageLast}>Last Page</button>
            <h3>Page {pageNumber}</h3>
            <button type='button' className='btn btn-primary' onClick={this.handlePageNext}>Next Page</button>
          </div>
        </div>
      </div>
    )
  }
});

var FollowerVideoContainer = React.createClass({
  getInitialState: function(){
    var user = this.props.children.userId;
    var userObjectId = JSON.parse(localStorage.getItem('user')).objectId;
    return {
      user: user,
      objectId: userObjectId
    }
  },

  componentWillMount: function(){
    this.ajaxSetup();
  },

  ajaxSetup: function(){
    var userToken = token;
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Auth', userToken);
      }
    });
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

  handleLike: function(video){
    var self = this;
    this.ajaxSetup();
    var likeCollection = new like.LikesCollection();
    var likedVideo = new like.Like();
    var objectId = this.state.objectId;

    likeCollection.objectId = objectId;
    // console.log(video);
    likedVideo.set('scid', video.attributes.scid);
    likedVideo.set('xuid', video.attributes.xuid);
    likedVideo.set('clipId', video.attributes.clipId);
    likedVideo.set('user', {
      '__type': 'Pointer',
      'className': '_User',
      'objectId': objectId
    });

    likedVideo.set('title', video.attributes.title);
    // console.log(video.attributes.xuid);
    $.ajax('https://xboxapi.com/v2/gamertag/' + video.attributes.xuid).then(function(response){
      likedVideo.set('gamertag', response);
      self.parseSetup();
      likeCollection.create(likedVideo);
      // console.log(likedVideo);
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
        <VideoComponent user={this.state.user} handleComment={this.handleComment} handleLike={this.handleLike}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  FollowerVideoContainer: FollowerVideoContainer
};
