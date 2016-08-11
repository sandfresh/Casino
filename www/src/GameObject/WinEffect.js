/**
 * Created by Maxpain on 2016/7/7.
 */
WinEffect = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y);

    this.bg = new Phaser.Sprite(game,0,0,SheetName.WinEffect+0, SpriteName.WinHalo);
    this.addChild(this.bg);
    this.bg.anchor.setTo(0.5);

    this.winSprite = new Phaser.Sprite(game,0,0,SheetName.WinEffect+0, SpriteName.Win)
    this.addChild(this.winSprite);
    this.winSprite.anchor.setTo(0.5);



};

WinEffect.prototype = Object.create(Phaser.Sprite.prototype);
WinEffect.prototype.constructor = WinEffect;

WinEffect.prototype.update = function()
{
    this.bg.rotation += 0.02;
};



