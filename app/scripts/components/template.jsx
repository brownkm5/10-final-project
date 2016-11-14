var React = require('react');
var Backbone = require('backbone');

var TemplateComponent = React.createClass({
  render: function(){
    return(
      <div className='contain'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li className="navbar-brand"><a href="#videos/">My Videos</a></li>
            </ul>
          </div>
        </nav>


      <div className="container">
        {this.props.children}
      </div>


      </div>
    )
  }
});

module.exports = TemplateComponent;
