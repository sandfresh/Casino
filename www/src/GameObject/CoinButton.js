CoinButton = function(game, x, y, value,callback,callbackContext) 
{ 
	var imageName = SpriteName.Coin;
	this.OriginY = y;
	this.cointype = value;
	this.selected = false;
	this.coinvalue = 5;
	this.callback = callback;
	this.callbackContext = callbackContext;
	switch (this.cointype)
	{
		case CoinEnum.Coin5:
			imageName = imageName + '5';
			this.coinvalue = 5;
			break;
		case CoinEnum.Coin500:
			imageName = imageName + '500';
			this.coinvalue = 500;
			break;
		case CoinEnum.Coin1k:
			imageName = imageName + '1k';
			this.coinvalue = 1000;
			break;
		case CoinEnum.Coin5k:
			imageName = imageName + '5k';
			this.coinvalue = 5000;
			break;
		case CoinEnum.Coin10k:
			imageName = imageName + '10k';
			this.coinvalue = 10000;
			break;
	}
	this.imageName = imageName;
	Phaser.Group.call(this,game);

	this.base = new Phaser.Button(game,0, 20, SheetName.CoinSheet,function()
	{
		this.onClick();
	},this,SpriteName.CoinShadow,SpriteName.CoinShadow);
	this.add(this.base);

	this.coinSprite = new Phaser.Sprite(game,0, 0,SheetName.CoinSheet, this.imageName+'_0');
	this.coinSprite.anchor.setTo(0.5,0.5);
	this.addChild(this.coinSprite);


	this.setAll("anchor.x",0.5);
	this.setAll("anchor.y",0.5);
	this.scale.setTo(0.9,0.9);
};

CoinButton.prototype = Object.create(Phaser.Group.prototype);
CoinButton.prototype.constructor = CoinButton;

/**
 * Automatically called by World.update
 */
CoinButton.prototype.update = function() {

};
CoinButton.prototype.onClick = function() {

	this.callback.call(this.callbackContext);
	this.hold();
};
CoinButton.prototype.hold = function()
{
	if(GameMgr.getInstance().credit < this.coinvalue)
		this.coinSprite.frameName = this.imageName+'_2';
	else
		this.coinSprite.frameName = this.imageName+'_1';

	this.selected = true;
	//this.coinSprite.position.y = 0 - 30;

	this.game.add.tween(this.coinSprite).to({ y: -30 }, 100, Phaser.Easing.Linear.Out, true);

	BasicGame.currentCoin = this.coinvalue;
	//window.console.log("SelectedCoin:" + BasicGame.currentCoin);
};
CoinButton.prototype.release = function()
{
	if(GameMgr.getInstance().credit < this.coinvalue)
		this.coinSprite.frameName = this.imageName+'_2';
	else
		this.coinSprite.frameName = this.imageName+'_0';

	this.game.add.tween(this.coinSprite).to({ y: -5 }, 100, Phaser.Easing.Linear.In, true);
	//this.coinSprite.position.y = -5  ;
	this.selected = false;
}

CoinButton.prototype.updateCoinUI = function()
{
	if(GameMgr.getInstance().credit - (GameMgr.getInstance().hold) < this.coinvalue)
	{
		this.coinSprite.frameName = this.imageName+'_2';
	}
	else
	{
		if(this.selected == true)
		{
			this.coinSprite.frameName = this.imageName+'_1';

		}
		else
		{
			this.coinSprite.frame = this.imageName+'_0';
		}
	}
}
 