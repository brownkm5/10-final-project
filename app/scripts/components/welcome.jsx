var Backbone = require('backbone');
var React = require('react');
var Slider = require('react-slick');

var TemplateComponent = require('./welcome-template.jsx');

var ReactSlickDemo = React.createClass({
  render: function() {
      const settings = {
        variableHeight: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        pauseOnHover: true
      };
      return (
        <div className='carousel'>

          <Slider {...settings} className=''>
                <div><img src='images/jumbotron.png' /></div>
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
        <div className="col-xs-12 col-sm-4 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h3>View your xbox videos!</h3>
              <p>Create an account, and link it to your gamertag, to view your saved videos on xbox!</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h3>Find your friends.</h3>
              <p>Search for gamertags, and add them to your following list for easier access to your friend's saved videos.</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4">
          <div className="thumbnail">
            <div className="caption">
              <h3>Like videos.</h3>
              <p>Like videos and add them to your liked videos page for easier access to awesome captures.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var WelcomeContainer = React.createClass({
  render: function(){
    return (
    <TemplateComponent>
      <div className="header">
        <h1>SnapShot</h1>
        <h3>An app to view video clips recorded on Xbox.</h3>
      </div>
      <div className='carousel slide'>
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
