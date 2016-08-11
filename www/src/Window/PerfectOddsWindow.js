/**
 * Created by Maxpain on 2016/7/20.
 */
PerfectOddsWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.HeaderWindow);

    var textSprite = new Phaser.Sprite(game, 0, 0, SheetName.PerfectOddsText, SpriteName.PerfectMainOddsText);
    this.addChild(textSprite);
    textSprite.position.setTo((this.width - textSprite.width) / 2, 25);

    var spriteArray = [];
    var counter = 0;

    var graphics = new Phaser.Graphics(game, 0, 0);
    this.addChild(graphics);
    graphics.beginFill(0x64605D);
    graphics.lineStyle(2, 0x64605D, 1);
    for (var key in SpriteName.PerfectOddsText)
    {
        var textSprite = new Phaser.Sprite(game, 40, 75 + 53 * counter, SheetName.PerfectOddsText, SpriteName.PerfectOddsText[key] + 0);
        this.addChild(textSprite);
        spriteArray.push(textSprite);

        graphics.moveTo(40, 75 + textSprite.height + 53 * (counter));
        graphics.lineTo(40 + 570, 75 + +textSprite.height + 53 * (counter));
        graphics.endFill();
        counter++;
    }
};

PerfectOddsWindow.prototype = Object.create(Phaser.Sprite.prototype);
PerfectOddsWindow.prototype.constructor = PerfectOddsWindow;

PerfectOddsWindow.prototype.update = function ()
{

};


