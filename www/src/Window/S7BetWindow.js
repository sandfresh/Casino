/**
 * Created by Maxpain on 2016/7/20.
 */
S7BetWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.NoHeaderWindow);

    this.settleLayer = new Phaser.Sprite(game);
    this.addChild(this.settleLayer);
    var textSprite = new Phaser.Sprite(game, 60, 50, SheetName.S7BetInfo, SpriteName.S7ContentText);
    this.addChild(textSprite);
    var textSprite = new Phaser.Sprite(game, 290, 50, SheetName.S7BetInfo, SpriteName.S7BetText);
    this.addChild(textSprite);
    var textSprite = new Phaser.Sprite(game, 60, 365, SheetName.S7BetInfo, SpriteName.S7TotalText);
    this.addChild(textSprite);

    this.score = new Phaser.Sprite(game, 530, 50, SheetName.Common, SpriteName.Score);
    this.settleLayer.addChild(this.score);
    this.settleLayer.visible = false;

    this.textSpriteArray = [];
    for (var i = 0; i < 9; i++)
    {
        var textSprite = new Phaser.Sprite(game, 0, 0, SheetName.S7BetInfo, SpriteName.S7OddsText.FLUText);
        this.addChild(textSprite);
        textSprite.x = 65;
        textSprite.y = 85 + (textSprite.height + 3) * i;
        this.textSpriteArray.push(textSprite);
        //var underline = new Phaser.Sprite(game, 0, 0, SheetName.S7OddsText, SpriteName.S7RaiseTextUnderLine);
        //this.addChild(underline);
        //underline.position.setTo(textSprite.x, textSprite.y + textSprite.height);
    }

    var style = {
        'font': '30px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    this.betTextArray = [];
    this.settleTextArray = [];
    for (var i = 0; i < 9; i++)
    {
        var text = new Phaser.Text(game, 0, 0, "0", style);
        this.addChild(text);
        text.anchor.x = 1;
        text.position.setTo(350, 82 + (31) * i);
        this.betTextArray.push(text);

        var text2 = new Phaser.Text(game, 0, 0, "0", style);
        //  this.addChild(text2);
        text2.position.setTo(590, 82 + 31 * i);
        text2.anchor.x = 1;
        this.settleTextArray.push(text2);
        this.settleLayer.addChild(text2);
    }

    this.underline = new Phaser.Sprite(game, 0, 0, SheetName.S7OddsText, SpriteName.S7RaiseTextUnderLine);
    this.addChild(this.underline);
    this.underline.position.setTo(textSprite.x, textSprite.y + textSprite.height);

    var text = new Phaser.Text(game, 0, 0, "0", style);
    this.addChild(text);
    text.anchor.x = 1;
    text.position.setTo(350, 82 + this.betTextArray.length * 31);
    this.totalBetText = text;

    var text = new Phaser.Text(game, 0, 0, "0", style);
    this.settleLayer.addChild(text);
    text.position.setTo(590, 82 + this.settleTextArray.length * 31);
    text.anchor.x = 1;
    this.totalSettleText = text;
    //this.keymapArray = [];

    this.settleLayer.visible = false;
};

S7BetWindow.prototype = Object.create(Phaser.Sprite.prototype);
S7BetWindow.prototype.constructor = S7BetWindow;


S7BetWindow.prototype.showSettleValue = function (value)
{
    this.settleLayer.visible = value;
}


