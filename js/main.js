var gamejs = require('gamejs');
var view = require('./view');
var mixer = require("gamejs/mixer");
var sprite = require("gamejs/sprite");
var event = require("gamejs/event");
var director = require("./director");
var start = require("./scenes/start");

gamejs.preload(["./img/start.png","./img/DawnHack/Items/Books.png","./img/DawnHack/Items/Potions.png","./img/DawnHack/Items/Money.png","./img/DawnHack/Objects/Foliage.png","./img/DawnHack/Characters/Player0.png","./img/DawnHack/Characters/Felines0.png","./img/DawnHack/Items/ShortWeapons.png",'./img/DawnHack/Objects/Walls.png',"./img/DawnHack/Objects/Floors.png","./img/DawnHack/Objects/Tiles.png","./img/DawnHack/Objects/Furniture0.png","./img/DawnHack/Objects/Effects0.png","./img/DawnHack/GUI/GUI0.png",'./img/DawnHack/Objects/Mountains1.png',"./img/DawnHack/Characters/Humanoids0.png","./music/DVORAK.ogg","./img/space.jpg"]);

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

   	if("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
	{
GameController.init( { 
    left: {
        position: { left: '45%', bottom: '45%' }, 
        dpad: { 
            up: {width: "25%", height: "25%", touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "UP"
				});
			}}, 
            down: {width: "25%", height: "25%", touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "DOWN"
				});
			}}, 
            left: { width: '25%', height: '25%', touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "LEFT"
				});
			} }, 
            right: { width: '25%', height: '25%', touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "RIGHT"
				});
			} } 
        } 
    }, 
    right: {
		type: "buttons",
		position: { right: "25%", bottom: "45%"},
		buttons: [{
			label: "ATTACK",
			fontSize: 13,
			touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "SPACE"
				});
			}
		},false,false,false]
	}
} );
	}
});