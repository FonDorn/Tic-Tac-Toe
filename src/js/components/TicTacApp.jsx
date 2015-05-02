var React 		= require('react');
var AppStore 	= require('../stores/AppStore');
var Tile 		= require('./Tile.jsx');
var TicTacMenu	= require('./TicTacMenu.jsx');

// Initial
function getState() {
	return {
		tiles: AppStore.getTiles()
	};
}

var TicTacApp = React.createClass({

	getInitialState: function(){
		return getState();
	},

	// Add change listeners to stores
	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	// Remove change listers from stores
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	// Method to setState based upon Store changes
	_onChange: function() {
		this.setState(getState());
	},

	render: function(){
		return (
			<div>
				<div className="tic-tac-app">
					{this.state.tiles.map(function(tile,position){
						return (
							<Tile key={position} status={tile.status} position={position} />
						)
					})}
				</div>
				
				<TicTacMenu />

			</div>
		);
	}
	
});

module.exports = TicTacApp;