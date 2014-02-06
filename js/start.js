/*
* Starter code
*/
var canvas=CE.defines("canvas")
	.extend(Input)
	.extend(Animation)
	.extend(Tiled)
	.extend(Spritesheet)
	.extend(Scrolling)
	.extend(Text)
	.extend(Hit)
	.ready(function(){
	canvas.Scene.call("House");
});