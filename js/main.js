var gamejs = require('gamejs');
var view = require('./view');
var mixer = require("gamejs/mixer");
var sprite = require("gamejs/sprite");
var spritesheet = require("./spritesheet");

gamejs.preload(['./img/DawnHack/Objects/Walls.png',"./img/DawnHack/Objects/Floors.png","./img/DawnHack/Objects/Tiles.png","./img/DawnHack/Objects/Furniture0.png",'./img/DawnHack/Objects/Mountains1.png',"./img/DawnHack/Characters/Humanoids0.png","./music/DVORAK.ogg","./img/space.jpg"]);

gamejs.ready(function() {
	/*var sound=new mixer.Sound("./music/DVORAK.ogg");
	sound.play(true);
	*/
   gamejs.display.setCaption('TMX viewer');
   var display = gamejs.display.setMode([800, 400],gamejs.display.POINTERLOCK);

   /* Characters SpriteSheet */
   var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
   var vadrix=new sprite.Sprite();
   vadrix.rect=new gamejs.Rect([16*50,16*25],[16,16]);
   vadrix.image=characters.get(0);
   
   /* TMX Map */
   
   var map = new view.Map('./maps/house.tmx');
   
   /* Events for every object */
   gamejs.onEvent(function(event) {
         map.handle(event);
   });
	/* Update and render */
   gamejs.onTick(function(msDuration) {
		vadrix.update();
      map.update(msDuration);
      display.clear();
      map.draw(display);
	  vadrix.draw(display);
   });
});