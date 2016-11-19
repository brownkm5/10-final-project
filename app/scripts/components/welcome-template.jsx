var React = require('react');

var TemplateComponent = React.createClass({
  render: function(){
    return(
      <div className='contain'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
              <li><a id="signup" href="#user-signup/">Sign Up</a></li>
              <li><a id="login" href="#user-login/">Log In</a></li>
            </ul>
          </div>
        </nav>


        <div className="container">
          <div className='wrap'>
            {this.props.children}
          </div>
        </div>

        <div className='footer'>

        </div>
      </div>


    )
  }
});

module.exports = TemplateComponent;
