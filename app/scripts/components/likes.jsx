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
    // console.log(likeCollection);
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
  getLikes: function(){
    this.ajaxSetup();
    var self = this;
    var likeCollection = this.state.likeCollection;

    var newLikeCollection = likeCollection.map(function(video){

      //this is where im getting the game details and then setting the url property on the videos, that works
      $.ajax("https://xboxapi.com/v2/" + video.attributes.xuid + "/" + "game-clip-details" +  "/" + video.attributes.scid +  "/" + video.attributes.clipId).then(function(response){
        // console.log(response.gameClipUris[0].uri);
        video.set('url', response.gameClipUris[0].uri);
        // console.log('willmount', video);
        self.setState({likeCollection: newLikeCollection});
      });
    });
  },
  render: function(){

    this.getLikes();

    var likeCollection = this.state.likeCollection;
    console.log('likeCollection', likeCollection);

    var videos = likeCollection.map(function(video){
    // console.log('render', video.attributes.url);
      return (
        <div key={video.cid} className="">
          <h3>{video.attributes.title}</h3>
          <h3>{video.attributes.gamertag}</h3>
          <div className="embed-responsive embed-responsive-16by9">
            <li className='videos'>
              <video src={video.attributes.url} width="520" height="440" controls></video>
            </li>
          </div>
        </div>
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
