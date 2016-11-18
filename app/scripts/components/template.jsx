var React = require('react');
var Backbone = require('backbone');

var TemplateComponent = React.createClass({
  render: function(){
    return(
      <div className='contain'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="videos/"><a href="#videos/">My Videos</a></li>
              <li className=""><a href="#followers/">My Followers</a></li>
              <li className=""><a href="#videos/">My Friends</a></li>
              <li className="profile"><a href="#videos/">My Profile</a></li>
            </ul>
          </div>
        </nav>


      <div className="container">
        <div className='wrap'>
          {this.props.children}
        </div>

      </div>


      </div>
    )
  }
});

module.exports = TemplateComponent;
