var Backbone = require('backbone');
var React = require('react');


var WelcomeHeader = React.createClass({
  render: function(){
    return (
        <div className="wh-wrapper">
          <h1>Welcome!</h1>
          <h2>Please log in or sign up for an account.</h2>
        </div>
    )
  }
});

var WelcomeButtons = React.createClass({
  handleLogin: function(){
    this.props.router.navigate('user-login/', {trigger:true});
  },
  handleSignup: function(){
      this.props.router.navigate('user-signup/', {trigger:true});
  },
  render: function(){
    return (
      <form className='form-group'>
        <button onClick={this.handleLogin} className="btn btn-success" type="button" name="button">Log In</button>
        <button onClick={this.handleSignup} className="btn btn-primary" type="button" name="button">Sign Up</button>
      </form>
    )
  }
});

var WelcomeContainer = React.createClass({
  render: function(){
    return (
    <div className='col-sm-7 col-sm-offset-3'>
      <WelcomeHeader />
      <WelcomeButtons router={this.props.router}/>
    </div>
    )
  }
});

module.exports = {
  WelcomeContainer: WelcomeContainer
}
