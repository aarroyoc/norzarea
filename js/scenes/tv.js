var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var TVScene = exports.TVScene = function(director){
	var tv=new gamejs.image.load("./img/tv.png");
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var players=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Player0.png",{width: 16, height: 16});
	new text.TextSurface(["tv.tv1","tv.tv2","tv.tv3"],characters.get(0),"characters.vadrix").put(director,5500,function(){
		new text.TextSurface(["tv.tv4"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			new text.TextSurface(["tv.tv5"],players.get(9),"characters.dragon").put(director,3500,function(){
				new text.TextSurface(["tv.tv6","tv.tv8"],characters.get(0),"characters.vadrix").put(director,5500,function(){

				});
			});
		});
	});


	this.update=function(msDuration)
	{
		
	}
	this.draw=function(display)
	{
		display.clear();
		display.blit(tv);
	}
	return this;
}