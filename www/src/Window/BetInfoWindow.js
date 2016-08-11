/**
 * Created by Maxpain on 2016/6/23.
 */
BetInfoWindow = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y,SheetName.Windows, SpriteName.NoHeaderWindow);



    this.historyLayer = new Phaser.Group(game,this);
    this.betValueLayer = new Phaser.Group(game,this);

    //***********************************************************************************

    var historytable = new Phaser.Sprite(game,35,30,SheetName.InfoWindow,SpriteName.HistoryTable);
    this.historyLayer.add(historytable);


    this.recordPointArray = new Array();

    for(var i =0 ;i < 60 ;i++)
    {
        var recordpoint = new RecordPoint(game, 8+ 57 * Math.floor(i/6) ,7 +  48.5 * (i%6));
        historytable.addChild(recordpoint);
        this.recordPointArray.push(recordpoint);
        recordpoint.visible = false;
    }
    //***********************************************************************************
    this.betvaluetable = new Phaser.Sprite(game,30,35,SheetName.InfoWindow,SpriteName.BetValueTable);
    this.betValueLayer.add(this.betvaluetable);

    this.extrabar = new Phaser.Sprite(game,30,330,SheetName.InfoWindow,SpriteName.ExtraBonusBar);
    this.addChild(this.extrabar);

    this.getValueLayer = new Phaser.Group(game);
    this.getValueLayer.position.setTo(x,y);

    this.score = new Phaser.Sprite(game,530,40,SheetName.Common,SpriteName.Score);
    this.betValueLayer.add(this.score);

    var style = {'font': '30px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top" };

    this.betValueTextArray = new Array();
    this.settleValueTextArray = new Array();

    this.getBonusTextArray = new Array();
    this.getBonusBarArray = new Array();

    this.getInfoObjectArray = new Array();

    for(i = 0 ; i < 6; i++)
    {
        var text = new Phaser.Text(game, 0, 0, "0", style);
        text.position.setTo(350,80+35*i);
        this.betvaluetable.addChild(text);
        this.betValueTextArray.push(text);
        this.betValueLayer.add(text);
        text.anchor.x = 1;

        var text = new Phaser.Text(game, 0, 0, "0", style);
        text.position.setTo(590,80+35*i);
        this.betvaluetable.addChild(text);
        this.settleValueTextArray.push(text);
        this.getInfoObjectArray.push(text);
        this.betValueLayer.add(text);
        text.anchor.x = 1;
    }

    for(var i =0 ;i <2 ;i++)
    {
        var progressname = "";
        if(i == 0)
            progressname = SpriteName.PinkProgress;
        if(i == 1)
            progressname = SpriteName.PurpleProgress;

        var progressbar = new ProgressBar(game,137,5+38*i,progressname);
        this.extrabar.addChild(progressbar);
        this.getBonusBarArray.push(progressbar);
        progressbar.setValue(0);

        var text = new Phaser.Text(game, 0, 0, "0", style);
        text.position.setTo(590,335+35*i);
        this.addChild(text);
        this.getBonusTextArray.push(text);
        text.anchor.x = 1;
    }

    var style = {'font': '30px Arial', 'fill': '#FFAE23',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top" };

    var text = new Phaser.Text(game, 0, 0, "0", style);
    text.position.setTo(350,290);
    this.betvaluetable.addChild(text);
    this.betValueTextArray.push(text);
    this.betValueLayer.add(text);
    text.anchor.x = 1;

    var text = new Phaser.Text(game, 0, 0, "0", style);
    text.position.setTo(590,290);
    this.betvaluetable.addChild(text);
    this.settleValueTextArray.push(text);
    this.getInfoObjectArray.push(text);
    this.betValueLayer.add(text);
    text.anchor.x = 1;

    this.betValueLayer.visible = false;

};

BetInfoWindow.prototype = Object.create(Phaser.Sprite.prototype);
BetInfoWindow.prototype.constructor = BetInfoWindow;

BetInfoWindow.prototype.update = function()
{

};

BetInfoWindow.prototype.setBetValue = function(type, value)
{
    var index = 0;
    switch(type)
    {
        case BetTypeEnum.BigWin.Banker:
            index = 0;
            break;
        case BetTypeEnum.BigWin.Player:
            index = 1;
            break;
        case BetTypeEnum.BigWin.Draw:
            index = 2;
            break;
        case BetTypeEnum.BigWin.BankerPair:
            index = 3;
            break;
        case BetTypeEnum.BigWin.PlayerPair:
            index = 4;
            break;
        case BetTypeEnum.BigWin.Special:
            index = 5;
            break;
    }
    this.betValueTextArray[index].text = util.numberWithCommas(value);
}

BetInfoWindow.prototype.setBetValueByObject = function(value)
{
    var index = 0;
    switch(value.type)
    {
        case BetTypeEnum.BigWin.Banker:
            index = 0;
            break;
        case BetTypeEnum.BigWin.Player:
            index = 1;
            break;
        case BetTypeEnum.BigWin.Draw:
            index = 2;
            break;
        case BetTypeEnum.BigWin.BankerPair:
            index = 3;
            break;
        case BetTypeEnum.BigWin.PlayerPair:
            index = 4;
            break;
        case BetTypeEnum.BigWin.Special:
            index = 5;
            break;
    }
    this.betValueTextArray[index].text = util.numberWithCommas(value.value);
}

BetInfoWindow.prototype.setBetTotalValue = function(value)
{
    this.betValueTextArray[6].text = util.numberWithCommas(value);
}

BetInfoWindow.prototype.setSettleValue = function(value)
{
 //   window.console.log("SettleValue:",value)
    var index = 0;
    switch(value.type)
    {
        case BetTypeEnum.BigWin.Banker:
            index = 0;
            break;
        case BetTypeEnum.BigWin.Player:
            index = 1;
            break;
        case BetTypeEnum.BigWin.Draw:
            index = 2;
            break;
        case BetTypeEnum.BigWin.BankerPair:
            index = 3;
            break;
        case BetTypeEnum.BigWin.PlayerPair:
            index = 4;
            break;
        case BetTypeEnum.BigWin.Special:
            index = 5;
            break;
    }
    var winCredit = Math.floor(value.value);
    this.settleValueTextArray[index].text = util.numberWithCommas(winCredit);

    if(winCredit !=0)
        this.settleValueTextArray[index].tint = 0x1AFF00;
    else
        this.settleValueTextArray[index].tint = 0xFFFFFF;
}

BetInfoWindow.prototype.setSettleTotalValue = function(value)
{
    value = Math.floor(value);
    if(value !=0)
        this.settleValueTextArray[6].tint = 0x1AFF00;
    else
        this.settleValueTextArray[6].tint = 0xFFFFFF;

    this.settleValueTextArray[6].text = util.numberWithCommas(value);
}

BetInfoWindow.prototype.showSettleValue = function(isShow)
{
    for(var i=0;i<this.getInfoObjectArray.length;i++)
        this.getInfoObjectArray[i].visible = isShow;
}

BetInfoWindow.prototype.setBonusValue = function(type, value)
{
    var times = value.length;
    var total = 0;
    for(var i=0;i<value.length;i++)
    {
        total+= Number(value[i]);
    }

    switch(type)
    {
        case BonusNameTag.BonusTwoPair:
            this.getBonusTextArray[1].text = total;
            this.getBonusBarArray[1].setValue((times/5)*100);
            break;
        case BonusNameTag.BonusTripple:
            this.getBonusTextArray[0].text = total;
            this.getBonusBarArray[0].setValue((times/5)*100);
            break;
    }
}

BetInfoWindow.prototype.setPoint = function(index, point, playerpair, bankerpair, winner)
{
    if(index < this.recordPointArray.length)
        this.recordPointArray[index].setPoint(point,playerpair,bankerpair,winner);
}

BetInfoWindow.prototype.showPoint = function(index, isShow)
{
    if(index < this.recordPointArray.length)
        this.recordPointArray[index].visible = isShow;
}

BetInfoWindow.prototype.showWindow = function (value)
{
    switch (value)
    {
        case BetInfoEnum.HistoryInfo:
            this.betValueLayer.visible = false;
            this.historyLayer.visible = true;
            break;
        case BetInfoEnum.BetInfo:
            this.betValueLayer.visible = true;
            this.historyLayer.visible = false;
            break;
    }
};

BetInfoWindow.prototype.initial = function ()
{
    for(var i = 0 ; i < this.betValueTextArray.length ;i++)
    {
        this.betValueTextArray[i].text = "0";
    }
    for(var i = 0 ; i < this.settleValueTextArray.length ;i++)
    {
        this.settleValueTextArray[i].text = "0";
    }
}

