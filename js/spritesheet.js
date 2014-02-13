var gamejs=require("gamejs");

var SpriteSheet= exports.SpriteSheet = function(imagePath, sheetSpec) {
       this.get = function(id) {
          return surfaceCache[id];
       };

       var width = sheetSpec.width;
       var height = sheetSpec.height;
       var image = gamejs.image.load(imagePath);
       var surfaceCache = [];
       var imgSize = new gamejs.Rect([0,0],[width,height]);
       // extract the single images from big spritesheet image
       for (var i=0; i<image.rect.width; i+=width) {
           for (var j=0;j<image.rect.height;j+=height) {
             var surface = new gamejs.Surface([width, height]);
             var rect = new gamejs.Rect(i, j, width, height);
             surface.blit(image, imgSize, rect);
             surfaceCache.push(surface);
          }
       }
       return this;
    };