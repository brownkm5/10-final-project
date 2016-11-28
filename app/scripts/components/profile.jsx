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
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
      }
    });
  },
  componentWillMount: function(){

    this.parseSetup(this.state.token);

    var self = this;
    var objectId = this.state.objectId;

    $.ajax('https://kevinbrowntown.herokuapp.com/users/' + objectId).then(function(response){
      self.setState({name: response.name, gamertag: response.gamertag, profilePic: response.profilePic});
    });

  },
  handleName: function(e){
    var input = e.target.value;
    this.setState({name: input});
  },
  handleGamertag: function(e){
    var input = e.target.value;
    this.setState({gamertag: input});
  },
  handleUpdate: function(){
    var profileUpdate = {
      name: this.state.name,
      gamertag: this.state.gamertag
    }
    var token = this.state.token;

    var options = {};

    options.url = "https://kevinbrowntown.herokuapp.com/users/xHIIC0Wvtd";
    options.data = {
      name: this.state.name,
      gamertag: this.state.gamertag
    }

    options.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Parse-Application-Id": "kmbparse",
      "X-Parse-REST-API-Key": "kylesb",
      "X-Parse-Session-Token": token
    }

    options.method = "PUT";

    $.ajax(options).then(function(response) {
      console.log(response);
    })
    // $.ajax({
    //   url:"https://kevinbrowntown.herokuapp.com/users/" + this.state.objectId,
    //   type: "PUT",
    //   dataType: "json",
    //   data: dataString,
    //   "headers": {
    //   "Content-Type": "application/json",
    //   "X-Parse-REST-API-Key": "kylesb",
    //   "X-Parse-Application-Id": "kmbparse",
    //   "X-Parse-Session-Token": this.state.token
    // }})
    // .then(function(response){
    //   console.log(response);
    // })
  },
  render: function(){
    return (
      <TemplateComponent>
        <img src={this.state.profilePic} alt="Profile Picture" />
        <form onSubmit={this.handleUpdate}>
          <input onChange={this.handleName} value={this.state.name}></input>
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
