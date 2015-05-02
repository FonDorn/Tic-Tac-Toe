var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Local var
var _tiles 		= []; 
var _turn 		= 'x';
var _size 		= 9;
var _tilesCount = 1;
var _gameOver 	= false;
var _draw		= false;

// Init
function init() {

	_turn 		= 'x';
	_tilesCount = 1;
	_gameOver 	= false;
	_draw		= false;

	// Check if _tile empty
	if(!_.isEmpty(_tiles))
		_tiles = [];

	_.times(_size, function(){
		_tiles.push(
		{
				status: '',
				changed: false
		})
	});
}

// Change Tile
function changeTile(index, val) {

	if(!_tiles[index].changed && !_gameOver) {

		_tiles[index].status 	= val;
		_tiles[index].changed 	= true;

		checkGameOver(index);

		// Increment _tilesCount
		if( !_gameOver && _tilesCount === _size ) {
			_draw 		= true;
			_gameOver 	= true;
		}
		else
			_tilesCount++;

	  	changeTurn();

	}

}

// Change Turn
function changeTurn(index) {
	if(!_gameOver)
		_turn === 'x' ? _turn = 'o': _turn = 'x';
}

// Check if GameOver
function checkGameOver(index) {

	switch(index) {
		case 0:
			if(( _tiles[0].status === _tiles[1].status && _tiles[1].status === _tiles[2].status ) || 
			   ( _tiles[0].status === _tiles[3].status && _tiles[3].status === _tiles[6].status ) ||
			   ( _tiles[0].status === _tiles[4].status && _tiles[4].status === _tiles[8].status ))
				_gameOver = true;
			break;

		case 1:
			if(( _tiles[1].status === _tiles[0].status && _tiles[0].status === _tiles[3].status ) || 
			   ( _tiles[1].status === _tiles[4].status && _tiles[4].status === _tiles[7].status ))
				_gameOver = true;
			break;

		case 2:
			if(( _tiles[2].status === _tiles[4].status && _tiles[4].status === _tiles[6].status ) || 
			   ( _tiles[2].status === _tiles[1].status && _tiles[1].status === _tiles[0].status ) ||
			   ( _tiles[2].status === _tiles[5].status && _tiles[5].status === _tiles[8].status ))
				_gameOver = true;
			break;

		case 3:
			if(( _tiles[3].status === _tiles[0].status && _tiles[0].status === _tiles[6].status ) || 
			   ( _tiles[3].status === _tiles[4].status && _tiles[4].status === _tiles[5].status ))
				_gameOver = true;
			break;

		case 4:
			if(( _tiles[4].status === _tiles[0].status && _tiles[0].status === _tiles[8].status ) || 
			   ( _tiles[4].status === _tiles[2].status && _tiles[2].status === _tiles[6].status ) ||
			   ( _tiles[4].status === _tiles[1].status && _tiles[1].status === _tiles[7].status ) ||
			   ( _tiles[4].status === _tiles[3].status && _tiles[3].status === _tiles[5].status ))
				_gameOver = true;
			break;

		case 5:
			if(( _tiles[5].status === _tiles[2].status && _tiles[2].status === _tiles[8].status ) || 
			   ( _tiles[5].status === _tiles[4].status && _tiles[4].status === _tiles[3].status ))
				_gameOver = true;
			break;

		case 6:
			if(( _tiles[6].status === _tiles[3].status && _tiles[3].status === _tiles[0].status ) || 
			   ( _tiles[6].status === _tiles[7].status && _tiles[7].status === _tiles[8].status ) ||
			   ( _tiles[6].status === _tiles[4].status && _tiles[4].status === _tiles[2].status ))
				_gameOver = true;
			break;

		case 7:
			if(( _tiles[7].status === _tiles[6].status && _tiles[6].status === _tiles[8].status ) || 
			   ( _tiles[7].status === _tiles[4].status && _tiles[4].status === _tiles[1].status ))
				_gameOver = true;
			break;

		case 8:
			if(( _tiles[8].status === _tiles[7].status && _tiles[7].status === _tiles[6].status ) || 
			   ( _tiles[8].status === _tiles[5].status && _tiles[5].status === _tiles[2].status ) ||
			   ( _tiles[8].status === _tiles[4].status && _tiles[4].status === _tiles[0].status ))
				_gameOver = true;
			break;
	}
}

// AppStore
var AppStore = _.extend({}, EventEmitter.prototype, {

	// Get All Tiles
	getTiles: function() {
		return _tiles;
	},

	// Get Turn
	getTurn: function() {
		return _turn;
	},

	// Get GameOver
	getGameOver: function() {
		return _gameOver;
	},

	// Get Draw
	getDraw: function() {
		return _draw;
	},

	// Emit Change event
	emitChange: function() {
		this.emit('change');
	 },
	 // Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	 },
	 // Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	 }
});


// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

  	// Init elements
  	case AppConstants.INIT_ELEMENTS:
  		init();
  		break;

    // Respond to CART_ADD action
    case AppConstants.ADD_ELEMENT:
      changeTile(action.index, action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  AppStore.emitChange();

  return true;

});

module.exports = AppStore;

