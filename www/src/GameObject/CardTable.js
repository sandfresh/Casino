CardTable = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y,SheetName.BigWinMain, SpriteName.BetTable);
    var tabletext = new Phaser.Sprite(game,0,0,SheetName.BigWinMain,SpriteName.TableText);
    this.addChild(tabletext);
    tabletext.position.setTo((this.width-tabletext.width)/2,(this.height-tabletext.height)/2 + 70);
    var style = {
        font: '48px Arial', fill: '#FEDC94',
        align: "right",

        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    this.playerValueText = new Phaser.Text(game, 405, 225, "9", style);
    this.addChild(this.playerValueText);
    this.bankerValueText = new Phaser.Text(game, 1485, 225, "9", style);

    this.dotArray = new Array();
    for(var i = 0 ;i <2 ;i++)
    {
        var dot = new Phaser.Sprite(game,420+1080*i,232,SheetName.BigWinMain,SpriteName.Dot);
        this.addChild(dot);
        this.dotArray.push(dot);
    }

    this.addChild(this.bankerValueText);
    this.bankerValueText.anchor.x = 0.5;
    this.playerValueText.anchor.x = 0.5;

    this.cardArray = new Array();
    this.playerCardArray = new Array();
    this.bankerCardArray = new Array();
    this.extraCardArray = new Array();

    for (var i = 0; i < 6; i++)
    {
        var poker = new Poker(this.game, 0, 0);
        this.addChild(poker);

        this.cardArray.push(poker);
        poker.position.setTo(300 + (200 * i) + 160 * Math.floor(i / 2), 430);
        poker.setCard(PokerSuitEnum.Spade, 13);
    }

    this.playerCardArray.push(this.cardArray[0]);
    this.playerCardArray.push(this.cardArray[1]);
    this.extraCardArray.push(this.cardArray[2]);
    this.extraCardArray.push(this.cardArray[3]);
    this.bankerCardArray.push(this.cardArray[4]);
    this.bankerCardArray.push(this.cardArray[5]);
};

CardTable.prototype = Object.create(Phaser.Sprite.prototype);
CardTable.prototype.constructor = CardTable;

/**
 * Automatically called by World.update
 */
CardTable.prototype.update = function ()
{

};

CardTable.prototype.setCard= function (target, index, suit, point)
{

    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].setCard(suit, point);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].setCard(suit, point);
            break;
        case CardTargetEnum.River:
            this.extraCardArray[index].setCard(suit, point);
            break;
    }
}

CardTable.prototype.setCardByObj= function (target, index, suitpoint)
{
    var point = suitpoint[0];
    var suit = suitpoint[1];

    switch(suit)
    {
        case "s":
            suit = PokerSuitEnum.Spade;
            break;
        case "c":
            suit = PokerSuitEnum.Club;
            break;
        case "d":
            suit = PokerSuitEnum.Diamond;
            break;
        case "h":
            suit = PokerSuitEnum.Heart;
            break;
    }

    switch(point)
    {
        case "k":
            point = 13;
            break;
        case "q":
            point = 12;
            break;
        case "j":
            point = 11;
            break;
        case "i":
            point = 10;
            break;
    }
    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].setCard(suit, point);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].setCard(suit, point);
            break;
        case CardTargetEnum.River:
            this.extraCardArray[index].setCard(suit, point);
            break;
    }
}

CardTable.prototype.showCard = function (target, index, smooth)
{
    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].showCard(smooth);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].showCard(smooth);
            break;
        case CardTargetEnum.River:
            this.extraCardArray[index].showCard(smooth);
            break;
    }
};

CardTable.prototype.showHalo = function (target, index)
{
    for(var i = 0 ; i <this.cardArray.length;i++)
    {
        this.cardArray[i].showHalo(false);
    }
    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].showHalo(true);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].showHalo(true);
            break;
        case CardTargetEnum.River:
            this.extraCardArray[index].showHalo(true);
            break;
    }
};

CardTable.prototype.showTargetPoint = function (target)
{
    var total = 0;
    switch (target)
    {
        case CardTargetEnum.Player:
            for(var i = 0 ; i <this.playerCardArray.length;i++)
            {
                var point = this.playerCardArray[i].point > 10 ? 10 :this.playerCardArray[i].point;
                total+= Number(point);
              //  window.console.log("point:"+point);
            }
            total = total%10;
          //  window.console.log(total);
            this.dotArray[0].visible = true;
            this.playerValueText.text = ""+total;
            this.playerValueText.visible = true;
            break;
        case CardTargetEnum.Banker:
            for(var i = 0 ; i <this.bankerCardArray.length;i++)
            {
                var point = this.bankerCardArray[i].point > 10 ? 10 :this.bankerCardArray[i].point;
                total+= Number(point);
                //   window.console.log("point:"+point);
            }
            total = total%10;
           // window.console.log(total);
            this.dotArray[1].visible = true;
            this.bankerValueText.text  = ""+total;
            this.bankerValueText.visible = true;
            break;
    }
}



CardTable.prototype.initial = function()
{
    for(var i = 0 ; i < this.cardArray.length;i++)
    {
        this.cardArray[i].initial();
    }
    this.playerValueText.text = "";
    this.playerValueText.visible = false;
    this.bankerValueText.text = "";
    this.bankerValueText.visible = false;

    for(var key in this.dotArray)
        this.dotArray[key].visible = false;

  //  this.bankerValueText.visible = false;
   // this.playerValueText.visible = false;
   // for(var key in this.dotArray)
   //     this.dotArray[key].visible = false;
};