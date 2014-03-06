var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var RatasilloScene = exports.RatasilloScene = function(director){
	localStorage.progress="3";
	var sceneProgress={
		runInsect: false,
		getKey: false
	};
	var his=new history.History(50,50);
	/* History */
	his.register(20,14,function(){
		if(sceneProgress.getKey===true)
		{
			var portonPositions=[[20,13],[20,12]];
			var portonPos=0;
			var portonInterval=setInterval(function(){
				vadrix.xpos=portonPositions[portonPos][0];
				vadrix.ypos=portonPositions[portonPos][1];
				portonPos++;
				if(portonPos>1)
					clearInterval(portonInterval);
			},1000);
			new text.TextSurface(["ratasillo.porton"],characters.get(0),"characters.vadrix").put(director,3000,function(){
			
			});
		}
	});
	his.register(23,4,function(){
		new text.TextSurface(["generic.cartel","ratasillo.encisa"],characters.get(0),"characters.vadrix").put(director,3500,function(){
		
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
	vadrix.xpos=20;
	vadrix.ypos=24;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	var insect=new sprite.Sprite();
	insect.xpos=15;
	insect.ypos=19;
	insect.rect=new gamejs.Rect([insect.xpos*16,insect.ypos*16],[16,16]);
	insect.image=insects.get(8);
	insect.pos=0;
	insect.positions=[[20,15],[21,15],[22,15],[23,15],[23,14],[23,13],[23,12],[23,11],[22,11],[21,11],[20,11],[19,11],[18,11],[17,11],[16,11],[16,12],[16,13],[16,14],[16,15],[17,15],[18,15],[19,15]]; //22-16
	insect.update=function(){
		insect.rect=new gamejs.Rect([insect.xpos*16,insect.ypos*16],[16,16]);
	}
	
	var weapons=new sprite.Group();
	var effects=new sprite.Group();
	var furniture=new sprite.Group();
	var people=new sprite.Group();
	
	/* TMX Map */
	var map = new view.Map('./maps/ratasillo.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	
	/* Starter text */
	new text.TextSurface(["ratasillo.start"],characters.get(0),"characters.vadrix").put(director,2500,function(){
		var positionsVadrix=[[20,23],[20,22],[20,21],[20,20],[20,19]];
		var positionsInsect=[[16,19],[17,19],[18,19],[19,19],[20,19],[20,18],[20,17],[20,16],[20,15]];
		var posex=0;
		var id=setInterval(function(){
			if(posex<5)
			{
				vadrix.xpos=positionsVadrix[posex][0];
				vadrix.ypos=positionsVadrix[posex][1];
			}
			insect.xpos=positionsInsect[posex][0];
			insect.ypos=positionsInsect[posex][1];
			posex++;
			if(posex>8)
			{
				clearInterval(id);
			}
		},1000);
		new text.TextSurface(["ratasillo.recuerdo"],characters.get(0),"characters.vadrix").put(director,6000,function(){
			new text.TextSurface(["ratasillo.uops"],characters.get(0),"characters.vadrix").put(director,4000,function(){
				sceneProgress.runInsect=true;
			});
		});
	});
	var insectInterval=setInterval(function(){
		if(sceneProgress.runInsect===true)
		{
			his.unregister(insect.xpos,insect.ypos);
			if(vadrix.xpos < 20)
			{
				insect.pos--;
				if(insect.pos<0)
					insect.pos=21;
			}
			if(vadrix.xpos > 19)
			{
				insect.pos++;
				if(insect.pos>21)
					insect.pos=0;
			}
			insect.xpos=insect.positions[insect.pos][0];
			insect.ypos=insect.positions[insect.pos][1];
			his.register(insect.xpos,insect.ypos,function(data){
				if(data.type=="attack")
				{
					clearInterval(insectInterval);
					new text.TextSurface(["ratasillo.getit"],characters.get(0),"characters.vadrix").put(director,3500,function(){
						sceneProgress.getKey=true;
						his.unregister(insect.xpos,insect.ypos);
					});
				}
			});
		}
	},250);
	
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
		insect.update();
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
		insect.draw(display);
		vadrix.draw(display);
	}
	return this;
}