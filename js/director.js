var Director = exports.Directory = function()
{
var onAir = false;
       var activeScene = null;

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