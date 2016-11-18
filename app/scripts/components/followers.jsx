var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');
var model = require('../models/followers.js');

var token = require('../../../key.js').token;

var FormComponent = React.createClass({
  getInitialState: function(){
    return {
      gamertag: ''
    }
  },
  handleGamertag: function(e){
    var gamertag = e.target.value;
    this.setState({gamertag: gamertag});
  },
  handleAddFollower: function(e){
    e.preventDefault();
    var gamertag = this.state.gamertag;
    this.props.addfollower(gamertag);
    this.setState({gamertag: ''});
  },
  render: function(){
    return(
      <div className="row">
        <form onSubmit={this.handleAddFollower} className="form-inline col-sm-5 add-follower">
          <label htmlFor='gamertag'>Gamertag</label>
          <input className='form-control' onChange={this.handleGamertag} id='gamertag' placeholder='Gamertag'  type="text" name="name" value={this.state.gamertag} />
          <button className='btn btn-success' type="submit" name="button">Add Follower</button>
        </form>
      </div>
    )
  }
});


var FollowerComponent = React.createClass({
  getInitialState: function(){
    return {
      followers: this.props.followers,
      state: ''
    }
  },

  componentWillReceiveProps: function(nextProps){
    // console.log(nextProps.followers);
    this.setState({followers: nextProps.followers});
  },

  //create collection of followers from the inputs of the form
  //then map over that collection and list them out with links to follower-video page
  //send the gamertag to that page and make a request for that users video with their xuid
  //have to make a request for the xuid and save it to the gamertag model for faster video loading
  //and so there isnt an ajax request just for the xuid everytime the view button is clicked
  //add view and delete buttons to each gamertag

  render: function(){
    var followers = this.state.followers;
    // console.log('map', followers);
    var followerList = followers.map(function(follower){
      // console.log(follower);
      return (
      <a href={'#followers/' + follower.attributes.xuid + '/videos/'} className='col-sm-6' key={follower.cid}>
        <h1>{follower.attributes.gamertag}</h1>
      </a>
    )
    });

    return (
    <div>
      <div>
        {followerList}
      </div>
    </div>
    )
  }
});

var FollowersContainer = React.createClass({
  getInitialState: function(){
    var followerCollection = new model.FollowerCollection;
    return {
      followerCollection: followerCollection,
      showForm: false,
      user: '',
      xuid: ''
    }
  },
  xboxSetup: function(){
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
        // if(token){
        //   xhr.setRequestHeader('X-Parse-Session-Token', token);
        // }
      }
    });
  },

  componentWillMount: function(){
    // var self = this;
    // var token = localStorage.getItem('token');
    // var collection = this.state.followerCollection;
    var user = JSON.parse(localStorage.getItem('user')).objectId;

    this.setState({user : user});

    this.parseSetup();

    var self = this;
    var followerCollection = this.state.followerCollection;

    followerCollection.fetch().then(function(){
      self.setState({followerCollection: followerCollection});
    });
    // console.log(this.state.followerCollection);
    // this.state.followerCollection.fetch().parseWhere('user', 'User', )
    // this.setState({followerCollection: this.state.followerCollection});
    // console.log('state', this.state.followerCollection);
  },

  // componentDidMount: function(){
  //  var self = this;
    // var followerCollection = this.state.followerCollection;
    //
    //
    // followerCollection.fetch().then(function(){
    //   self.setState({followerCollection: followerCollection});
    // });
  // },

  handleToggleForm: function(e){
    e.preventDefault();

    var showForm = !this.state.showForm;
    this.setState({showForm: showForm});
  },

  addfollower: function(gamertag){
    var followerCollection = this.state.followerCollection;
    var self = this;

    // this.parseSetup();
    this.xboxSetup();

    // ended up having to put the post to parse followers in the then function because it would run that
    //before the request for the xuid was done
    $.ajax('https://xboxapi.com/v2/xuid/' + gamertag).then(function(response){

      self.setState({xuid: response});

      self.parseSetup();

      followerCollection.create({gamertag: gamertag, xuid: self.state.xuid});
      self.setState({followerCollection: self.state.followerCollection});
      // self.setState({xuid: undefined});
    });

    // console.log(this.state.xuid);

  },

  render: function(){
    return (
      <TemplateComponent>
        <button className='add-button btn btn-primary' type="button" name="button" onClick={this.handleToggleForm}>Add Follower</button>
        <div className="">
            {this.state.showForm ? <FormComponent addfollower={this.addfollower}/> : null}
        </div>
        <FollowerComponent followers={this.state.followerCollection}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  FollowersContainer : FollowersContainer
};
