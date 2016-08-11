Poker = function (game, x, y)
{
    Phaser.Sprite.call(this, game);

    this.flipTime = 300;
    this.scaleValue = 1;
    this.suit = -1;
    this.point = -1;

    this.cardshadow = new Phaser.Sprite(game, x, y + 5, SheetName.SmallCard, SpriteName.Poker.SmallCardShadow);
    this.cardshadow.anchor.setTo(0.5, 0.5);
    this.addChild(this.cardshadow);

    this.cardhalo = new Phaser.Sprite(game, x, y, SheetName.SmallCard, SpriteName.Poker.SmallCardHalo);
    this.cardhalo.anchor.setTo(0.5, 0.5);
    this.addChild(this.cardhalo);
    this.cardhalo.visible = false;

    game.add.tween(this.cardhalo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.cardback = new Phaser.Sprite(game, x, y, SheetName.SmallCard, SpriteName.Poker.SmallCardBack);
    this.cardback.anchor.setTo(0.5, 0.5);
    this.addChild(this.cardback);

    this.cardfront = new Phaser.Sprite(game, x, y, SheetName.SmallCard, SpriteName.Poker.SimpleHeart + 12);
    this.cardfront.anchor.setTo(0.5, 0.5);
    this.cardfront.scale.x = 0;
    this.cardfront.scale.y = this.scaleValue;
    this.addChild(this.cardfront);
};

Poker.prototype = Object.create(Phaser.Sprite.prototype);
Poker.prototype.constructor = Poker;

Poker.prototype.update = function ()
{

};

Poker.prototype.setCard = function (suit, point)
{
    this.suit = suit;
    this.point = point;
    var frameName = "";
    var spriteName = "";
    var sheetName = SheetName.SmallCard;
    switch (suit)
    {
        case PokerSuitEnum.Club:
            frameName = SpriteName.Poker.SimpleClub;
            spriteName = SpriteName.Poker.SimpleClub;
            break;
        case PokerSuitEnum.Diamond:
            frameName = SpriteName.Poker.SimpleDiamond;
            spriteName = SpriteName.Poker.SimpleDiamond;
            break;
        case PokerSuitEnum.Heart:
            frameName = SpriteName.Poker.SimpleHeart;
            spriteName = SpriteName.Poker.SimpleHeart;
            break;
        case PokerSuitEnum.Spade:
            frameName = SpriteName.Poker.SimpleSpade;
            spriteName = SpriteName.Poker.SimpleSpade;
            break;
        case PokerSuitEnum.Joker:
            frameName = SpriteName.Poker.SimpleJoker;
            spriteName = SpriteName.Poker.SimpleJoker;
            break;
    }

    this.cardfront.loadTexture(sheetName, spriteName + point);
};

Poker.prototype.setScale = function (value)
{
    this.scaleValue = value;
    this.cardback.scale.setTo(value);
    this.cardfront.scale.y = value;
    this.cardshadow.scale.setTo(value);
    this.cardhalo.scale.setTo(value);
}

Poker.prototype.getWidth = function ()
{
    return  this.cardback.width;
}

Poker.prototype.getHeight = function ()
{
    return  this.cardback.height;
}

Poker.prototype.showCard = function (smooth,callback,callbackContext)
{
    if (smooth == null)
        smooth = false;
    if (smooth)
    {
        this.cardshadow.visible = false;
        this.game.add.tween(this.cardback.scale).to({
            x: 0,
            y: this.scaleValue
        }, this.flipTime, Phaser.Easing.Default, true);
        this.tween = this.game.add.tween(this.cardfront.scale).to({
            x: this.scaleValue,
            y: this.scaleValue
        }, this.flipTime, Phaser.Easing.Default, true, this.flipTime);
        this.tween.onComplete.add(function ()
        {
            this.cardshadow.visible = true;
            if(callback != null)
                callback.call(callbackContext);
        }, this);
    }
    else
    {
        this.cardback.scale.setTo(0, this.scaleValue);
        this.cardfront.scale.setTo(this.scaleValue, this.scaleValue);
    }
};

Poker.prototype.showHalo = function (value)
{
    this.cardhalo.visible = value;
}

Poker.prototype.showBlackMask = function (value)
{
    if (value)
        this.cardfront.tint = 0x606060;
    else
        this.cardfront.tint = 0xffffff;
}

Poker.prototype.initial = function ()
{
    this.cardfront.scale.setTo(0, this.scaleValue);
    this.cardback.scale.setTo(this.scaleValue, this.scaleValue);
    this.suit = -1;
    this.point = -1;
    this.cardfront.tint = 0xffffff;

    if(this.tween != null)
    {
        this.tween.stop(true);
        this.tween = null;
    }

};
//Pass  suit point value
Poker.prototype.isCardEqual = function (object)
{

    var point = object[0];
    var suit = object[1];

    switch (suit)
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

    switch (point)
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

    if (this.suit == suit && this.point == point)
    {

        return true;
    }
    else
        return false;
}
Poker.prototype.setCardByObj = function (object)
{
    var point = object[0];
    var suit = object[1];

    // joker: Jj ,Joker has two kind of suit, one is q, the other one is j.
    //Normal :2d
    switch (suit)
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
    switch (point)
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

    this.setCard(suit, point);
};

Poker.prototype.isOpen = function ()
{
    if (this.point != -1)
        return true;
    else
        return false;
}