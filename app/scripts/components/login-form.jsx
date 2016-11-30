var React = require('react');
var Backbone = require('backbone');

var TemplateComponent = require('./welcome-template.jsx');


var LoginHeader = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Please Log In</h1>
      </div>
    )
  }
});

var LoginForm = React.createClass({
  getInitialState: function(){
    var gamertag = '';
    var password = '';
    return {
      gamertag: gamertag,
      password: password
    }
  },
  handleGamertag:function(e){
    var gamertag = e.target.value;
    this.setState({gamertag});
  },
  handlePassword:function(e){
    var password = e.target.value;
    this.setState({password});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userData = {
      gamertag: this.state.gamertag,
      password: this.state.password
    }

    this.props.handleSubmit(userData);
  },
  render: function(){
  var self = this;
  return (
    <form className='col-sm-8 col-sm-offset-2' onSubmit={self.handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Gamertag</label>
        <input onChange={self.handleGamertag} type="username" className="form-control" id="username" placeholder="Gamertag"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input onChange={self.handlePassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <button type="submit" className="btn btn-success login-button">Submit</button>
    </form>
  )
}
});

var LoginContainer = React.createClass({
  componentWillMount: function(){
    var token = localStorage.getItem('token');
    this.ajaxSetup(token);
  },
  ajaxSetup: function(toen){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
      }
    });
  },
  handleSubmit: function(userInfo){
  var gamertag = userInfo.gamertag;
  var password = userInfo.password;
  // console.log(userInfo);
  var self = this;
  var url = 'https://kevinbrowntown.herokuapp.com/';
//i need to set the user and gamertag when logged in to use to get the xuid later on for pulling that gamers videos
  $.ajax(url + 'login?username=' + gamertag + '&password=' + password).then(function(response){
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.sessionToken);
    console.log(response);

    if (response.sessionToken) {
      self.props.router.navigate('videos/', {trigger: true});
    };
  });
},
  render: function(){
    return(
      <TemplateComponent>
        <div className="login-container">
          <LoginHeader />
          <LoginForm handleSubmit={this.handleSubmit}/>
        </div>
      </TemplateComponent>
    )
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