S7BetWindow.prototype.setBetValueArray = function (array)
{
    var betArray = array.slice();
    for (var i = 0; i < betArray.length; i++)
    {
        var obj = this.getBetIndexFrame(betArray[i].type);

        betArray[i].index = obj.index;
        betArray[i].frameName = obj.frameName;
    }

    betArray.sort(function (a, b)
    {
        return a.index - b.index
    });

    for (var i = 0; i < this.textSpriteArray.length; i++)
    {
        this.textSpriteArray[i].visible = false;
        this.betTextArray[i].visible = false;
    }

    for (var i = 0; i < betArray.length && i < this.textSpriteArray.length; i++)
    {
        this.textSpriteArray[i].visible = true;
        this.betTextArray[i].visible = true;

        this.textSpriteArray[i].frameName = betArray[i].frameName;
        this.betTextArray[i].text = betArray[i].value;
    }
}
S7BetWindow.prototype.setSettleValueArray = function (array)
{
    var settleArray = array.slice();
    for (var i = 0; i < settleArray.length; i++)
    {
        var obj = this.getBetIndexFrame(settleArray[i].type);

        settleArray[i].index = obj.index;
    }

    settleArray.sort(function (a, b)
    {
        return a.index - b.index
    });

    for (var i = 0; i < this.textSpriteArray.length; i++)
    {
        this.settleTextArray[i].visible = false;
    }

    for (var i = 0; i < settleArray.length && i < this.settleTextArray.length; i++)
    {
        this.settleTextArray[i].visible = true;

        this.settleTextArray[i].text = settleArray[i].value;
    }
}

S7BetWindow.prototype.setBetTotalValue = function (value)
{
    this.totalBetText.text = util.numberWithCommas(value);
    ;
    this.totalBetText.visible = true;
}
S7BetWindow.prototype.setSettleTotalValue = function (value)
{
    value = Math.floor(value);
    if (value != 0)
        this.totalSettleText.tint = 0x1AFF00;
    else
        this.totalSettleText.tint = 0xFFFFFF;
    window.console.log("settle total:" + value);
    this.totalSettleText.text =  util.numberWithCommas(value);
    this.totalSettleText.visible = true;
}

S7BetWindow.prototype.getBetIndexFrame = function (type)
{
    var frameName;
    var index;
    switch (type)
    {
        case BetTypeEnum.Super7PK.S7PKRaise:
        case BetTypeEnum.Super7PK.S7PKMain:
            frameName = SpriteName.S7OddsText.MainText;
            index = 0;
            break;
        case BetTypeEnum.Super7PK.S7PKNone:
            frameName = SpriteName.S7OddsText.HighText;
            index = 1;
            break;
        case BetTypeEnum.Super7PK.S7PKOnePair:
            frameName = SpriteName.S7OddsText.PairText;
            index = 2;
            break;
        case BetTypeEnum.Super7PK.S7PKTwoPair:
            frameName = SpriteName.S7OddsText.TwoPairText;
            index = 3;
            break;
        case BetTypeEnum.Super7PK.S7PKTriple:
            frameName = SpriteName.S7OddsText.TripleText;
            index = 4;
            break;
        case BetTypeEnum.Super7PK.S7PKStraight:
            frameName = SpriteName.S7OddsText.STRText;
            index = 5;
            break;
        case BetTypeEnum.Super7PK.S7PKFlush:
            frameName = SpriteName.S7OddsText.FLUText;
            index = 6;
            break;
        case BetTypeEnum.Super7PK.S7PKFullHouse:
            frameName = SpriteName.S7OddsText.FUHText;
            index = 7;
            break;
        case BetTypeEnum.Super7PK.S7PKFourOfAKind:
            frameName = SpriteName.S7OddsText.FourText;
            index = 8;
            break;
        case BetTypeEnum.Super7PK.S7PKStraightFlush:
            frameName = SpriteName.S7OddsText.STFText;
            index = 9;
            window.console.log("StrightFlush:"+frameName);
            break;
        case BetTypeEnum.Super7PK.S7PKFiveOfAKind:
            frameName = SpriteName.S7OddsText.FiveText;
            index = 10;
            break;
        case BetTypeEnum.Super7PK.S7PKRoyalFlush:
            frameName = SpriteName.S7OddsText.ROFText;
            index = 11;
            break;
        case BetTypeEnum.Super7PK.S7PKPureRoyalFlush:
            frameName = SpriteName.S7OddsText.PRFText;
            index = 12;
            break;
    }
    var obj = {};
    obj.frameName = frameName;
    obj.index = index;
    return obj;
}

S7BetWindow.prototype.initial = function ()
{
    this.totalSettleText.visible = false;
    this.totalBetText.visible = false;
   // this.keymapArray.length = 0;

    for (var i = 0; i < this.betTextArray.length; i++)
    {
        this.betTextArray[i].visible = false;
        this.settleTextArray[i].visible = false;
        this.textSpriteArray.visible = false;
    }
}