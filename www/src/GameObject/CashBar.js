CashBar = function (game, x, y) 
{

    Phaser.Sprite.call(this, game, x, y, SheetName.Common,SpriteName.CashBar);
	
	this.style = {'font': '48px Arial', 'fill': 'white', 
	    align: "right", 
        boundsAlignH: "right", 
        boundsAlignV: "top" };
	this.label = new Phaser.Text(game, this.width-20, 0, "0", this.style);
	this.label.anchor.x = 1;
	this.label.y = (this.height - this.label.height)/2 + 5;
	this.addChild(this.label);
};

CashBar.prototype = Object.create(Phaser.Sprite.prototype);
CashBar.prototype.constructor = CashBar;

/**
 * Automatically called by World.update
 */
CashBar.prototype.update = function() 
{
 
};

CashBar.prototype.setValue = function(value)
{
	var newvalue = util.numberWithCommas(value);
 	this.label.text = ""+newvalue;
};



