var gamejs = require('gamejs');
var view = require('./view');

gamejs.preload(['./img/DawnHack/Objects/Walls.png','./img/DawnHack/Objects/Mountains1.png']);

gamejs.ready(function() {
   gamejs.display.setCaption('TMX viewer');
   var display = gamejs.display.setMode([800, 500],gamejs.display.POINTERLOCK);

   var map = new view.Map('./maps/house.tmx');

   gamejs.onEvent(function(event) {
         map.handle(event);
   });

   gamejs.onTick(function(msDuration) {
      map.update(msDuration);
      display.clear();
      map.draw(display);
   });
});