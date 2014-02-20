var gamejs=require("gamejs");

var TextSurface = exports.TextSurface = function(textArray, characterImage, characterName)
{
	this.getSurface = function()
	{
		return textBox;
	}
	var font=new gamejs.font.Font("20px Poller One");
	var fontCharacter=new gamejs.font.Font("15px Poller One");
	var person=fontCharacter.render(characterName);
	var textBox=new gamejs.Surface([450,100]);
	textBox.fill("white");
	textBox.setAlpha(0.25);
	textBox.blit(characterImage,[0,0]);
	textBox.blit(person,[20,0]);
	for(var i=0;i<textArray.length;i++)
	{
		var render=font.render(i18n.t(textArray[i]));
		textBox.blit(render,[0,(i*20)+20]);
	}
	return this;
}