var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var LaboratoryScene = exports.LaboratoryScene = function(director){
	localStorage.progress="5";
	var sceneProgress={
		talkWithNewtolowich: false,
		finishMission: false
	};
	var his=new history.History(50,50);
	/* History */
	his.register(29,5,function(){
		if(sceneProgress.talkWihNewtolowich===true)
		{
		
		}else{
		
		}
	});
	his.register(49,6,function(){
		if(sceneProgress.finishMission===true)
		{
		
		}
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
	vadrix.ypos=23;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	
	var weapons=new sprite.Group();
	var effects=new sprite.Group();
	var furniture=new sprite.Group();
	var people=new sprite.Group();
	
	var scientist=new sprite.Sprite();
	scientist.rect=new gamejs.Rect([29*16,5*16],[16,16]);
	scientist.image=characters.get(14);
	people.add(scientist);
	
	var ismawing=new sprite.Sprite();
	ismawing.rect=new gamejs.Rect([40*16,8*16],[16,16]);
	ismawing.image=characters.get(85);
	people.add(ismawing);
	
	var klevin=new sprite.Sprite();
	klevin.rect=new gamejs.Rect([16*16,5*16],[16,16]);
	klevin.image=characters.get(13);
	people.add(klevin);
	
	/* TMX Map */
	var map = new view.Map('./maps/laboratory.tmx');
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