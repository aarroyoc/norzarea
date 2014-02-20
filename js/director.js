var gamejs=require("gamejs");
var Director = exports.Director = function()
{
var onAir = false;
       var activeScene = null;
	   var text={
		show: false,
		surface: new gamejs.Surface([450,100])
	   }
	   this.setTextSurface=function(newSurface){
		text.surface=newSurface;
	   }
	   this.showText=function(enabled)
	   {
		text.show=enabled;
	   }
       this.update = function(msDuration) {
          if (!onAir) return;

          if (activeScene.update) {
             activeScene.update(msDuration);
          }
		  
			
       }

       this.draw = function(display) {
          if (activeScene.draw) {
              activeScene.draw(display);
          }
		  if(text.show)
			display.blit(text.surface,[150,300]);
       };

       this.handleEvent = function(event) {
          if (activeScene.handleEvent) {
             activeScene.handleEvent(event);
          }
       }


       this.start = function(scene) {
          onAir = true;
          this.replaceScene(scene);
          return;
       };

       this.replaceScene = function(scene) {
          activeScene = scene;
       };

       this.getScene = function() {
          return activeScene;
       };
       return this;
}