var React = require('react');

var TemplateComponent = require('./template.jsx');
var model = require('../models/followers.js').FollowerCollection;

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
  //create collection of followers from the inputs of the form
  //then map over that collection and list them out with links to follower-video page
  //send the gamertag to that page and make a request for that users video with their xuid
  //have to make a request for the xuid and save it to the gamertag model for faster video loading
  //and so there isnt an ajax request just for the xuid everytime the view button is clicked
  //add view and delete buttons to each gamertag
  render: function(){
    return (
    <div>
      <div className='col-sm-6'>
        <a>
          <h1>Image</h1>
          <h2>Gamertag</h2>
        </a>
      </div>
      <div className='col-sm-6'>
        <a>
          <h1>Image</h1>
          <h2>Gamertag</h2>
        </a>
      </div>
      <div className='col-sm-6'>
        <a>
          <h1>Image</h1>
          <h2>Gamertag</h2>
        </a>
      </div>
      <div className='col-sm-6'>
        <a>
          <h1>Image</h1>
          <h2>Gamertag</h2>
        </a>
      </div>
    </div>
    )
  }
});

var FollowersContainer = React.createClass({
  getInitialState: function(){
    return {
      showForm: false
    }
  },
  handleToggleForm: function(e){
    e.preventDefault();

    var showForm = !this.state.showForm;
    this.setState({showForm: showForm});
  },
  addfollower: function(gamertag){
    console.log(gamertag);
  },
  render: function(){
    return (
      <TemplateComponent>
        <button className='add-button btn btn-primary' type="button" name="button" onClick={this.handleToggleForm}>Add Follower</button>
        <div className="">
            {this.state.showForm ? <FormComponent addfollower={this.addfollower}/> : null}
        </div>
        <FollowerComponent />
      </TemplateComponent>
    )
  }
});

module.exports = {
  FollowersContainer : FollowersContainer
};
