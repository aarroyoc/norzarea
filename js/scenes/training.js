var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var TrainingScene = exports.TrainingScene = function(director)
{
	localStorage.progress="1";
	//CONSTRUCTOR
	var knife=new sprite.Sprite();
	var gold=new sprite.Sprite();
	var sceneProgress={
		talkWithMojo: false,
		getKnife: false,
		latestMovement: gamejs.event.K_LEFT
	};
	var his= new history.History(50,50);
	/* History */
	his.register(3,9,function(){
		new text.TextSurface(["generic.cartel","training.mojo"],characters.get(0),"characters.vadrix").put(director,1500);
	});
	his.register(25,12,function(){
		if(!sceneProgress.talkWithMojo)
		{
			new text.TextSurface(["training.mojoWelcome","training.mojoExplains","training.mojoHelps"],characters.get(152),"characters.mojo").put(director,4000,function(){
				new text.TextSurface(["generic.suspensive","training.vadrixAccepts"],characters.get(0),"characters.vadrix").put(director,3000,function(){
					new text.TextSurface(["training.mojoTutorial0","training.mojoTutorial1"],characters.get(152),"characters.mojo").put(director,3000,function(){
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
			new text.TextSurface(["generic.obtained","training.knife"],weaponsImage.get(0),"characters.object").put(director,1500,function(){
				sceneProgress.getKnife=true;
				localStorage.weapon="0";
				weapons.remove(knife);
				setTimeout(function(){
					new text.TextSurface(["training.mojoTutorial2"],characters.get(152),"characters.mojo").put(director,2000,function(){
						new text.TextSurface(["training.vadrixComments"],characters.get(0),"characters.vadrix").put(director,2000,function(){
							new text.TextSurface(["training.mojoTutorial3","training.mojoTutorial4"],characters.get(152),"characters.mojo").put(director,3000,function(){
								//ENABLE WARDROBES AND SET HISTORY FOR THAT
								var wardrobe=new sprite.Sprite();
								wardrobe.rect=new gamejs.Rect([23*16,15*16],[16,16]);
								wardrobe.image=furnitureImage.get(8);
								furniture.add(wardrobe);
								his.register(23,15,function(data){
									if(data.type=="attack")
									{
										furniture.remove(wardrobe);
										his.unregister(23,15);
										new text.TextSurface(["training.mojoTutorial5"],characters.get(152),"characters.mojo").put(director,2000,function(){
										
										});
									}
								});
							});
						});
					});
				},5000);
			});
		}
	});
	his.register(33,4,function(){
		new text.TextSurface(["generic.obtained","training.gold"],moneyImage.get(5),"characters.object").put(director,2000,function(){
			var money=parseInt(localStorage.money);
			money+=100;
			localStorage.money=money+"";
			furniture.remove(gold);
		});
	
	});
	/* Characters SpriteSheet */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var weaponsImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/ShortWeapons.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
	var furnitureImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Furniture0.png",{width: 16, height: 16});
	var moneyImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/Money.png",{width: 16, height: 16});
	var vadrix=new sprite.Sprite();
	vadrix.xpos=0;
	vadrix.ypos=10;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	var weapons=new sprite.Group();
	var effects=new sprite.Group();
	var furniture=new sprite.Group();
	var mojo=new sprite.Sprite();
	mojo.rect=new gamejs.Rect([25*16,12*16],[16,16]);
	mojo.image=characters.get(152);
	gold.rect=new gamejs.Rect([33*16,4*16],[16,16]);
	gold.image=moneyImage.get(5);
	furniture.add(gold);
	
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
		mojo.draw(display);
		vadrix.draw(display);
	}
	
	return this;
}