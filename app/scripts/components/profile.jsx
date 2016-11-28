var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');

var ProfileContainer = React.createClass({
  getInitialState: function(){
    var objectId = JSON.parse(localStorage.getItem('user')).objectId;
    var token = localStorage.getItem('token');
    return {
      objectId: objectId,
      user: '',
      token: token
    }
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
    var objectId = this.state.objectId;

    $.ajax('https://kevinbrowntown.herokuapp.com/users/' + objectId).then(function(response){
      self.setState({username: response.username, gamertag: response.gamertag, profilePic: response.profilePic});
    });

  },
  handleUsername: function(e){
    var input = e.target.value;
    this.setState({username: input});
  },
  handleGamertag: function(e){
    var input = e.target.value;
    this.setState({gamertag: input});
  },
  handleUpdate: function(){
    var profileUpdate = {
      "username": this.state.username,
      "gamertag": this.state.gamertag
    }

    var dataString = "username=" + this.state.username + "&gamertag=" + this.state.gamertag;

    $.ajax({
      url:"https://kevinbrowntown.herokuapp.com/users/" + this.state.objectId,
      type: "PUT",
      dataType: "json",
      data: dataString,
      "headers": {
      "Content-Type": "application/json",
      "X-Parse-REST-API-Key": "kylesb",
      "X-Parse-Application-Id": "kmbparse",
      "X-Parse-Session-Token": this.state.token
    }})
    .then(function(response){
      console.log(response);
    })
  },
  render: function(){
    return (
      <TemplateComponent>
        <img src={this.state.profilePic} alt="Profile Picture" />
        <form onSubmit={this.handleUpdate}>
          <input onChange={this.handleUsername} value={this.state.username}></input>
          <input onChange={this.handleGamertag} value={this.state.gamertag}></input>
          <button type="submit" className="btn btn-success">Update Profile</button>
        </form>
      </TemplateComponent>
    )
  }
});

module.exports = {
  ProfileContainer: ProfileContainer
}
