var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var TrainingScene = exports.TrainingScene = function(director)
{
	//CONSTRUCTOR
	var knife=new sprite.Sprite();
	var sceneProgress={
		talkWithMojo: false,
		getKnife: false
	};
	var his= new history.History(50,50);
	/* History */
	his.register(3,9,function(){
		new text.TextSurface(["generic.cartel","training.mojo"],characters.get(0),"Vadrix Vandroso").put(director,1500);
	});
	his.register(25,12,function(){
		if(!sceneProgress.talkWithMojo)
		{
			new text.TextSurface(["training.mojoWelcome","training.mojoExplains","training.mojoHelps"],characters.get(152),"Mojo, el terrorista").put(director,4000,function(){
				new text.TextSurface(["generic.suspensive","training.vadrixAccepts"],characters.get(0),"Vadrix Vandroso").put(director,3000,function(){
					new text.TextSurface(["training.mojoTutorial0","training.mojoTutorial1"],characters.get(152),"Mojo, el terrorista").put(director,3000,function(){
						knife.rect=new gamejs.Rect([21*16,13*16],[16,16]);
						knife.image=weaponsImage.get(0);
						sceneProgress.talkWithMojo=true;
						weapons.add(knife);
					});
				});
			});
		}
	});
	his.register(21,13,function(){
		if(sceneProgress.talkWithMojo && !sceneProgress.getKnife)
		{
			new text.TextSurface(["generic.obtained","training.knife"],weaponsImage.get(9),"Objeto").put(director,1500,function(){
				sceneProgress.getKnife=true;
				weapons.remove(knife);
			});
		}
	});
	/* Characters SpriteSheet */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var weaponsImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/ShortWeapons.png",{width: 16, height: 16});
	var vadrix=new sprite.Sprite();
	vadrix.xpos=0;
	vadrix.ypos=10;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	var weapons=new sprite.Group();
	var mojo=new sprite.Sprite();
	mojo.rect=new gamejs.Rect([25*16,12*16],[16,16]);
	mojo.image=characters.get(152);
	
	
	/* TMX Map */
	var map = new view.Map('./maps/training.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	
	this.handleEvent= function(event)
	{
		map.handle(event);
		if (!director.isShowingText() && event.type === gamejs.event.KEY_DOWN || event.type == "TOUCH") {
			//DO THINGS BUT TEXT BLOCKS EVENTS
			var tempX=vadrix.xpos, tempY=vadrix.ypos;
			if (event.key === gamejs.event.K_LEFT || event.key == "LEFT") {
				tempX --;
			} else if (event.key === gamejs.event.K_RIGHT || event.key == "RIGHT") {
				tempX ++;
			} else if (event.key === gamejs.event.K_DOWN || event.key == "DOWN") {
				tempY ++;
			}else if (event.key === gamejs.event.K_UP || event.key == "UP") {
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
		weapons.draw(display);
		mojo.draw(display);
		vadrix.draw(display);
	}
	
	return this;
}