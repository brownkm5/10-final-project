var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');

var WelcomeScreen = require('./components/welcome.jsx').WelcomeContainer;
var LoginForm = require('./components/login-form.jsx').LoginContainer;
var SignupForm = require('./components/signup-form.jsx').SignupContainer;
var VideosContainer = require('./components/user-videos.jsx').VideosContainer;
var FollowersContainer = require('./components/followers.jsx').FollowersContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'user-login/': 'login',
    'user-signup/': 'signup',
    'videos/': 'videos',
    'followers/': 'followers'
  },

  // initialize: function(){
  //   setupParse('tiygvl', 'slumber');
  // },

  index: function(){
    ReactDOM.render(
      React.createElement(WelcomeScreen, {router:this}),
      document.getElementById('app')
    );
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginForm, {router:this}),
      document.getElementById('app')
    );
  },
  signup: function(){
    ReactDOM.render(
      React.createElement(SignupForm, {router:this}),
      document.getElementById('app')
    );
  },
  videos: function(){
    ReactDOM.render(
      React.createElement(VideosContainer, {router:this}),
      document.getElementById('app')
    );
  },
  followers: function(){
    ReactDOM.render(
      React.createElement(FollowersContainer, {router:this}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
