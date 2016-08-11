/**
 * Created by Maxpain on 2016/7/20.
 */
PerfectBetWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.NoHeaderWindow);

    this.settleLayer = new Phaser.Sprite(game);
    this.addChild(this.settleLayer);
    //var textSprite = new Phaser.Sprite(game, 60, 50, SheetName.S7BetInfo, SpriteName.S7ContentText);
    //this.addChild(textSprite);
    //var textSprite = new Phaser.Sprite(game, 290, 50, SheetName.S7BetInfo, SpriteName.S7BetText);
    //this.addChild(textSprite);
    //var textSprite = new Phaser.Sprite(game, 60, 375, SheetName.S7BetInfo, SpriteName.S7TotalText);
    //this.addChild(textSprite);
    var sprite = new Phaser.Sprite(game,30,40,SheetName.PerfectOddsText,SpriteName.BetValueTable);
    this.addChild(sprite);
    this.score = new Phaser.Sprite(game, 530, 50, SheetName.Common, SpriteName.Score);
    this.settleLayer.addChild(this.score);
    this.settleLayer.visible = false;

    var style = {
        'font': '30px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top",

    };

    this.betTextArray = [];

    var textArray = ["天使","恶魔","大天使8、9","大恶魔8、9","完美天使10","闇黑恶魔10","同点数","双边无赖"];

    //for (var i = 0; i < 8; i++)
    //{
    //    var text = new Phaser.Text(game, 0, 0,  textArray[i],style);
    //    this.addChild(text);
    //    text.x = 65;
    //    text.y = 85 + (text.height + 1) * i;
    //    this.betTextArray.push(text);
    //    text.stroke = '#FFFFFF';
    //    text.strokeThickness = 0.5;
    //}
    //var graphics = new Phaser.Graphics(game, 0, 0);
    //this.addChild(graphics);
    //graphics.beginFill(0x64605D);
    //graphics.lineStyle(2, 0x888D91, 1);
    //
    //graphics.moveTo(text.x-20, text.y + text.height);
    //graphics.lineTo(text.x + 540, text.y + text.height);
    //graphics.endFill();

    this.betTextArray = [];
    this.settleTextArray = [];
    var lineSpace = 36;
    for (var i = 0; i < 8; i++)
    {
        var text = new Phaser.Text(game, 0, 0, "0", style);
        this.addChild(text);
        text.anchor.x = 1;
        text.position.setTo(350, 82 + lineSpace * i);
        this.betTextArray.push(text);

        var text2 = new Phaser.Text(game, 0, 0, "0", style);
        text2.position.setTo(590, 82 + lineSpace * i);
        text2.anchor.x = 1;
        this.settleTextArray.push(text2);
        this.settleLayer.addChild(text2);
    }

    var text = new Phaser.Text(game, 0, 0, "0", style);
    this.addChild(text);
    text.anchor.x = 1;
    text.position.setTo(350, 82 + this.betTextArray.length * lineSpace);
    this.totalBetText = text;

    var text = new Phaser.Text(game, 0, 0, "0", style);
    this.settleLayer.addChild(text);
    text.position.setTo(590, 82 + this.settleTextArray.length * lineSpace);
    text.anchor.x = 1;
    this.totalSettleText = text;

    this.settleLayer.visible = false;
};

PerfectBetWindow.prototype = Object.create(Phaser.Sprite.prototype);
PerfectBetWindow.prototype.constructor = PerfectBetWindow;

PerfectBetWindow.prototype.showSettleValue = function (value)
{
    this.settleLayer.visible = value;
}

PerfectBetWindow.prototype.setBetValueArray = function (array)
{
    for (var i = 0; i < array.length; i++)
    {
        var type = array[i].type;
        var value = array[i].value;
        var index = this.getTypeIndex(type);
        this.betTextArray[index].text = util.numberWithCommas(value);
    }
}


PerfectBetWindow.prototype.setSettleValueArray = function (array)
{
    for (var i = 0; i < array.length; i++)
    {
        var type = array[i].type;
        var value = array[i].value;
        var index = this.getTypeIndex(type);

        if (value != 0)
            this.settleTextArray[index].tint = 0x1AFF00;
        else
            this.settleTextArray[index].tint = 0xFFFFFF;

        this.settleTextArray[index].text = util.numberWithCommas(value);
    }
}

PerfectBetWindow.prototype.setBetTotalValue = function (value)
{
    this.totalBetText.text = util.numberWithCommas(value);
    ;
    this.totalBetText.visible = true;
}

PerfectBetWindow.prototype.setSettleTotalValue = function (value)
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

PerfectBetWindow.prototype.getTypeIndex = function(type)
{
    var index = 0;
    switch(type)
    {
        case BetTypeEnum.PerfectAngel.BetPAAngel :
            index = 0;
            break;
        case BetTypeEnum.PerfectAngel.BetPAEvil :
            index = 1;
            break;
        case BetTypeEnum.PerfectAngel.BetPABigAngel :
            index = 2;
            break;
        case BetTypeEnum.PerfectAngel.BetPABigEvil  :
            index = 3;
            break;
        case BetTypeEnum.PerfectAngel.BetPAPerfectAngel :
            index = 4;
            break;
        case BetTypeEnum.PerfectAngel.BetPAUnbeatenEvil :
            index = 5;
            break;
        case BetTypeEnum.PerfectAngel.BetPATiePoint :
            index = 6;
            break;
        case BetTypeEnum.PerfectAngel.BetPABothNone :
            index = 7;
            break;
    }
    return index;
}


PerfectBetWindow.prototype.initial = function ()
{
    this.totalSettleText.visible = false;
    this.totalBetText.visible = false;
   // this.keymapArray.length = 0;

    for (var i = 0; i < this.betTextArray.length; i++)
    {
        this.betTextArray[i].visible = false;
        this.settleTextArray[i].visible = false;
        this.betTextArray.visible = false;
    }
}