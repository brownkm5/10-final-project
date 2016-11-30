var React = require('react');
var Backbone = require('backbone');
require('bootstrap-sass');

var TemplateComponent = React.createClass({
  logout: function(){
    localStorage.clear();
  },
  render: function(){
    return(
      <div className='contain-videos'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav hidden-xs">
              <li className="navbar-header">
                <a id="testing" className="navbar-brand logo"><img className='logo' src="images/snapshot-logos/shapshot-logo-complex-green.svg" alt="" /></a></li>
              <li className="videos/"><a href="#videos/">My Videos</a></li>
              <li className=""><a href="#followers/">Following</a></li>
              <li className=""><a href="#likes/">My Likes</a></li>
              <li className="profile"><a href="#profile/">My Profile</a></li>
            </ul>
            <ul className='nav navbar-nav navbar-right hidden-xs'>
              <li onClick={this.logout} className='sign-out'><a href=''>Sign out</a></li>
            </ul>

            <div className="mobile-nav navbar navbar-default hidden-sm hidden-md hidden-lg">
              <div className="navbar-header mobile-navbar">
                <a id="testing" className="navbar-brand logo"><img className='logo' src="images/snapshot-logos/shapshot-logo-complex-green.svg" alt="" /></a>
                <button className="navbar-toggle"  data-toggle="collapse" data-target="#navbar-button" aria-expanded="false" aria-controls="navbar">
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                 </button>
               </div>
              <div className="navbar-collapse collapse" id="navbar-button">
               <ul className="nav navbar-nav mobile-navbar">
                 <li><a id="mobilefont1-3" className="nav-tabs" href="#videos/">My Videos</a></li>
                 <li><a id="mobilefont1-3" className="nav-tabs" href="#followers/">Following</a></li>
                 <li><a id="mobilefont1-3" className="nav-tabs" href="#likes/">My Likes</a></li>
                 <li><a id="mobilefont" className="nav-tabs" href="#profile/">My Profile</a></li>
                 <li onClick={this.logout} className='sign-out'><a href=''>Sign out</a></li>
               </ul>
             </div>
           </div>
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
