var gamejs = require("gamejs");
var sprite = require("gamejs/sprite");
var spritesheet = require("./spritesheet");

var GUI = exports.GUI = function()
{
	this.guiImages=new spritesheet.SpriteSheet("./img/DawnHack/GUI/GUI0.png",{width: 16, height: 16});
	this.bookImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/Books.png",{width: 16, height: 16});
	this.potionImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/Potions.png",{width: 16, height: 16});
	this.weaponImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/ShortWeapons.png",{width: 16, height: 16});
	this.moneyImages=new spritesheet.SpriteSheet("./img/DawnHack/Items/Money.png",{width: 16, height: 16});
	this.gui=new sprite.Group();
	this.update();
	return this;
}
GUI.prototype={
	getGroup: function(){
		return this.gui;
	},
	update: function(){
		/* Clean */
		this.gui.empty();
		/* Health */
		var health=parseInt(localStorage.life);
		for(var i=0; i<health;i++)
		{
			//DRAW NEW HEART
			var heart=new sprite.Sprite();
			heart.rect=new gamejs.Rect([i*20,0],[16,16]);
			heart.image=this.guiImages.get(1);
			this.gui.add(heart);
		}
		/* Potion */
		var pot=parseInt(localStorage.potion);
		var potion=new sprite.Sprite();
		potion.rect=new gamejs.Rect([0,20],[16,16]);
		potion.image=this.potionImages.get(pot);
		this.gui.add(potion);
		/* Book */
		var bo=parseInt(localStorage.book);
		var book=new sprite.Sprite();
		book.rect=new gamejs.Rect([20,20],[16,16]);
		book.image=this.bookImages.get(bo);
		this.gui.add(book);
		/* Weapon */
		var wea=parseInt(localStorage.weapon);
		var weapon=new sprite.Sprite();
		weapon.rect=new gamejs.Rect([40,20],[16,16]);
		weapon.image=this.weaponImages.get(wea);
		this.gui.add(weapon);
		/* Money */
		var money=new sprite.Sprite();
		money.rect=new gamejs.Rect([0,40],[16,16]);
		money.image=this.moneyImages.get(5);
		this.gui.add(money);
		var font=new gamejs.font.Font("16px UbuntuCondensed");
		var mon=font.render(localStorage.money);
		var monNumber=new sprite.Sprite();
		monNumber.rect=new gamejs.Rect([20,40],mon.getSize());
		monNumber.image=mon;
		this.gui.add(monNumber);
	}
}