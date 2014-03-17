var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");
var explosion = require("./explosion");

var LaboratoryScene = exports.LaboratoryScene = function(director){
	localStorage.progress="5";
	var sceneProgress={
		firstQuestion: false,
		secondQuestion: false,
		thirdQuestion: false,
		talkWithKlevin: false,
		talkWithNewtolowich: false,
		finishMission: false
	};
	var books=new Array;
	var his=new history.History(50,50);
	/* History */
	
	/* Newtolovich */
	his.register(29,5,function(){
		if(sceneProgress.talkWihNewtolowich===true)
		{
			
		}else if(sceneProgress.firstQuestion===false){
			new text.TextSurface(["laboratory.raro","laboratory.newtolovich0","laboratory.newtolovich1"],characters.get(14),"characters.newtolovich").put(director,5500,function(){
				new text.TextSurface(["laboratory.newtolovich2","laboratory.newtolovich3"],characters.get(14),"characters.newtolovich").put(director,4500,function(){
					new text.TextSurface(["laboratory.vadrixNewtolovich0"],characters.get(0),"characters.vadrix").put(director,2500,function(){
						new text.TextSurface(["laboratory.newtolovich4","laboratory.newtolovich5","laboratory.newtolovich6"],characters.get(14),"characters.newtolovich").put(director,5500,function(){
							new text.TextSurface(["laboratory.newtolovich7","laboratory.newtolovich8","laboratory.newtolovich9"],characters.get(14),"characters.newtolovich").put(director,5500,function(){
								new text.TextSurface(["laboratory.vadrixNewtolovich1"],characters.get(0),"characters.vadrix").put(director,2500,function(){
									new text.TextSurface(["laboratory.question0a","laboratory.question0b","laboratory.question0c"],characters.get(14),"characters.newtolovich").put(director,7500,function(){
										sceneProgress.firstQuestion=true;
									});
								});
							});
						});
					});
				});
			});
		}
	});
	/* Window 0 */
	his.register(3,3,function(data){
		if(data.type=="attack" && sceneProgress.firstQuestion===true && sceneProgress.secondQuestion===false)
		{
			new text.TextSurface(["laboratory.question0d"],characters.get(14),"characters.newtolovich").put(director,3500,function(){
				new text.TextSurface(["laboratory.question1a","laboratory.question1b","laboratory.question1c"],characters.get(14),"characters.newtolovich").put(director,7500,function(){
					new text.TextSurface(["laboratory.question1d","laboratory.question1e","laboratory.question1f"],characters.get(14),"characters.newtolovich").put(director,7500,function(){
						sceneProgress.secondQuestion=true;
					});
				});
			});
		}else if(data.type=="attack" && sceneProgress.thirdQuestion===true && sceneProgress.talkWithNewtolowich===false)
		{
			new text.TextSurface(["laboratory.okFinal"],characters.get(14),"characters.newtolovich").put(director,2500,function(){
				new text.TextSurface(["generic.obtained","laboratory.grafeno"],weaponsImage.get(5),"characters.object").put(director,4500,function(){
					localStorage.weapon="5";
					sceneProgress.finishMission=true;
				});
			});
		}
	});
	/* Window 2 */
	his.register(6,3,function(data){
		if(data.type=="attack" && sceneProgress.secondQuestion===true && sceneProgress.thirdQuestion===false)
		{
			new text.TextSurface(["laboratory.ok"],characters.get(14),"characters.newtolovich").put(director,2500,function(){
				new text.TextSurface(["laboratory.question2a","laboratory.question2b","laboratory.question2c"],characters.get(14),"characters.newtolovich").put(director,7500,function(){
					sceneProgress.thirdQuestion=true;
				});
			});
		}
	});
	/* Ismawing */
	his.register(40,8,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["laboratory.pegando"],characters.get(14),"characters.newtolovich").put(director,2500,function(){
			
			});
		}else if(localStorage.potion!="0"){
			new text.TextSurface(["laboratory.ismawing0","laboratory.ismawing1"],characters.get(85),"characters.ismawing").put(director,4500,function(){
				new text.TextSurface(["laboratory.ismawing2","laboratory.ismawing3"],characters.get(85),"characters.ismawing").put(director,4500,function(){
					new text.TextSurface(["laboratory.vadrixIsmawing0","laboratory.vadrixIsmawing1","laboratory.vadrixIsmawing2"],characters.get(0),"characters.vadrix").put(director,5500,function(){
						new text.TextSurface(["laboratory.ismawing4","laboratory.ismawing5","laboratory.ismawing6"],characters.get(85),"characters.ismawing").put(director,5500,function(){
							new text.TextSurface(["generic.obtained","laboratory.elixir"],potionImages.get(0),"characters.object").put(director,4500,function(){
								localStorage.potion="0";
							});
						});
					})
				});
			});
		}
	});
	/* Klevin */
	function getKlevinBook(bookNumber)
	{
		//unregister
		his.unregister(11,7);
		his.unregister(12,7);
		his.unregister(13,7);
		//delete blocks
		furniture.remove(books[0]);
		furniture.remove(books[1]);
		furniture.remove(books[2]);
		//add selected book
		localStorage.book=bookNumber+"";
		
	}
	his.register(16,5,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["laboratory.pegando"],characters.get(14),"characters.newtolovich").put(director,2500,function(){
			
			});
		}else if(localStorage.book=="17" && sceneProgress.talkWithKlevin===false)
		{
			new text.TextSurface(["laboratory.klevin0","laboratory.klevin1","laboratory.klevin2"],characters.get(13),"characters.klevin").put(director,5500,function(){
				/* Book 0 */
				books[0]=new sprite.Sprite();
				books[0].rect=new gamejs.Rect([11*16,7*16],[16,16]);
				books[0].image=bookImages.get(0);
				his.register(11,7,function(){
					getKlevinBook(0);
					new text.TextSurface(["generic.obtained","laboratory.book1"],bookImages.get(0),"characters.object").put(director,3500,function(){
					
					});
				});
				furniture.add(books[0]);
				/* Book 1 */
				books[1]=new sprite.Sprite();
				books[1].rect=new gamejs.Rect([12*16,7*16],[16,16]);
				books[1].image=bookImages.get(1);
				his.register(12,7,function(){
					getKlevinBook(1);
					new text.TextSurface(["generic.obtained","laboratory.book2"],bookImages.get(1),"characters.object").put(director,3500,function(){
					
					});
				});
				furniture.add(books[1]);
				/* Books 2 */
				books[2]=new sprite.Sprite();
				books[2].rect=new gamejs.Rect([13*16,7*16],[16,16]);
				books[2].image=bookImages.get(2);
				his.register(13,7,function(){
					getKlevinBook(2);
					new text.TextSurface(["generic.obtained","laboratory.book2"],bookImages.get(2),"characters.object").put(director,3500,function(){
					
					});
				});
				furniture.add(books[2]);
				
				sceneProgress.talkWithKlevin=true;
			});
		}
	});
	/* Exit */
	his.register(49,6,function(){
		if(sceneProgress.finishMission===true)
		{
			director.replaceScene(new explosion.ExplosionScene(director));
		}else{
			new text.TextSurface(["laboratory.maybe"],characters.get(0),"characters.vadrix").put(director, 2500,function(){
			
			});
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
	var weaponsImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/ShortWeapons.png",{width: 16, height: 16});
	var potionImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/Potions.png",{width: 16, height: 16});
	var bookImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/Books.png",{width: 16, height: 16});
	
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