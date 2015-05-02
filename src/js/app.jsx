window.React 	= require('react');
var TicTacApp 	= require('./components/TicTacApp.jsx');
var AppActions	= require('./actions/AppActions');

AppActions.initElements();

React.render(
	<TicTacApp />,
	document.getElementById('main')
);