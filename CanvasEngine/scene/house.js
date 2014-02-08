/*
* House Scene
*/
canvas.Scene.new({
	name: "House",
	materials: {
		images: {
			logo: {
				path: "img/space.jpg",
				index: 0
			},
			walls: "img/DawnHack/Objects/Walls.png",
			mountains_first: "img/DawnHack/Objects/Mountains1.png"
		}/*,
		fonts : {
			ubuntu: "fonts/Ubuntu.ttf"
		}*/
	},
	called: function(stage){
		this.progress=this.createElement();
		stage.append(this.progress);
	},
	preload: function(stage,percentage,material){
		this.progress.fillStyle="blue";
		this.progress.fillRect(100,100,percentage,25);
		this.progress.fillText("["+percentage+"] Loading: "+material.data.path,100,150);
	},
	ready: function(stage,params){
		/* FullScreen */
	
		var _canvas=this.getCanvas();
		stage.click(function(e,mouse){
			_canvas.setSize("fullscreen","fit");
		});
		
		/* Load Tiled map */
		
		this.map = this.createElement();
		var tiled = canvas.Tiled.new ();
		tiled.load(this, this.map, "maps/house.json");
		tiled.ready(function() {
			var tile_w = this.getTileWidth(),
                tile_h = this.getTileHeight(),
                layer_object = this.getLayerObject();
        
		});
		this.map.pack(400,200);
		stage.append(this.map);
		/* Pack It */
		console.log(this.map);
		
		
		/* Collisions */
		/*var entity=Class.new("Entity",[stage]);
		entity.rect(16,16*50);
		entity.position(0,0);*/
		
		/* Scrolling */
		
		this.scrolling=canvas.Scrolling.new(this,16,16);
		this.player=this.createElement();
		this.player.fillRect(16,16,16,16);
		this.scrolling.setMainElement(this.player);
		this.scrolling.addScroll({
			element: this.map,
			speed: 3,
			block: true,
			width: 120,
			height: 5
		});
		stage.append(this.player);
		
		/* Text and information */
		
		var content=this.createElement();
		var text=canvas.Text.new(this, "The light goes off. Something strante is happening");
		text.style({
			size: "18px" /*ubuntu*/,
			lineWidth: 300,
			color: "black"
		}).draw(content,20,20, {
			line: {
				frames: 50
			}
		});
		stage.append(content);
		
		
		/* Input Handler */
		canvas.Input.keyDown(Input.Left);
		canvas.Input.keyDown(Input.Right);
		canvas.Input.keyDown(Input.Up);
		canvas.Input.keyDown(Input.Bottom);
		
		canvas.Input.keyUp(Input.Left);
		canvas.Input.keyUp(Input.Right);
		canvas.Input.keyUp(Input.Up);
		canvas.Input.keyUp(Input.Bottom);
	},
	render: function(stage){
		/*this.logo.x += 1;*/
		if(canvas.Input.isPressed(Input.Left))
		{
			this.player.x -= 16;
		}
		if(canvas.Input.isPressed(Input.Right))
		{
			this.player.x +=16;
		}
		if(canvas.Input.isPressed(Input.Up))
		{
			this.player.y -= 16;
		}
		if(canvas.Input.isPressed(Input.Bottom))
		{
			this.player.y += 16;
		}
		
		this.scrolling.update();
		stage.refresh();
	},
	exit: function(stage){
	
	}
});