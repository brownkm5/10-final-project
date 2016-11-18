var React = require('react');
var Backbone = require('backbone');


var SignupHeader = React.createClass({
  render: function(){
    return (
      <h2>Please sign up for an account and link your gamertag.</h2>
    )
  }
});

var SignupForm = React.createClass({
  getInitialState: function(){
    var username = '';
    var password = '';
    var gamertag = '';

    return {
      username: 'username',
      password: 'password',
      gamertag: 'gamertag'
    }
  },
  handleSignup: function(e){
    e.preventDefault();
    var userData = {
      username: this.state.username,
      password: this.state.password,
      gamertag: this.state.gamertag
    }
    this.props.handleSignup(userData);
//im thinking of adding the ajax request here so that it gets the xuid and i can add that
//when im creating the user model
    this.setState({
      username: '',
      password: '',
      gamertag: ''
    });
  },
  handleUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
  },
  handlePassword: function(e){
    var password = e.target.value;
    this.setState({password: password});
  },
  handleGamertag: function(e){
    var gamertag = e.target.value;
    this.setState({gamertag: gamertag});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={this.handleUsername} type="username" className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handlePassword} type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="gamertag">Gamertag</label>
          <input onChange={this.handleGamertag} type="text" className="form-control" id="gamertag" placeholder="Gamertag" />
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
  handleSignup: function(userData){
    console.log(userData);
  $.post('https://kevinbrowntown.herokuapp.com/users', userData).then(function(response){
    console.log(response);
  });
  },
  render: function(){
    return (
      <div>
        <div className='col-sm-12'>
          <SignupHeader />
        </div>
        <div className='col-sm-5'>
          <SignupForm handleSignup={this.handleSignup}/>
        </div>
      </div>
    )
  }
});

module.exports = {
  SignupContainer: SignupContainer
}
