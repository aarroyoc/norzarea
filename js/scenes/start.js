var gamejs = require('gamejs');
var firstScene = require("./first");

var StartScene = exports.StartScene = function(director)
{
	this.handleEvent=function(event)
	{
		if(event.type === gamejs.event.MOUSE_UP)
		{
			director.replaceScene(new firstScene.FirstScene(director));
		}
	}
	this.draw=function(display)
	{
		display.blit(startPicture);
	}
	var startPicture=gamejs.image.load("./img/start.png");
	return this;
}