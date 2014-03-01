var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");

var CityScene = exports.CityScene = function(director)
{
	localStorage.progress="2";
	var sceneProgress={
		talkWithGenie: false,
		lastMovement: gamejs.event.K_LEFT
	};
	var his=new history.History(50,50);
	/* History */
	his.register(14,10,function(){
		new text.TextSurface(["generic.cartel","city.king","city.kingTimetables"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			new text.TextSurface(["generic.void"],characters.get(0),"characters.vadrix").put(director,2000);
		});
	});
	his.register(23,10,function(){
		new text.TextSurface(["generic.cartel","city.biblio"],characters.get(0),"characters.vadrix").put(director,2000,function(){
		
		});
	});
	his.register(29,10,function(){
		new text.TextSurface(["generic.cartel","city.taberna"],characters.get(0),"characters.vadrix").put(director,2000,function(){
		
		});
	});
	his.register(37,9,function(){
		new text.TextSurface(["generic.cartel","city.monasterio"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			new text.TextSurface(["city.circulos"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			
			});
		});
	});
	his.register(18,4,function(){
		new text.TextSurface(["generic.cartel","city.electric"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			
		});
	});
	his.register(20,3,function(){
		new text.TextSurface(["generic.closed"],characters.get(0),"characters.vadrix").put(director,2500,function(){
		
		});
	});
	his.register(40,4,function(){
		new text.TextSurface(["city.secretDoor"],characters.get(0),"characters.vadrix").put(director,2500,function(){
		
		});
	});
	his.register(29,2,function(){
		if(!sceneProgress.talkWithGenie)
		{
			new text.TextSurface(["city.genieAppears"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
				new text.TextSurface(["city.vadrixAskGenie0"],characters.get(0),"characters.vadrix").put(director,3000,function(){
					new text.TextSurface(["city.genieResponse0"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
						new text.TextSurface(["city.vadrixAskGenie"],characters.get(0),"characters.vadrix").put(director,3000,function(){
							new text.TextSurface(["city.genieResponse"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
								new text.TextSurface(["city.vadrixAskGenie2"],characters.get(0),"characters.vadrix").put(director,3000,function(){
									new text.TextSurface(["city.genieResponse2"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
										new text.TextSurface(["city.vadrixAskGenie3"],characters.get(0),"characters.vadrix").put(director,3000,function(){
											new text.TextSurface(["city.genieResponse3","city.genieResponse3b","city.genieResponse3c"],characters.get(17),"characters.amatulfo").put(director,6000,function(){
												new text.TextSurface(["city.vadrixAskGenie4"],characters.get(0),"characters.vadrix").put(director,3000,function(){
													new text.TextSurface(["city.genieResponse4","city.genieResponse4b"],characters.get(17),"characters.amatulfo").put(director,4000,function(){
														sceneProgress.talkWithGenie=true;
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		}else{
			new text.TextSurface(["city.genieWelcomeBack","city.genieWelcomeBack2"],characters.get(17),"characters.amatulfo").put(director,4000,function(){
				var money=parseInt(localStorage.money);
				if(money>=50)
				{
					money-=50;
					localStorage.money=money+"";
					var random=Math.floor(Math.random() * 6) +1;
					var phrase="city.geniePhrase"+random;
					new text.TextSurface([phrase],characters.get(17),"characters.amatulfo").put(director,5000,function(){
						new text.TextSurface(["generic.correct"],characters.get(0),"characters.vadrix").put(director,2500,function(){
						
						});
					});
				}else{
					new text.TextSurface(["generic.notEnough"],characters.get(17),"characters.amatulfo").put(director,2500,function(){
					
					});
				}
				
			});
		}
	});
	/* SpriteSheets */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
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
	var people=new sprite.Group();
	
	/* TMX Map */
	var map = new view.Map('./maps/city.tmx');
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
		people.draw(display);
		vadrix.draw(display);
	}
	return this;
}