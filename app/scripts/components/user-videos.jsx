var React = require('react');
var Backbone = require('backbone');

var token = require('../../../key.js').token;

var model = require('../models/videos.js');
var TemplateComponent = require('./template.jsx');

var UserComponent = React.createClass({
  getInitialState: function(){
    var videos = '';
    var xuid = '';
    var response = '';
    //i set the userxuid to my actual xuid for building so that i didnt have to do an ajax request
    //everytime to get that, reset it back to var xuid for final deploy/ also in the container component
    //also remove the component will mount and replace it with the props and did update
    //youll still need the ajax setup
    return {
      videos: videos,
      userXuid: 2535410944557981,
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
  // componentWillReceiveProps: function(nextProps){
  //   var xuid = nextProps.xuid;
  //   this.setState({userXuid: xuid});
  // },
  // componentDidUpdate: function(){
  //   this.getVideos();
  // },
  getVideos: function(){
    var self = this;
    var xuid = this.state.userXuid;
    var videoCollection = this.state.videoCollection;

    $.ajax('https://xboxapi.com/v2/' + xuid + '/game-clips/saved').then(function(response){
      // console.log(response);
      var videos = response.map(function(video){
        return (
          {title: video.titleName,
          uri: video.gameClipUris,
          recordDate: video.dateRecorded}
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
  render: function(){
    var collection = this.state.videoCollection;
    var pageNumber = this.state.pageNumber;


    var uris = collection.page(pageNumber).map(function(video){
      return <li key={video.cid}><video src={video.get('uri')[0].uri} width="520" height="440" controls></video></li>
    });

    return (
      <div>
        <div>
          <h3>Page: {pageNumber}</h3>
          <ul className='col-sm-6 col-sm-offset-3'>{uris}</ul>
        </div>
        <button type='button' className='btn btn-primary' onClick={this.handlePageNext}>Next Page</button>
      </div>
    )
  }
});

var VideosContainer = React.createClass({
  getInitialState: function(){
    var userXuid = '';
    // var currentUser = user.current();
    return {
      xuid: 2535410944557981,

    }
  },
  componentWillMount: function(){
    this.ajaxSetup();
    // this.getUser();
    // console.log(this.state.user);
  },
  ajaxSetup: function(){
    var userToken = token;
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Auth', userToken);
      }
    });
  },
  getUser: function(){
    var self = this;
    //gets userXuid, this is only set up to get my videos, i need to make it so that it takes the xuid and inserts
    //it into the ajax request
    // $.ajax('https://xboxapi.com/v2/profile').then(function(response){
    //   // console.log('response', response.userXuid);
    //   self.setState({xuid: response.userXuid});
    // });
  },
  render: function(){
    return (
      <TemplateComponent>
        <UserComponent xuid={this.state.xuid} />
      </TemplateComponent>
    )
  }
});


module.exports = {
  VideosContainer: VideosContainer
};
