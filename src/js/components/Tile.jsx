var React 		= require('react');
var AppActions 	= require('../actions/AppActions');
var AppStore	= require('../stores/AppStore');

var Tile = React.createClass({

	changeVal: function(index) {
		var data = AppStore.getTurn();
		AppActions.addElement(index, data);
	},

	render: function() {
		var self 	= this;
		var index 	= this.props.position;

		return (
			<span className="tile" onClick={self.changeVal.bind(self, index)}>
				{this.props.status}
			</span>
		);
	}
});

module.exports = Tile;