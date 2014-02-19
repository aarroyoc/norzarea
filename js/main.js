var gamejs = require('gamejs');
var view = require('./view');
var mixer = require("gamejs/mixer");
var sprite = require("gamejs/sprite");
var spritesheet = require("./spritesheet");
var collision = require("./collision");
var history = require("./history");
var text={
	show: true,
	surface: new gamejs.Surface([450,100])
};

gamejs.preload(['./img/DawnHack/Objects/Walls.png',"./img/DawnHack/Objects/Floors.png","./img/DawnHack/Objects/Tiles.png","./img/DawnHack/Objects/Furniture0.png",'./img/DawnHack/Objects/Mountains1.png',"./img/DawnHack/Characters/Humanoids0.png","./music/DVORAK.ogg","./img/space.jpg"]);

gamejs.ready(function() {
	/*var sound=new mixer.Sound("./music/DVORAK.ogg");
	sound.play(true);
	*/
	/* Initialization */
   gamejs.display.setCaption('Norzarea');
   var display = gamejs.display.setMode([800, 400],gamejs.display.POINTERLOCK);
   var director=new director.Director();
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
   text.surface=textBox;
   setTimeout(function(){
		text.show=false;
   },5000);
   
   
   /* Events for every object */
   gamejs.onEvent(function(event) {
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
   });
	/* Update and render */
   gamejs.onTick(function(msDuration) {
		vadrix.update();
      map.update(msDuration);
      display.clear();
      map.draw(display);
	  vadrix.draw(display);
	  if(text.show)
		display.blit(text.surface,[150,300]);
		
   });
});