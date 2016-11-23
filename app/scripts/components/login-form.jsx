var React = require('react');
var Backbone = require('backbone');


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
    var username = '';
    var password = '';
    return {
      username: username,
      password: password
    }
  },
  handleUsername:function(e){
    var username = e.target.value;
    this.setState({username});
  },
  handlePassword:function(e){
    var password = e.target.value;
    this.setState({password});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.handleSubmit(userData);
  },
  render: function(){
  var self = this;
  return (
    <form className='col-sm-5' onSubmit={self.handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input onChange={self.handleUsername} type="username" className="form-control" id="username" placeholder="Username"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input onChange={self.handlePassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  )
}
});

var LoginContainer = React.createClass({
  componentWillMount: function(){
    var token = localStorage.getItem('token');
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
  handleSubmit: function(userInfo){
  var username = userInfo.username;
  var password = userInfo.password;
  // console.log(userInfo);
  var self = this;
  var url = 'https://kevinbrowntown.herokuapp.com/';
//i need to set the user and gamertag when logged in to use to get the xuid later on for pulling that gamers videos
  $.ajax(url + 'login?username=' + username + '&password=' + password).then(function(response){
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('token', response.sessionToken);

    console.log('res', response);
    if (response.sessionToken) {
      self.props.router.navigate('videos/', {trigger: true});
    };
  });
},
  render: function(){
    return(
      <div className='container'>
        <LoginHeader />
        <LoginForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
});


module.exports = {
  LoginContainer: LoginContainer
}
