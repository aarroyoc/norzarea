var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");

var FirstScene = exports.FirstScene = function(director)
{
//CONSTRUCTOR
	var his= new history.History(50,50);
   
   /* History */
	his.register(15,2,function(){
		console.log("ACHIEVEMENT UNLOCKED");
	});
	/* Characters SpriteSheet */
   var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
   var vadrix=new sprite.Sprite();
   vadrix.xpos=25;
   vadrix.ypos=10;
   vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
   vadrix.image=characters.get(0);
   vadrix.update=function()
   {
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
   }
      /* TMX Map */
   
   var map = new view.Map('./maps/house.tmx');
   var coll=new collision.CollisionMap(map.getMap());
   /* Fonts and text */
   /* Show intro */
   var font=new gamejs.font.Font("20px Poller One");
   var title=font.render("Norzarea")
   var copy=font.render("(C) 2014 Adrián Arroyo Calle");
   var textBox=new gamejs.Surface([450,100]);
   textBox.fill("white");
   textBox.setAlpha(0.5);
   textBox.blit(title);
   textBox.blit(copy,[0,20]);
   director.setTextSurface(textBox);
   director.showText(true);
   setTimeout(function(){
		director.showText(false);
   },5000);
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
		vadrix.draw(display);
		/*if(text.show)
			display.blit(text.surface,[150,300]);*/
	}
	
	return this;
}