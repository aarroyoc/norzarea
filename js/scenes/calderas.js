var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");
var laboratory = require("./laboratory");

var CalderasScene = exports.CalderasScene = function(director){
	localStorage.progress="4";
	var sceneProgress={
	};
	var his=new history.History(50,50);
	/* History */
	his.register(2,4,function(data){
		new text.TextSurface(["generic.cartel","calderas.cartel"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			new text.TextSurface(["calderas.caotico"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			
			});
		});
	});
	his.register(22,16,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["calderas.puerta"],characters.get(0),"characters.vadrix").put(director,2500,function(){
				vadrix.xpos=22;
				vadrix.ypos=12;
			});
		}else{
			new text.TextSurface(["calderas.caldera"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			
			});
		}
	});
	his.register(25,11,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["calderas.puerta"],characters.get(0),"characters.vadrix").put(director,2500,function(){
				vadrix.xpos=25;
				vadrix.ypos=14;
			});
		}else{
			new text.TextSurface(["calderas.caldera"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			
			});
		}
	});
	his.register(27,19,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["calderas.puerta"],characters.get(0),"characters.vadrix").put(director,2500,function(){
				vadrix.xpos=27;
				vadrix.ypos=23;
			});
		}else{
			new text.TextSurface(["calderas.caldera"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			
			});
		}
	});
	his.register(49,23,function(){
		new text.TextSurface(["calderas.salida"],characters.get(0),"characters.vadrix").put(director,3500,function(){
			director.replaceScene(new laboratory.LaboratoryScene(director));
		});
	});
	/* SpriteSheets */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
	var moneyImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/Money.png",{width: 16, height: 16});
	var players=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Player0.png",{width: 16, height: 16});
	var furnitureImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Furniture0.png",{width: 16, height: 16});
	var keys=new spritesheet.SpriteSheet("./img/DawnHack/Items/Keys.png",{width: 16, height: 16});
	var insects=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Insects0.png",{width: 16, height: 16});
	
	var vadrix=new sprite.Sprite();
	vadrix.xpos=0;
	vadrix.ypos=5;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	
	var weapons=new sprite.Group();
	var effects=new sprite.Group();
	var furniture=new sprite.Group();
	var people=new sprite.Group();
	
	/* TMX Map */
	var map = new view.Map('./maps/calderas.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	
	this.handleEvent= function(event)
	{
		map.handle(event);
		if (!director.isShowingText() && event.type === gamejs.event.KEY_DOWN || event.type == "TOUCH") {
			var tempX=vadrix.xpos, tempY=vadrix.ypos;
			if (event.key === gamejs.event.K_LEFT || event.key == "LEFT") {
				tempX --;
				sceneProgress.lastMovement=gamejs.event.K_LEFT;
			} else if (event.key === gamejs.event.K_RIGHT || event.key == "RIGHT") {
				tempX ++;
				sceneProgress.lastMovement=gamejs.event.K_RIGHT;
			} else if (event.key === gamejs.event.K_DOWN || event.key == "DOWN") {
				tempY ++;
				sceneProgress.lastMovement=gamejs.event.K_DOWN;
			}else if (event.key === gamejs.event.K_UP || event.key == "UP") {
				tempY --;
				sceneProgress.lastMovement=gamejs.event.K_UP;
			}
			if(event.key === gamejs.event.K_SPACE || event.key == "SPACE")
			{
				var weaponEffect=new sprite.Sprite();
				var newX = vadrix.xpos, newY = vadrix.ypos;
				if(sceneProgress.lastMovement===gamejs.event.K_LEFT)
					newX-=1;
				else if(sceneProgress.lastMovement===gamejs.event.K_RIGHT)
					newX+=1;
				else if(sceneProgress.lastMovement===gamejs.event.K_DOWN)
					newY+=1
				else if(sceneProgress.lastMovement===gamejs.event.K_UP)
					newY-=1;
				weaponEffect.rect=new gamejs.Rect([newX*16,newY*16],[16,16]);	
				weaponEffect.image=effectsImage.get(18);
				effects.add(weaponEffect);
				if(his.has(newX,newY))
				{
					his.execute(newX,newY,{type: "attack"});
				}
				setTimeout(function(){
					effects.remove(weaponEffect);
				},250);
			}
			if(coll.moveTest([vadrix.xpos, vadrix.ypos],[tempX, tempY]))
			{
				vadrix.xpos=tempX;
				vadrix.ypos=tempY;
			}
			if(his.has(vadrix.xpos, vadrix.ypos))
			{
				his.execute(vadrix.xpos, vadrix.ypos, {type: "talk"});
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
		furniture.draw(display);
		effects.draw(display);
		people.draw(display);
		vadrix.draw(display);
	}
	return this;
}