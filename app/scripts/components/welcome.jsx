var Backbone = require('backbone');
var React = require('react');
var Slider = require('react-slick');

var TemplateComponent = require('./welcome-template.jsx');

var ReactSlickDemo = React.createClass({
  render: function() {
      const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        arrows: true,
        pauseOnHover: true,
      };
      return (
        <div className='carousel'>

          <Slider {...settings}>
              <div><img src='https://i3.wallpaperscraft.com/image/destiny_rise_of_iron_character_wolves_109702_2560x1080.jpg' /></div>
                <div><img src='https://charlieintel.com/wp-content/uploads/2016/05/image-13.jpeg' /></div>
                <div><img src='http://compass.xboxlive.com/assets/1c/c9/1cc92786-77f4-4587-9de0-23fdc0082d16.jpg?n=Forza6_E3_PressKit_01.jpg' /></div>
                <div><img src='https://images7.alphacoders.com/423/thumb-1920-423190.jpg' /></div>
                <div><img src='https://cdn0.vox-cdn.com/thumbor/MZpSIvZFx0oZGh9y1sdafVcigPU=/cdn0.vox-cdn.com/uploads/chorus_asset/file/3791408/Fallout4_Concept_Blast_1434323459.0.jpg' /></div>
                <div><img src='http://gameranx.com/wp-content/uploads/2016/05/Battlefield-1-1080P-Wallpaper.jpg' /></div>
                <div><img src='http://www.hdwallpapers.in/walls/titanfall_2_2016_game_4k-wide.jpg' /></div>
            </Slider>

        </div>
      );
  }
});

var Thumbnails = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            
            <div className="caption">
              <h3>Thumbnail label</h3>
              <p>...</p>
              <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


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


// var WelcomeButtons = React.createClass({
//   handleLogin: function(){
//     this.props.router.navigate('user-login/', {trigger:true});
//   },
//   handleSignup: function(){
//       this.props.router.navigate('user-signup/', {trigger:true});
//   },
//   render: function(){
//     return (
//       <form className='form-group'>
//         <button onClick={this.handleLogin} className="btn btn-success" type="button" name="button">Log In</button>
//         <button onClick={this.handleSignup} className="btn btn-primary" type="button" name="button">Sign Up</button>
//       </form>
//     )
//   }
          // <WelcomeButtons router={this.props.router}/>
// });

var WelcomeContainer = React.createClass({
  render: function(){
    return (
    <TemplateComponent>
      <div className='jumbotron'>
        <div className="welcome-page">
          <WelcomeHeader />
        </div>
      </div>
      <div className='carousel'>
        <ReactSlickDemo />
      </div>
      <div className='thumbnails'>
        <Thumbnails />
      </div>
    </TemplateComponent>
    )
  }
});

module.exports = {
  WelcomeContainer: WelcomeContainer
}
