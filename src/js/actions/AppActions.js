var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants  = require('../constants/AppConstants');


var AppActions = {

	// Init element
	initElements: function() {
		AppDispatcher.handleAction({
			actionType: AppConstants.INIT_ELEMENTS
		})
	},

	// Add element
	addElement: function(index, data) {
		AppDispatcher.handleAction({
			actionType: AppConstants.ADD_ELEMENT,
			index: 	index,
			data: 	data
		})
	}
};

module.exports = AppActions;