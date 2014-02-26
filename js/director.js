var gamejs=require("gamejs");
var guiM = require("./gui");
var Director = exports.Director = function()
{
var onAir = false;
       var activeScene = null;
	   var text={
		show: false,
		surface: new gamejs.Surface([450,100])
	   }
		var gui=new guiM.GUI();
	   this.isShowingText=function(){
		return text.show;
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
		  gui.update();
			
       }

       this.draw = function(display) {
          if (activeScene.draw) {
              activeScene.draw(display);
          }
		  if(text.show)
			display.blit(text.surface,[150,300]);
			gui.getGroup().draw(display);
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