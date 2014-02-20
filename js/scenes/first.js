var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var FirstScene = exports.FirstScene = function(director)
{
	//CONSTRUCTOR
	var sceneProgress={
		firstTalk: false
	};
	var his= new history.History(50,50);
	/* History */
	his.register(15,2,function(){
		if(sceneProgress.firstTalk===false)
		{
			sceneProgress.firstTalk=true;
			var tx=new text.TextSurface(["first.hiHusband","first.lightGoesDown","first.telenovela"],characters.get(3),"Vandraxa de Azpazeta");
			director.setTextSurface(tx.getSurface());
			director.showText(true);
			setTimeout(function(){
				director.showText(false);
				tx=new text.TextSurface(["first.helpWife"],characters.get(3),"Vandraxa de Azpazeta");
				director.setTextSurface(tx.getSurface());
				director.showText(true);
				setTimeout(function(){
					director.showText(false);
				},5000);
			},10000);
		}else{
			var tx=new text.TextSurface(["first.telenovelaMore","first.telenovelaContinuation"],characters.get(3),"Vandraxa de Azpazeta");
			director.setTextSurface(tx.getSurface());
			director.showText(true);
			setTimeout(function(){
				director.showText(false);
			},5000);
		}
	});
	/* Characters SpriteSheet */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var vadrix=new sprite.Sprite();
	vadrix.xpos=25;
	vadrix.ypos=10;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	var wife=new sprite.Sprite();
	wife.rect=new gamejs.Rect([15*16,2*16],[16,16]);
	wife.image=characters.get(3);
	
	/* TMX Map */
	var map = new view.Map('./maps/house.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	/* Fonts and text */
	/* Show intro */
	var tx=new text.TextSurface(["first.goingToTalk","first.sheHasPlan"],characters.get(0),"Vadrix Vandroso");
	director.setTextSurface(tx.getSurface());
	director.showText(true);
	setTimeout(function(){
		director.showText(false);
	},5000);
	tx=null;
	
	this.handleEvent= function(event)
	{
		map.handle(event);
		if (event.type === gamejs.event.KEY_DOWN) {
			//DO THINGS
			var tempX=vadrix.xpos, tempY=vadrix.ypos;
			if (event.key === gamejs.event.K_LEFT) {
				tempX --;
			} else if (event.key === gamejs.event.K_RIGHT) {
				tempX ++;
			} else if (event.key === gamejs.event.K_DOWN) {
				tempY ++;
			}else if (event.key === gamejs.event.K_UP) {
				tempY --;
			}
			if(coll.moveTest([vadrix.xpos, vadrix.ypos],[tempX, tempY]))
			{
				vadrix.xpos=tempX;
				vadrix.ypos=tempY;
			}
			if(his.has(vadrix.xpos, vadrix.ypos))
			{
				his.execute(vadrix.xpos, vadrix.ypos);
			}
      }
	}
	this.update=function(msDuration)
	{
		vadrix.update();
		map.update(msDuration);
	}
	this.draw=function(display)
	{
		display.clear();
		map.draw(display);
		wife.draw(display);
		vadrix.draw(display);
		/*if(text.show)
			display.blit(text.surface,[150,300]);*/
	}
	
	return this;
}