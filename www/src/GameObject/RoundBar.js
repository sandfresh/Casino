RoundBar = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y, SheetName.Common,SpriteName.RoundBar);
	
	this.style = {'font': '48px Arial', 'fill': 'white', 
	    align: "right",
        boundsAlignH: "right",
        boundsAlignV: "center" };
	this.label = new Phaser.Text(game, 0-15, 0+5, "9,999", this.style);

	this.addChild(this.label);
	this.label.anchor.x = 1;
	this.label.x = this.width - 20;
};

RoundBar.prototype = Object.create(Phaser.Sprite.prototype);
RoundBar.prototype.constructor = RoundBar;


RoundBar.prototype.setValue = function(value)
{
	value = util.numberWithCommas(value);
 	this.label.text = value;
};



