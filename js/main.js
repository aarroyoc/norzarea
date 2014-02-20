var gamejs = require('gamejs');
var view = require('./view');
var mixer = require("gamejs/mixer");
var sprite = require("gamejs/sprite");
var director = require("./director");
var start = require("./scenes/start");

gamejs.preload(["./img/start.png",'./img/DawnHack/Objects/Walls.png',"./img/DawnHack/Objects/Floors.png","./img/DawnHack/Objects/Tiles.png","./img/DawnHack/Objects/Furniture0.png",'./img/DawnHack/Objects/Mountains1.png',"./img/DawnHack/Characters/Humanoids0.png","./music/DVORAK.ogg","./img/space.jpg"]);

gamejs.ready(function() {
	/*var sound=new mixer.Sound("./music/DVORAK.ogg");
	sound.play(true);
	*/
	/* Initialization */
   gamejs.display.setCaption('Norzarea');
   var display = gamejs.display.setMode([800, 400],gamejs.display.POINTERLOCK);
   var dir=new director.Director();
   var scene=new start.StartScene(dir);
   dir.start(scene);
   
   /* Events for every object */
   gamejs.onEvent(function(event) {
		dir.handleEvent(event);
   });
	/* Update and render */
   gamejs.onTick(function(msDuration) {
		dir.update(msDuration);
		dir.draw(display);
   });
});