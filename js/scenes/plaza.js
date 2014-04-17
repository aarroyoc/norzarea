var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");
var tv = require("./tv");

var PlazaScene = exports.PlazaScene = function(director){
	localStorage.progress="9";
	var sceneProgress={
		piblo: false,
		peble: false,
		enableKilled: false,
		pebleKilled: false,
		goToLight: false,
		finalElection: false
	};
	var his=new history.History(50,50);
	/* History */
	his.register(24,19,function(){
		new text.TextSurface(["generic.cartel","plaza.cartel0"],characters.get(0),"characters.vadrix").put(director,3500,function(){
		
		});
	});
	his.register(26,19,function(){
		new text.TextSurface(["generic.cartel","plaza.cartel1"],characters.get(0),"characters.vadrix").put(director,3500,function(){
		
		});
	});
	his.register(24,15,function(){
		new text.TextSurface(["generic.cartel","plaza.cartel2"],characters.get(0),"characters.vadrix").put(director,3500,function(){
		
		});
	});
	his.register(26,15,function(){
		new text.TextSurface(["generic.cartel","plaza.cartel3"],characters.get(0),"characters.vadrix").put(director,3500,function(){
		
		});
	});
	/* Salida */
	his.register(25,24,function(){
		vadrix.xpos=3;
		vadrix.ypos=3;
		new text.TextSurface(["plaza.curioso"],characters.get(0),"characters.vadrix").put(director,2500,function(){
		
		});
	});
	/* Piblo */
	his.register(4,7,function(){
		if(sceneProgress.piblo===false)
		{
			new text.TextSurface(["plaza.piblo0"],characters.get(2),"characters.piblo").put(director,3500,function(){
			
			});
			sceneProgress.piblo=true;
		}
	});
	/* Peble */
	his.register(46,7,function(data){
		if(sceneProgress.peble===false)
		{
			new text.TextSurface(["plaza.peble0"],characters.get(2),"characters.peble").put(director,3500,function(){
			
			});
			sceneProgress.peble=true;
		}else if(sceneProgress.enableKill===true && data.type=="attack"){
			new text.TextSurface(["plaza.peble1"],characters.get(2),"characters.peble").put(director,2500,function(){
				people.remove(peble);
				sceneProgress.pebleKilled=true;
			});
		}
	});
	/* Magic Stone */
	his.register(25,12,function(data){
		if(data.type=="attack")
		{
			if(sceneProgress.pebleKilled===false)
			{
				new text.TextSurface(["generic.cartel","plaza.mentiroso"],characters.get(0),"characters.vadrix").put(director,3500,function(){
					new text.TextSurface(["plaza.vadrix4"],characters.get(0),"characters.vadrix").put(director,3500,function(){
					
					});
				});
				sceneProgress.enableKill=true;
			}else if(sceneProgress.pebleKilled===true && sceneProgress.goToLight===false)
			{
				new text.TextSurface(["generic.cartel","plaza.luzoscura"],characters.get(0),"characters.vadrix").put(director,3500,function(){
				
				});
			}
		}
	});
	/* Alfombra */
	function alfombra()
	{
		if(sceneProgress.pebleKilled===true && sceneProgress.goToLight===false)
		{
			new text.TextSurface(["plaza.vadrix5"],characters.get(0),"characters.vadrix").put(director,3500,function(){
				new text.TextSurface(["plaza.vadrix6","plaza.vadrix7"],characters.get(0),"characters.vadrix").put(director,4500,function(){
					sceneProgress.goToLight=true;
					var wadrix=new sprite.Sprite();
					wadrix.rect=new gamejs.Rect([25*16,11*16],[16,16]);
					wadrix.image=characters.get(11);
					people.add(wadrix);
					new text.TextSurface(["plaza.wadrix0","plaza.wadrix1","plaza.wadrix2"],characters.get(11),"characters.wadrix").put(director,5500,function(){
						new text.TextSurface(["plaza.vadrix8"],characters.get(0),"characters.vadrix").put(director,3500,function(){
							new text.TextSurface(["plaza.wadrix3","plaza.wadrix4"],characters.get(11),"characters.wadrix").put(director,5500,function(){
								new text.TextSurface(["plaza.vadrix9","plaza.vadrix10"],characters.get(0),"characters.vadrix").put(director,4500,function(){
								 	new text.TextSurface(["plaza.wadrix5","plaza.wadrix6","plaza.wadrix7"],characters.get(11),"characters.wadrix").put(director,5500,function(){
										new text.TextSurface(["plaza.wadrix8"],characters.get(11),"characters.wadrix").put(director,3500,function(){
											sceneProgress.finalElection=true;
											var bloco=new sprite.Sprite();
											bloco.rect=new gamejs.Rect([21*16,4*16],[16,16]);
											bloco.image=players.get(9);
											people.add(bloco);
											var amigos=new sprite.Sprite();
											amigos.image=characters.get(3);
											amigos.rect=new gamejs.Rect([33*16,4*16],[16,16]);
											people.add(amigos);
										});
									});
								});
							});
						});
					});
				});
			});
		}
	}
	his.register(37,12,function(data){
		alfombra();
	});
	/* Alfombra */
	his.register(13,12,function(data){
		alfombra();
	});
	/* Amigos */
	his.register(21,4,function(){
		if(sceneProgress.finalElection===true)
		{
			new text.TextSurface(["plaza.vadrix11b"],characters.get(0),"characters.vadrix").put(director,3500,function(){
				new text.TextSurface(["plaza.wadrix9"],characters.get(11),"characters.wadrix").put(director,3500,function(){
					director.replaceScene(new tv.TVScene(director));
				});
			});
		}
	});
	/* Dragon */
	his.register(33,4,function(){
		if(sceneProgress.finalElection===true)
		{
			new text.TextSurface(["plaza.vadrix11a"],characters.get(0),"characters.vadrix").put(director,3500,function(){
				new text.TextSurface(["plaza.wadrix9"],characters.get(11),"characters.wadrix").put(director,3500,function(){
					director.replaceScene(new tv.TVScene(director));
				});
			});
		}
	});
	/* SpriteSheets */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
	var players=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Player0.png",{width: 16, height: 16});
	
	var vadrix=new sprite.Sprite();
	vadrix.xpos=25;
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
	
	var piblo=new sprite.Sprite();
	piblo.rect=new gamejs.Rect([4*16,7*16],[16,16]);
	piblo.image=characters.get(2);
	people.add(piblo);
	
	var peble=new sprite.Sprite();
	peble.rect=new gamejs.Rect([46*16,7*16],[16,16]);
	peble.image=characters.get(2);
	people.add(peble);
	
	
	/* TMX Map */
	var map = new view.Map('./maps/plaza.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	
	/* Startup */
	new text.TextSurface(["plaza.vadrix0","plaza.vadrix0b"],characters.get(0),"characters.vadrix").put(director,4000,function(){
		new text.TextSurface(["plaza.vadrix1","plaza.vadrix2","plaza.vadrix3"],characters.get(0),"characters.vadrix").put(director,5500,function(){
		
		});
	});
	
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