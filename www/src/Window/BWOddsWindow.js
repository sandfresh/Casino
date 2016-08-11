/**
 * Created by Maxpain on 2016/8/10.
 */
BWOddsWindow = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.HeaderWindow);

    var titleText = new Phaser.Sprite(game, 0, 0, SheetName.BigWinOddsText, SpriteName.OddsTitltText);
    this.addChild(titleText);
    titleText.position.setTo((this.width - titleText.width) / 2, 30);

    this.textSpriteArray = [];
    for (var key in SpriteName.BWOddsText)
    {
        var textSprite = new Phaser.Sprite(game, 0, 0, SheetName.BigWinOddsText, SpriteName.BWOddsText[key] + 0);
        this.addChild(textSprite);
        this.textSpriteArray.push(textSprite);
        textSprite.position.setTo(32, 83 + (textSprite.height + 5) * (this.textSpriteArray.length - 1));

        var graphics = new Phaser.Graphics(game, 0, 0);
        this.addChild(graphics);
        graphics.beginFill(0x64605D);
        graphics.lineStyle(2, 0x64605D, 1);

        graphics.moveTo(textSprite.x + 15, textSprite.y + textSprite.height+3);
        graphics.lineTo(textSprite.x + 565, textSprite.y + textSprite.height+3);
        graphics.endFill();
    }


    this.textSpriteArray.reverse();
    for (var i = 0; i < this.textSpriteArray.length; i++)
    {
        var textSprite = this.textSpriteArray[i];
        textSprite.position.setTo(40, 90 + (textSprite.height + 5) * i);
    }

};

BWOddsWindow.prototype = Object.create(Phaser.Sprite.prototype);
BWOddsWindow.prototype.constructor = BWOddsWindow;

BWOddsWindow.prototype.blinkIndex = function (type)
{
    for (var key in  this.textSpriteArray)
    {
        var textSprite = this.textSpriteArray[key];

        textSprite.frameName = (textSprite.frameName.slice(0, textSprite.frameName.length - 1) + 0);
    }

    var index = -1;

    switch (type)
    {
        case WinnerNameTag.BigWin.WSBWStraight:
            index = 0;
            break;
        case WinnerNameTag.BigWin.WSBWFlush:
            index = 1;
            break;
        case WinnerNameTag.BigWin.WSBWFourOfAKind:
            index = 2;
            break;
        case WinnerNameTag.BigWin.WSBWFullHouse:
            index = 3;
            break;
        case WinnerNameTag.BigWin.WSBWStraightFlush:
            index = 4;
            break;
        case WinnerNameTag.BigWin.WSBWRoyalFlush:
            index = 5;
            break;
    }

    if (index == -1)
        return;
    var counter = 0;
    this.timer = this.game.time.create(false);
    this.timer.loop(Phaser.Timer.SECOND * 1,  function ()
    {
        var textSprite = this.textSpriteArray[index];
        if (counter++ % 2 == 0)
            textSprite.frameName = (textSprite.frameName.slice(0, textSprite.frameName.length - 1) + 1);
        else
            textSprite.frameName = (textSprite.frameName.slice(0, textSprite.frameName.length - 1) + 0);
    }, this);
}

BWOddsWindow.prototype.initial = function ()
{
    if (this.timer != null)
    {
        this.timer.stop(true);
        this.timer  = null;
    }

    for (var key in  this.textSpriteArray)
    {
        var textSprite = this.textSpriteArray[key];
        textSprite.frameName = (textSprite.frameName.slice(0, textSprite.frameName.length - 1) + 0);
    }
}