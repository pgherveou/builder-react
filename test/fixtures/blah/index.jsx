/** @jsx React.DOM */

var HelloMessage = React.createClass({
  render: function() { return <div>Hello</div>; }
});


module.exports = React.renderComponentToStaticMarkup(new HelloMessage());
