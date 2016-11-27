var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');
var model = require('../models/followers.js');

var token = require('../../../key.js').token;

var Modal = require('react-modal');
require('react-bootstrap');

// MODALS
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '500px'
  }
};

var GamertagErrorModal = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: this.props.modalIsOpen

    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({modalIsOpen: nextProps.modalIsOpen});
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function(e) {
    this.setState({modalIsOpen: false});
    // localStorage.setItem('loggedIn', this.state.username);
  },
  render: function(){
    return (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >


            <div className="modal-body">
                <div className="body-modal">
                  <h2>Oops, that gamertag wasn't found!</h2>
                  <form onSubmit={this.closeModal} className="form-group">
                    <button type="submit" className="btn btn-primary">Ok</button>
                  </form>
                </div>
            </div>

          </Modal>
    );
  }
});


var UserDeletedErrorModal = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: this.props.deleteModal

    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({modalIsOpen: nextProps.modalIsOpen});
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function(e) {
    this.setState({modalIsOpen: false});
    // localStorage.setItem('loggedIn', this.state.username);
  },
  render: function(){
    return (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >


            <div className="modal-body">
                <div className="body-modal">
                  <h2>Sorry, something went wrong!</h2>
                  <form onSubmit={this.closeModal} className="form-group">
                    <button type="submit" className="btn btn-primary">Ok</button>
                  </form>
                </div>
            </div>

          </Modal>
    );
  }
});


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
  render: function(){
    var self = this;
    var followers = this.state.followers;
    // console.log('map', followers);
    var followerList = followers.map(function(follower){
      // console.log(follower);
      return (
        <div className='col-sm-6' key={follower.cid}>
          <a onClick={function(){self.props.handleFollower(follower.get('gamertag'))}} href={'#followers/' + follower.attributes.xuid + '/videos/'} className='' >
            <h1>{follower.get('gamertag')}</h1>
          </a>
          <button onClick={function(){self.props.handleDelete(follower)}} type='button' className='follower-delete btn btn-danger'>Delete Follower</button>
        </div>
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
    var objectId = JSON.parse(localStorage.getItem('user')).objectId;
    // console.log('state', followerCollection);
    return {
      followerCollection: followerCollection,
      showForm: false,
      objectId: objectId,
      xuid: '',
      modalIsOpen: false,
      deleteModal: false
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
    this.parseSetup();

    var self = this;
    var followerCollection = this.state.followerCollection;

    //set the this.objectId on the followerCollection to the logged in user
    //for use in the where function
    followerCollection.objectId = this.state.objectId;

    followerCollection.fetch().then(function(){
      self.setState({followerCollection: followerCollection});

    });
// console.log(followerCollection);

    // var self = this;
    // var token = localStorage.getItem('token');
    // var collection = this.state.followerCollection;
    // var user = JSON.parse(localStorage.getItem('user')).objectId;
    // console.log(user);
    // this.setState({user : user});


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
    var follower = new model.Follower();
    var objectId= this.state.objectId;

    follower.set('gamertag', gamertag);
    follower.set('user', {
      '__type': 'Pointer',
      'className': '_User',
      'objectId': objectId
    });

    this.xboxSetup();

    // ended up having to put the post to parse followers in the then function because it would run that
    //before the request for the xuid was done
    $.ajax('https://xboxapi.com/v2/xuid/' + gamertag, {
      success: function(response){

        follower.set('xuid', response);
        self.parseSetup();

        followerCollection.create(follower);
        self.setState({followerCollection: self.state.followerCollection});
      },
      error: function(){

        self.setState({modalIsOpen: true});
      }
    });
  },
  handleDelete: function(follower){
    var self = this;

    var followerCollection = this.state.followerCollection;
    var objectId = follower.attributes.objectId;

    var options = {'url':'https:kevinbrowntown.herokuapp.com/classes/Followers/' + objectId, 'method': 'DELETE'};
    $.ajax(options).success(function(){
      //updates the page to show the user has been deleted
      followerCollection.fetch().then(function(){
        self.setState({followerCollection: self.state.followerCollection});
      });
    }).error(function(){
      self.setState({deleteModal: true});
    });
  },
  handleFollower: function(follower){
    localStorage.setItem('follower', follower);
  },
  render: function(){
    return (
      <TemplateComponent>
        <GamertagErrorModal modalIsOpen={this.state.modalIsOpen}/>
        <UserDeletedErrorModal deleteModal={this.state.deleteModal} />
        <h3>My Followers</h3>

        <button className='add-button btn btn-primary' type="button" name="button" onClick={this.handleToggleForm}>Add Follower</button>

        <div className="">
            {this.state.showForm ? <FormComponent addfollower={this.addfollower}/> : null}
        </div>
        <FollowerComponent handleFollower={this.handleFollower} handleDelete={this.handleDelete} followers={this.state.followerCollection}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  FollowersContainer : FollowersContainer
};
