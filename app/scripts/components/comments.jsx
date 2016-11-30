var React = require('react');
var Backbone = require('backbone');

var token = require('../../../key.js').token;

var TemplateComponent = require('./template.jsx');
var model = require('../models/comment.js');

var VideoContainer = React.createClass({
  getInitialState: function(){
    var url = "https://xboxapi.com/v2/" + this.props.video.xuid + "/" + "game-clip-details" +  "/" + this.props.video.scid +  "/" + this.props.video.clipId;
    console.log(url);
    return {
      url: url,
      videoOwner: ''
    }
  },
  componentWillMount: function(){
    this.ajaxSetup();

    var self = this;
    $.ajax('https://xboxapi.com/v2/gamertag/' + this.props.video.xuid).then(function(response){
      self.setState({videoOwner: response});
    });
    var url = this.state.url;
    $.ajax(url).then(function(response){
      self.setState({videoUrl: response.gameClipUris[0].uri});
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
  render: function(){

    return (
      <div>
        <h3>{this.state.videoOwner}</h3>
        <h3>{this.props.video.title}</h3>
        <div className="embed-responsive embed-responsive-16by9">
        <video src={this.state.videoUrl} width="520" height="440" controls></video>
      </div>
      </div>
    )
  }
});

var CommentsComponent = React.createClass({
  getInitialState: function(){
    return {
      commentCollection: new model.CommentCollection(),
      comment: ''
    }
  },
  parseSetup: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
      }
    });
  },
  componentWillMount:function(){
    this.parseSetup();
    var self = this;

    var commentCollection = this.state.commentCollection;

    function fetchComments(){
      commentCollection.video(self.props.video.clipId).fetch().then(function(){
        self.setState({commentCollection: commentCollection});
      })
    };

    window.setInterval(fetchComments, 5000);
  },
  handleComment: function(e){
    var comment = e.target.value;
    this.setState({comment: comment});
  },
  handleSubmit: function(){
    var self = this;

    var comment = new model.Comments();
    var commentCollection = this.state.commentCollection;

    comment.set('comment', this.state.comment);
    comment.set('video', this.props.video.clipId);
    comment.set('commenter', JSON.parse(localStorage.getItem('user')).gamertag);

    console.log(comment);

    commentCollection.create(comment, {
      success: function(){
        console.log(commentCollection);
        self.setState({commentCollection: commentCollection, comment: ''});
      }
    });
    //it says .then isnt a function
    // .then(function(){
    //   self.setState({commentCollection: commentCollection});
    // })
  },
  render: function(){
    var commentCollection = this.state.commentCollection;
    var comments = commentCollection.map(function(comment){
      return <p key={comment.cid}>{comment.get('commenter')}: {comment.get('comment')}</p>
    })
    return (
      <div className="comment-holder">
        <p className='comment-title'>Comments:</p>
        <h3>{comments}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-4">
            <input className='form-control' onChange={this.handleComment} type="text" name="" value={this.state.comment} />
          </div>
          <button className='btn btn-success' type="submit" name="button">Comment</button>
        </form>
      </div>

    )
  }
});

var VideoCommentsContainer = React.createClass({
  getInitialState: function(){
    var video = JSON.parse(localStorage.getItem('video'));
    return {
      video: video
    }
  },
  render: function(){
    return (
      <TemplateComponent>
        <VideoContainer video={this.state.video}/>
        <CommentsComponent video={this.state.video}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  VideoCommentsContainer: VideoCommentsContainer
}
