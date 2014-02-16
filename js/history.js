var History = exports.History = function(xMax, yMax){
	this.history=[];
	var i=xMax;
	while(i-->0)
	{
		var j=yMax;
		this.history[i]=[];
		while(j-->0)
		{
			this.history[i][j]={
				enabled: false,
				callback: function(){
				
				}
			};
		}
	}
	
	return this;
}
History.prototype={
	execute: function(xpos, ypos){
		this.history[xpos][ypos].callback();
	},
	has: function(xpos, ypos){
		if(this.history[xpos][ypos].enabled){
			return true;
		}else{
			return false;
		}
	},
	register: function (xpos, ypos, callback){
		this.history[xpos][ypos]={
			enabled: true,
			callback: callback
		};
	}
}