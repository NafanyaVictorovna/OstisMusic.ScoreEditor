function Ctrl() {

	var editor = require('scripts/controller/EditorCtrl');
	var View = require('scripts/controller/TrackViewCtrl');
	//нужно добавить условие выбора инструмента, и от этого определять рисунок выбираемого инструмента.
	$( "#button" ).load( "views/keyboard.html" );

	var Ctrl = document.getElementById("cont").src = "'views/keyboard.html'";

};