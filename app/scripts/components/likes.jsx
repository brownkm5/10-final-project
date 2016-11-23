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
        // if(token){
        //   xhr.setRequestHeader('X-Parse-Session-Token', token);
        // }
      }
    });
  },
  render: function(){
    var likeCollection = this.state.likeCollection;
    var videos = likeCollection.map(function(video){
      console.log(video);
      return (
        <div className="">
          <h3>{video.attributes.title}</h3>
          <h3>{video.attributes.gamertag}</h3>
          <div key={video.cid} className="embed-responsive embed-responsive-16by9">
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
// 38f63315-c95b-46ce-a35a-90109871a702
// https://gameclipscontent-d2016.xboxlive.com/0009000001e05d84-38f63315-c95b-46ce-a35a-90109871a702/GameClip-Original.MP4?sv=2014-02-14&sr=b&si=DefaultAccess&sig=fxTwu9fr1zOjuowWcxb679V6Cz5ahU9Zw%2BYFaDnRkGE%3D&__gda__=1479921397_5795533276fb38558ce3f618d53c6f17
// "https:\/\/gameclipscontent-d2016.xboxlive.com\/0009000001e05d84-38f63315-c95b-46ce-a35a-90109871a702\/GameClip-Original.MP4?sv=2014-02-14&sr=b&si=DefaultAccess&sig=fxTwu9fr1zOjuowWcxb679V6Cz5ahU9Zw%2BYFaDnRkGE%3D&__gda__=1479933930_ea0274e1e2da13b968aa92289b7738e7"
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
