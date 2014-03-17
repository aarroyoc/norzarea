var gamejs=require("gamejs");
var sfxmanager=require("./sfx");

var TextSurface = exports.TextSurface = function(textArray, characterImage, characterName)
{
	this.getSurface = function()
	{
		return textBox;
	}
	this.put=function(director, time, callback)
	{
		director.setTextSurface(textBox);
		director.showText(true);
		setTimeout(function(){
			director.showText(false);
			if(callback!=undefined)
			{
				callback();
			}
		},time);
	}
	var sfx=new sfxmanager.SFXManager();
	var charName=characterName.split(".");
	var sound;
	switch(charName[1])
	{
		case "vadrix" : {sound=sfx.sounds.TALK;}break;
		case "robot" : {sound=sfx.sounds.ROBOT;}break;
		default : {sound=sfx.sounds.TALK;}break;
	}
	sfx.play(sound);
	var font=new gamejs.font.Font("20px UbuntuCondensed");
	var fontCharacter=new gamejs.font.Font("15px Poller One");
	var person=fontCharacter.render(i18n.t(characterName));
	var textBox=new gamejs.Surface([450,100]);
	textBox.fill("white");
	textBox.setAlpha(0.25);
	textBox.blit(characterImage,[0,0]);
	textBox.blit(person,[20,0]);
	for(var i=0;i<textArray.length;i++)
	{
		var render=font.render(i18n.t(textArray[i]));
		textBox.blit(render,[0,(i*20)+25]);
	}
	return this;
}