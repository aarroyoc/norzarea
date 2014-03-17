
var SFXManager = exports.SFXManager = function(){
	
	var enabled=parseInt(localStorage.audio);
	
	this.play=function(data,loop){
		if(enabled==1)
		{
			this.audio.src=data.url;
			this.audio.loop=loop;
			this.audio.play();
		}
	};
	this.stop=function(){
		this.audio.stop();
		this.audio.loop=false;
	}
	this.playExact=function(data,loop,callback){
		if(enabled==1)
		{
			this.audio.autoplay=false;
			this.play(data,loop);
			this.audio.addEventListener("canplay",function(){
				callback();
			});
		}
	};
	this.audio=new Audio();
	this.audio.autoplay=false;
	this.audio.loop=false;
	return this;
}
SFXManager.prototype.sounds={
	TALK: { url: "music/sfx/talk.ogg"},
	EXPLOSION : {url: "music/sfx/explosion.ogg"},
	ROBOT : {url: "music/sfx/robot.ogg"}
};
