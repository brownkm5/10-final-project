var React = require('react');
var Backbone = require('backbone');

var token = require('../../../key.js').token;
var FileModel = require('../models/file.js').File;

var TemplateComponent = require('./welcome-template.jsx');

var SignupHeader = React.createClass({
  render: function(){
    return (
      <h2>Please sign up for an account and link your gamertag.</h2>
    )
  }
});

var PictureComponent = React.createClass({
  getInitialState: function(){
    return {
      profilePic: ''
    }
  },

   render: function(){
     return (
       <form>

       </form>
     )
   }
});

var SignupForm = React.createClass({
  getInitialState: function(){
    var name = '';
    var password = '';
    var gamertag = '';

    return {
      name: 'name',
      password: 'password',
      gamertag: 'gamertag'
    }
  },
  ajaxSetup: function(){
    var userToken = token;
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Auth', userToken);
      }
    });
  },
  handleSignup: function(e){
    e.preventDefault();
    var self = this;

    this.ajaxSetup();

    var picture = $('#inputFile')[0].files[0];
    var file = new FileModel();
    file.set('name', picture.name);
    file.set('data', picture);
    file.save().done(() =>{
      $.ajax('https://xboxapi.com/v2/xuid/' + this.state.gamertag).then(function(response){
        var userData = {
          name: self.state.name,
          username: self.state.gamertag,
          password: self.state.password,
          gamertag: self.state.gamertag,
          xuid: response,
          profilePic: file.get('url')
        }

        self.props.handleSignup(userData);

      });
    });
  },
  handleName: function(e){
    var name = e.target.value;
    this.setState({name: name});
  },
  handlePassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
  },
  handleGamertag: function(e){
    var gamertag = e.target.value;
    this.setState({gamertag: gamertag});
  },
  handlePicture: function(e){
    var attachedFile = e.target.files[0];
    // this.setState({profilePic: attachedFile});
    console.log(attachedFile);
  },
  render: function(){
    return (
      <form id='signup-form' className='signup-form col-sm-8 col-sm-offset-2' onSubmit={this.handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={this.handleName} type="name" className="form-control" id="name" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handlePassword} type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="gamertag">Gamertag</label>
          <input onChange={this.handleGamertag} type="text" className="form-control" id="gamertag" placeholder="Gamertag" />
        </div>
        <div className="form-group">
        <label htmlFor="inputFile">Profile Picture</label>
        <input id='inputFile' type="file" />
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    )
  }
});

//i need to make it so that when a user signs up it makes an ajax request to get their
//gamertag info and saves the xuid and gamertag to a model so that i dont have to do an
//ajax request everytime a user logs in for their xuid
var SignupContainer = React.createClass({
  componentWillMount: function(){

  },
  parseSetup: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
      }
    });
  },
  handleSignup: function(userData){
    this.parseSetup();
    console.log(userData);
  $.post('https://kevinbrowntown.herokuapp.com/users', userData).then(function(response){
    console.log(response);
  });
  },
  render: function(){
    return (
        <TemplateComponent >
          <div className='signup-container'>
            <div className='col-sm-12'>
              <SignupHeader />
            </div>
            <div>
              <SignupForm handleSignup={this.handleSignup}/>
              <PictureComponent />
            </div>
          </div>
        </TemplateComponent>
    )
  }
});

module.exports = {
  SignupContainer: SignupContainer
}
