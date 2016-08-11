/**
 * Created by Maxpain on 2016/6/23.
 */
HandPercentWindow = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.HeaderWindow);

    this.oddsPercent = new Phaser.Sprite(game, 30, 20, SheetName.InfoWindow, SpriteName.OddsPercent);
    this.addChild(this.oddsPercent);

    this.percentArray = new Array();
    this.percentTextArray = new Array();

    for (var i = 0; i < 6; i++)
    {
        var progress = new ProgressBar(game, 178, 80 + 51 * i, SpriteName.YellowBetBar);
        this.oddsPercent.addChild(progress);
        this.percentArray.push(progress);
    }

    var style = {
        'font': '30px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    for (i = 0; i < 6; i++)
    {
        var text = new Phaser.Text(game, 0, 0, "99.99%", style);
        text.anchor.setTo(1, 0);
        text.position.setTo(580, 72 + 51 * i);
        text.visible = false;
        this.oddsPercent.addChild(text);
        this.percentTextArray.push(text);
    }

    this.oddsPercent.visible = true;
};

HandPercentWindow.prototype = Object.create(Phaser.Sprite.prototype);
HandPercentWindow.prototype.constructor = HandPercentWindow;

/**
 * Automatically called by World.update
 */
HandPercentWindow.prototype.update = function ()
{

};

HandPercentWindow.prototype.initial = function ()
{
    for (var key in this.percentArray)
        this.percentArray[key].setValue(0);
}
HandPercentWindow.prototype.setTextColor = function (pIndex, colorIndex)
{
    switch (colorIndex)
    {
        case 0:
            this.percentTextArray[pIndex].tint = 0xffd700;
            break;
        case 1:
            this.percentTextArray[pIndex].tint = 0xff0000;
            break;
    }
}

HandPercentWindow.prototype.setProgressColor = function (pIndex, colorIndex)
{
    switch (colorIndex)
    {
        case 0:
            this.percentArray[pIndex].loadTexture(SheetName.InfoWindow, SpriteName.YellowBetBar);
            break;
        case 1:
            this.percentArray[pIndex].loadTexture(SheetName.InfoWindow, SpriteName.RedBetBar);
            break;
    }
}

HandPercentWindow.prototype.setProgressTextByIndex = function (pindex, value, isShow)
{
    if (isShow == null)
        isShow = false;
    var index = pindex;
    value = Number(value).toFixed(2);

    this.percentTextArray[index].text = "" + value + "%";
    this.percentTextArray[index].visible = isShow;
    if (value == 0)
        this.percentTextArray[index].visible = false;
};


HandPercentWindow.prototype.setProgressValueByIndex = function (pindex, percentvalue)
{
    var index = pindex;
    this.percentArray[index].setValue(percentvalue);
};

HandPercentWindow.prototype.setValue = function (hand, value)
{
    var index = 0;
    switch (hand)
    {
        case PokerHandEnum.Straight:
            index = 5;
            break;
        case PokerHandEnum.Flush:
            index = 4;
            break;
        case PokerHandEnum.FullHouse:
            index = 3;
            break;
        case PokerHandEnum.Four:
            index = 2;
            break;
        case PokerHandEnum.StraightFlush:
            index = 1;
            break;
        case PokerHandEnum.RoyalFlush:
            index = 0;
            break;
    }
    this.percentArray[index].setValue(value);
    value = Number(value).toFixed(2);
    this.percentTextArray[index].text = "" + value + "%";
};


