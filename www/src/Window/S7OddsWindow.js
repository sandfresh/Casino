/**
 * Created by Maxpain on 2016/7/20.
 */
S7OddsWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.HeaderWindow);

    var textSprite = new Phaser.Sprite(game, 0, 0, SheetName.S7OddsText, SpriteName.S7RaiseOddsText);
    this.addChild(textSprite);
    textSprite.position.setTo((this.width - textSprite.width) / 2, 25);


    this.textSpriteArray = [];
    for (var i = 0; i < 8; i++)
    {
        var textSprite = new Phaser.Sprite(game, 0, 0, SheetName.S7OddsText, SpriteName.S7OddsText.HighText + 0);
        this.addChild(textSprite);
        textSprite.x = 40;
        textSprite.y = 77 + (textSprite.height + 2) * i; //this.height - 80 - (textSprite.height + 2) * i;
        var underline = new Phaser.Sprite(game, 0, 0, SheetName.S7OddsText, SpriteName.S7RaiseTextUnderLine);
        this.addChild(underline);
        underline.x = textSprite.x;
        underline.y = textSprite.y + textSprite.height;
        this.textSpriteArray.push(textSprite);
    }

    var style = {
        'font': 'bold 32px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };
    this.textArray = [];
    this.textXArray = [];
    this.betTypeArray = [];

    for (var i = 0; i < 8; i++)
    {
        var text1 = new Phaser.Text(this.game, 0, 0, "X", style);

        text1.stroke = "#1F0A00";
        text1.strokeThickness = 6;
        var grd = text1.context.createLinearGradient(0, 0, 0, text1.height);
        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(0.4, '#FFD6A0');
        grd.addColorStop(0.6, '#FFAF00');
        grd.addColorStop(1, '#C16C00');
        text1.fill = grd;
        this.addChild(text1);

        text1.x = this.width - 250;
        text1.y = 80 + (41) * i;
        this.textXArray.push(text1);

        var text2 = new Phaser.Text(this.game, 0, 0, "12345", style);
        text2.anchor.x = 1;
        text2.stroke = "#1F0A00";
        text2.strokeThickness = 6;
        var grd = text2.context.createLinearGradient(0, 0, 0, text2.height);

        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(0.4, '#FFD6A0');
        grd.addColorStop(0.6, '#FFAF00');
        grd.addColorStop(1, '#C16C00');
        text2.fill = grd;
        this.grd = grd;
        this.addChild(text2);
        this.textArray.push(text2);
        text2.x = this.width - 50;
        text2.y = 80 + (41) * i;
    }

    for (var i = 0; i < 8; i++)
    {
        this.textArray[i].visible = false;
        this.textXArray[i].visible = false;
        this.textSpriteArray[i].visible = false
    }
    this.timeEvent = [];
};

S7OddsWindow.prototype = Object.create(Phaser.Sprite.prototype);
S7OddsWindow.prototype.constructor = S7OddsWindow;

S7OddsWindow.prototype.update = function ()
{

};


S7OddsWindow.prototype.blinkType = function (type,value)
{
    var index = 0;
    for(var i = 0 ; i < this.betTypeArray.length;i++)
    {
        if(this.betTypeArray[i] == type)
            index = i;
    }
    window.console.log("found blink index:"+index);
    window.console.log(type,this.betTypeArray);
    this.blinkIndex(index,value)
}
S7OddsWindow.prototype.blinkIndex = function (index,value)
{
    if(index < 0  || index >= this.textArray.length)
        return;
    if(value == true)
    {
        var text = this.textArray[index];
        var textX = this.textXArray[index];
        var textSprite = this.textSpriteArray[index];

        var counter = 0;
        var blinkrepeat = this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 50, function ()
        {
            if (counter++ % 2 == 0)
            {
                textSprite.frameName = textSprite.frameName.slice(0,textSprite.frameName.length-1) + 1;
                text.fill = 'white';
                text.stroke = "#FF0000";
                text.setShadow(0, 0, "#FF0000", 10, true, false);

                textX.fill = "white";
                textX.stroke = "#FF0000";
                textX.setShadow(0, 0, "#FF0000", 10, true, false);
            }
            else
            {
                textSprite.frameName = textSprite.frameName.slice(0,textSprite.frameName.length-1) + 0;

                text.fill = this.grd;
                text.stroke = "#1F0A00";
                text.setShadow();

                textX.fill = this.grd;
                textX.stroke = "#1F0A00";
                textX.setShadow();
            }
        }, this);
        this.timeEvent[index] = blinkrepeat;
    }
    else
    {
        if(this.timeEvent[index] !=null)
        {
            tweens[index].stop();
            this.timeEvent.splice(index, 1);
        }
    }

    window.console.log("blink tweens",this.timeEvent);

};

S7OddsWindow.prototype.initial = function ()
{
    for(var key in this.timeEvent)
    {
        this.timeEvent[key].stop();
    }
    this.timeEvent.length = 0;

    for (var i = 0; i < 8; i++)
    {
        this.textArray[i].visible = false;
        this.textXArray[i].visible = false;
        this.textSpriteArray[i].visible = false
        this.blinkIndex(i,false);
    }

    this.betTypeArray.length = 0;
}

S7OddsWindow.prototype.setValueArray = function (array)
{
    for (var i = 0; i < this.textSpriteArray.length; i++)
    {
        if (i < array.length)
        {
            this.setValue(i, array[i].type, array[i].value);
            this.showValue(i, true);
        }
        else
        {
            this.showValue(i, false);
        }

    }
}
S7OddsWindow.prototype.setValue = function (index, type, value)
{
    switch (type)
    {
        case Super7PKTypeEnum.BETS7PKTriple:
        case BetTypeEnum.Super7PK.S7PKTriple:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.TripleText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKTwoPair:
        case BetTypeEnum.Super7PK.S7PKTwoPair:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.TwoPairText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKOnePair:
        case BetTypeEnum.Super7PK.S7PKOnePair:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.PairText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKNone:
        case BetTypeEnum.Super7PK.S7PKNone:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.HighText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKStraight:
        case BetTypeEnum.Super7PK.S7PKStraight:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.STRText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKFlush:
        case BetTypeEnum.Super7PK.S7PKFlush:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.FLUText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKFullHouse:
        case BetTypeEnum.Super7PK.S7PKFullHouse:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.FUHText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKFour:
        case BetTypeEnum.Super7PK.S7PKFourOfAKind:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.FourText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKStraightFlush:
        case BetTypeEnum.Super7PK.S7PKStraightFlush:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.STFText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKFive:
        case BetTypeEnum.Super7PK.S7PKFiveOfAKind:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.FiveText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKRoyalFlush:
        case BetTypeEnum.Super7PK.S7PKRoyalFlush:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.ROFText + 0;
            break;
        case Super7PKTypeEnum.BETS7PKPureRoyalFlush:
        case BetTypeEnum.Super7PK.S7PKPureRoyalFlush:
            this.textSpriteArray[index].frameName = SpriteName.S7OddsText.PRFText + 0;
            break;
    }

    this.textArray[index].text = value;
    this.betTypeArray[index] = type;

};

S7OddsWindow.prototype.showValue = function (index, value)
{
    if (index >= this.textSpriteArray.length)
        return;
    this.textArray[index].visible = value;
    this.textXArray[index].visible = value;
    this.textSpriteArray[index].visible = value;
};
