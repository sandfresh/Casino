/**
 * Created by Maxpain on 2016/7/19.
 */

BoardWindow = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.HeaderWindow);
    var boardText = new Phaser.Sprite(game,276,25,SheetName.S7Main,SpriteName.BoardText);
    this.addChild(boardText);
    this.extraArray = [];
    this.riverAarray = [];
    this.cardArray = [];

    for (var i = 0; i < 7; i++)
    {
        var card = new Poker(game, 0, 0);
        this.addChild(card);
        card.setScale(0.77);
        card.position.setTo(card.getWidth() / 2 + 40 + (card.getWidth() / 2) * i, card.getHeight() / 2 + 130 + 50 * Math.floor(i % 2));
        this.cardArray.push(card);
    }
    this.extraArray.push(this.cardArray[0]);
    this.extraArray.push(this.cardArray[2]);
    this.extraArray.push(this.cardArray[4]);
    this.extraArray.push(this.cardArray[5]);
    this.extraArray.push(this.cardArray[6]);
    this.riverAarray.push(this.cardArray[1]);
    this.riverAarray.push[this.cardArray[3]];
};

BoardWindow.prototype = Object.create(Phaser.Sprite.prototype);
BoardWindow.prototype.constructor = BoardWindow;

BoardWindow.prototype.update = function ()
{
};

BoardWindow.prototype.setCard = function (target, index, suitpoint)
{
    if (target == CardTargetEnum.Extra)
        this.extraArray[index].setCardByObj(suitpoint);
    else if(target == CardTargetEnum.River)
        this.riverArray[index].setCardByObj(suitpoint);
};
BoardWindow.prototype.showCard = function (target, index, smooth)
{
    if (target == CardTargetEnum.Extra)
        this.extraArray[index].showCard(smooth);
    else if(target == CardTargetEnum.River)
        this.riverArray[index].showCard(smooth);
};

BoardWindow.prototype.initial = function ()
{
    for( var key in this.cardArray)
        this.cardArray[key].initial();
};