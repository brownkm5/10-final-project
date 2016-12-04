var React = require('react');
var Backbone = require('backbone');

var token = require('../../../key.js').token;

var like = require('../models/likes.js');
var model = require('../models/videos.js');
var TemplateComponent = require('./template.jsx');

var UserComponent = React.createClass({
  getInitialState: function(){
    var videos = '';
    var user = JSON.parse(localStorage.getItem('user'));
    var xuid = user.xuid;
    var response = '';

    return {
      user: user,
      videos: videos,
      xuid: xuid,
      videoCollection : new model.VideoCollection(),
      pageNumber: 1
    }
  },
  componentWillMount: function(){
    this.getVideos();
    this.ajaxSetup();
  },
  ajaxSetup: function(token){
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
  },
  render: function(){
    var self = this;

    var collection = this.state.videoCollection;
    var pageNumber = this.state.pageNumber;
    // console.log(collection);
    var uris = collection.page(pageNumber).map(function(video){

      return (
        <div key={video.cid} className='video'>
          <h3>{video.get('title')}</h3>
          <div className="embed-responsive embed-responsive-16by9">
            <li>
              <video src={video.get('uri')[0].uri} width="520" height="440" controls></video>
            </li>
          </div>
        <div className="buttons">
          <button onClick={function(){self.props.handleLike(video)}} type="button" name="button" className='fa fa-thumbs-up like-button btn btn-info'></button>
          <button onClick={function(){self.props.handleComment(video)}} type="button" name="button" className='fa fa-comment comment-button btn btn-warning'></button>
        </div>
        </div>
      )
    });

    return (
      <div className='uservideos-container'>
        <div className='uservideos-title'>
          <h3 className='title'>My Videos</h3>
        </div>
          <div className="pagenation col-sm-12">
            <button type='button' className='btn btn-primary' onClick={this.handlePageLast}>Last</button>
            <h3>Page {pageNumber}</h3>
            <button type='button' className='btn btn-primary' onClick={this.handlePageNext}>Next</button>
          </div>
          <div className='filter'>

          </div>
          <div className='video-container'>
            <ul className='col-sm-12'>
              {uris}
            </ul>
          </div>
          <div className="pagenation">
            <button type='button' className='btn btn-primary' onClick={this.handlePageLast}>Last</button>
            <h3>Page {pageNumber}</h3>
            <button type='button' className='btn btn-primary' onClick={this.handlePageNext}>Next</button>
          </div>
        </div>
    )
  }
});

var VideosContainer = React.createClass({
  getInitialState: function(){
    var userObjectId = JSON.parse(localStorage.getItem('user')).objectId;
    // console.log(userObjectId);
    return {
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
    this.props.router.navigate('#comments/' + video.get('xuid') + '/' + video.get('scid') + "/" + video.get('clipId') + "/", {trigger: true});
  },
  // getUser: function(){
  //   var self = this;
  //   //gets userXuid, this is only set up to get my videos, i need to make it so that it takes the xuid and inserts
  //   //it into the ajax request
  //
  //   //! pretty sure i dont need this anymore with the update in my UserComponent to pull the xuid
  //   //from localStorage !
  //
  //   // $.ajax('https://xboxapi.com/v2/profile').then(function(response){
  //   //   // console.log('response', response.userXuid);
  //   //   self.setState({xuid: response.userXuid});
  //   // });
  // },
  render: function(){
    return (
      <TemplateComponent>
        <UserComponent handleComment={this.handleComment} handleLike={this.handleLike}/>
      </TemplateComponent>
    )
  }
});


module.exports = {
  VideosContainer: VideosContainer
};
