/**
 * Created by Maxpain on 2016/6/27.
 */

PokerOpenWindow = function (game)
{
    Phaser.Group.call(this, game);

    this.bg = new Phaser.Sprite(game, 0, 0, SpriteName.White,0);
    this.add(this.bg);
    this.bg.width = game.width;
    this.bg.height = game.height;
    this.bg.alpha = 0.5;
    this.bg.tint = "#00000";
    this.bg.inputEnabled = true;

    this.cardback = new Phaser.Sprite(game,0,0,SheetName.BigCard+0,SpriteName.Poker.BigCardBack);
    this.add(this.cardback);
    this.cardback.position.setTo((game.width-this.cardback.width)/2-100,(game.height-this.cardback.height)/2);
    this.opencard = null;

    this.opencard = new Phaser.Sprite(game,0,0,SheetName.BigCard+0,SpriteName.Poker.BigCardBack);
    this.add(this.opencard);
    this.opencard.position.setTo(this.cardback.x,this.cardback.y);
    this.cardback.bringToTop();

};

PokerOpenWindow.prototype = Object.create(Phaser.Group.prototype);
PokerOpenWindow.prototype.constructor = PokerOpenWindow;


PokerOpenWindow.prototype.showCardByObj = function(suitpoint,callback,callbackContext)
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
        case "q":
            suit = PokerSuitEnum.Joker;
            point = 1;
            break;
        case "j":
            point = 0;
            suit = PokerSuitEnum.Joker;
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

    this.showCard(suit,point,callback,callbackContext);
}

PokerOpenWindow.prototype.showCard = function(suit,point,callback,callbackContext)
{
    this.visible = true;
    var sheetName;
    var frameName;
    var spriteName;
    switch(suit)
    {
        case PokerSuitEnum.Club:
            sheetName = SheetName.BigCard+0;
            frameName = SpriteName.Poker.BigClub+point;
            spriteName = SpriteName.Poker.BigClub;
            break;
        case PokerSuitEnum.Diamond:
            sheetName = SheetName.BigCard+1;
            frameName = SpriteName.Poker.BigDiamond+point;
            spriteName = SpriteName.Poker.BigDiamond;
            break;
        case PokerSuitEnum.Heart:
            sheetName = SheetName.BigCard+2;
            frameName = SpriteName.Poker.BigHeart+point;
            spriteName = SpriteName.Poker.BigHeart;
            break;
        case PokerSuitEnum.Spade:
            sheetName = SheetName.BigCard+3;
            frameName = SpriteName.Poker.BigSpade+point;
            spriteName = SpriteName.Poker.BigSpade;
            break;
        case PokerSuitEnum.Joker:
            sheetName = SheetName.BigCard+3;
            frameName = SpriteName.Poker.BigJoker+point;
            spriteName = SpriteName.Poker.BigJoker;
            break;
    }

    this.opencard.position.setTo(this.cardback.x,this.cardback.y);
    this.opencard.loadTexture(sheetName,spriteName+point);

    var cardPosX = this.opencard.x;
    var tweenA = this.game.add.tween(this.opencard).to({x: cardPosX + this.opencard.width/3}, 1000 , Phaser.Easing.Sinusoidal.Out);
    var tweenB = this.game.add.tween(this.opencard).to({x: cardPosX + 2*this.opencard.width/3}, 1000 , Phaser.Easing.Sinusoidal.In).delay(500);
    tweenB.onComplete.add(function()
    {
        this.game.time.events.add(800, function()
        {
            if(callback != null)
                callback.call(callbackContext);
        }, this);

    }, this);
    tweenA.chain(tweenB);
    tweenA.start();
};

PokerOpenWindow.prototype.close = function()
{
    if(this.opencard != null)
    {
        this.opencard.position.setTo(this.cardback.x,this.cardback.y);
    }

    this.visible = false;
};


