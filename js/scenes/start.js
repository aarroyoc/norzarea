var gamejs = require('gamejs');
var firstScene = require("./first");
var training = require("./training");
var city = require("./city");
var ratasillo = require("./ratasillo");
var calderas = require("./calderas");
var laboratory = require("./laboratory");

var StartScene = exports.StartScene = function(director)
{
	this.handleEvent=function(event)
	{
		if(event.type === gamejs.event.MOUSE_UP || event.type === gamejs.event.KEY_DOWN || event.type == "TOUCH")
		{
			switch(parseInt(localStorage.progress))
			{
				case 0: director.replaceScene(new firstScene.FirstScene(director));break;
				case 1: director.replaceScene(new training.TrainingScene(director));break;
				case 2: director.replaceScene(new city.CityScene(director));break;
				case 3: director.replaceScene(new ratasillo.RatasilloScene(director));break;
				case 4: director.replaceScene(new calderas.CalderasScene(director));break;
				case 5: director.replaceScene(new laboratory.LaboratoryScene(director));break;
				default: director.replaceScene(new firstScene.FirstScene(director));
			}
			
		}
	}
	this.draw=function(display)
	{
		display.blit(startPicture);
	}
	var startPicture=gamejs.image.load("./img/start.png");
	return this;
}