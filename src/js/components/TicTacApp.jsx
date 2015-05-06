var React 		= require('react');
var AppStore 	= require('../stores/AppStore');
var Tile 		= require('./Tile.jsx');
var TicTacMenu	= require('./TicTacMenu.jsx');

// Initial
function getState() {
	return {
		tiles: AppStore.getTiles(),
		gameOver: AppStore.getGameOver(),
		draw: AppStore.getDraw(),
		coordinates: AppStore.getCoordinates()
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

		var c = document.getElementById("canvas");

		if(this.state.gameOver && !this.state.draw) {
			c.style.display="block";
			var ctx = c.getContext("2d");
			ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
			ctx.beginPath();
			ctx.moveTo(this.state.coordinates.moveTo.x,this.state.coordinates.moveTo.y);
			ctx.lineTo(this.state.coordinates.lineTo.x,this.state.coordinates.lineTo.y);
			ctx.strokeStyle = "#ff0000";
			ctx.lineWidth = 2;
			ctx.lineCap = "round"; 
			ctx.stroke();
		}
		else if(c) {
				c.style.display="none";
		} 


		return (
			<div>
				<canvas id="canvas">
				</canvas>
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