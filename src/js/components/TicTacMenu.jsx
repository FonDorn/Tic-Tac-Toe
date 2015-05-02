var React 		= require('react');
var AppActions 	= require('../actions/AppActions');
var AppStore	= require('../stores/AppStore');

function getState() {
	return {
		turn: 		AppStore.getTurn(),
		gameOver: 	AppStore.getGameOver(),
		draw: 		AppStore.getDraw()
	};
}


var TicTacMenu = React.createClass({

	removeElement: function() {
		AppActions.initElements();
	},

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

	render: function() {

		var self = this;

		var message = "";
		if(this.state.draw)
			message = "Draw Game";
		else if(this.state.gameOver)
			message = "Game over! Win " + this.state.turn;
		else
			message = this.state.turn + " turn";

		return (
			<div className="tic-tac-menu">
				<p>{message}</p>
				<button type="button" className="reset-items" onClick={self.removeElement}>Reset</button>
			</div>
		);
	}
});

module.exports = TicTacMenu;