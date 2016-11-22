var React = require('react');

var token = require('../../../key.js').token;

var model = require('../models/likes.js');
var TemplateComponent = require('./template.jsx');

var LikesContainer = React.createClass({
  render: function(){
    return (
      <TemplateComponent>
        <h1>working</h1>
      </TemplateComponent>
    )
  }
});

module.exports = {
  LikesContainer: LikesContainer
};
