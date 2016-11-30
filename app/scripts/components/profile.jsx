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

    options.url = "https://kevinbrowntown.herokuapp.com/users/" + this.state.objectId;
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
  },
  render: function(){
    return (
      <TemplateComponent>
        <div className="friends-wrapper">
        <div className="row">
          <h3 className='title'>My Profile</h3>
        </div>
          <div className="row">
            <img className='profile-image' src={this.state.profilePic} alt="Profile Picture" />
          </div>
          <div className="row">
            <form className='update-profile form-group col-sm-4' onSubmit={this.handleUpdate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id='name' className='form-control' onChange={this.handleName} value={this.state.name}></input>
              </div>
              <div className="form-group">
                <label htmlFor="gamertag">Gamertag</label>
                <input id='gamertag' className='form-control' onChange={this.handleGamertag} value={this.state.gamertag}></input>
              </div>
              <button type="submit" className="btn btn-success">Update Profile</button>
            </form>
          </div>
        </div>
      </TemplateComponent>
    )
  }
});

module.exports = {
  ProfileContainer: ProfileContainer
}
