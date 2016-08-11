Coin = function(game, x, y, value)
{
	//	Phaser.Sprite.call(this, game, x, y, 'cardback');
	var imageName = SpriteName.Coin;
	this.value = value;
	switch (value) {
		case 5:
			imageName = imageName + '5';
			break;
		case 10:
			imageName = imageName + '10';
			break;
		case 50:
			imageName = imageName + '50';
			break;
		case 100:
			imageName = imageName + '100';
			break;
		case 500:
			imageName = imageName + '500';
			break;
		case 1000:
			imageName = imageName + '1k';
			break;
		case 5000:
			imageName = imageName + '5k';
			break;
		case 10000:
			imageName = imageName + '10k';
			break;
	}
	Phaser.Sprite.call(this, game, x, y,SheetName.CoinSheet,imageName+"_0");

};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

/**
 * Automatically called by World.update
 */
Coin.prototype.update = function() {

};

Coin.prototype.setCard = function(suit, point) {

};

Coin.prototype.setScale = function(value) {
	this.scale.setTo(value);
};