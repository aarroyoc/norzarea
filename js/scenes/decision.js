var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");
var color = require("./color");

var DecisionScene = exports.DecisionScene = function(director){
	localStorage.progress="7";
	var sceneProgress={

	};
	var his=new history.History(50,50);
	/* History */
	/* Here Vadrix appears in a bed an asks for everything, two doors are open, a magic TUMBA is talking about multiverses */
	his.register(23,11,function(){
		new text.TextSurface(["decision.vadrix0","decision.vadrix1"],characters.get(0),"characters.vadrix").put(director,4500,function(){
		
		});
	});
	his.register(23,7,function(){
		new text.TextSurface(["generic.cartel","decision.escucha"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			new text.TextSurface(["decision.robot0","decision.robot1","decision.robot2"],effectsImage.get(19),"characters.robot").put(director,5500,function(){
				new text.TextSurface(["decision.robot3","decision.robot4","decision.robot5"],effectsImage.get(19),"characters.robot").put(director,5500,function(){
					new text.TextSurface(["decision.robot6","decision.robot7"],effectsImage.get(19),"characters.robot").put(director,5500,function(){
					
					});
				});
			});
		});
	});
	his.register(21,4,function(){
		new text.TextSurface(["decision.robot8"],effectsImage.get(19),"characters.robot").put(director,2500,function(){
			//SET A DIFFERENT FINAL
			localStorage.finalEnabled="STEAL";
			director.replaceScene(new color.ColorScene(director));
		});
	});
	his.register(25,4,function(){
		new text.TextSurface(["decision.robot8"],effectsImage.get(19),"characters.robot").put(director,2500,function(){
			//SET A DIFFERENT FINAL
			localStorage.finalEnabled="CHRONUS";
			director.replaceScene(new color.ColorScene(director));
		});
	});
	
	/* SpriteSheets */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
	var players=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Player0.png",{width: 16, height: 16});
	
	var vadrix=new sprite.Sprite();
	vadrix.xpos=21;
	vadrix.ypos=12;
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
	var map = new view.Map('./maps/decision.tmx');
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