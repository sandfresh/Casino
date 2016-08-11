S7BetButton = function (game, x, y, value, callback, callbackContext)
{
    BetButton.call(this, game, x, y, value, callback, callbackContext);
    this.coinScale = 0.5;
    this.coinshadow.scale.setTo(this.coinScale);

    var style = {'font': 'bold 32px Arial', 'fill': 'white',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top" };
    this.oddsText = new Phaser.Text(game,0,0,"X 99.9",style);
    this.addChild(this.oddsText);
    this.oddsText.anchor.x = 0.5;
    this.oddsText.position.setTo(this.width/2,this.height*(1/3));
    this.oddsText.visible = false;
    this.oddsText.setShadow(4, 4, "#101010", 3);


    this.highOdds = new Phaser.Sprite(game,0,0,SheetName.Common,SpriteName.HighOdds+0);
    this.addChild(this.highOdds);
    this.highOdds.position.x = this.width/2;
    this.highOdds.position.y = this.height - this.highOdds.height*1.2 ;
    this.highOdds.visible = false;

    this.setChildIndex(this.cancelBtn,this.children.length-1);
    if(this.bettype == BetTypeEnum.Super7PK.S7PKRaise)
        this.betable = false;
};

S7BetButton.prototype = Object.create(BetButton.prototype);
S7BetButton.prototype.constructor = BetButton;

S7BetButton.prototype.getCoinPos = function ()
{
    var coin = new Coin(this.game, 0, 0, 1000);
    coin.setScale(this.coinScale);
    var coinPos = new Object();
    var coinposY = this.height - coin.height - this.height / 10;
    var coinposX = this.width / 3;
    switch (this.bettype)
    {
        case BetTypeEnum.Super7PK.S7PKRaise:
            coinposX = this.width * 0.5;
            break;
    }
    coinPos.x = coinposX;
    coinPos.y = coinposY;
    coin.destroy();
    return coinPos;
};

S7BetButton.prototype.setEnable = function (value)
{
    this.betable = value;
    if(this.bettype == BetTypeEnum.Super7PK.S7PKRaise)
        this.betable = false;
    if(this.betable)
    {
        if(this.bettype == BetTypeEnum.Super7PK.S7PKMain)
        {
            this.tint = 0xFFFFFF;
        }
        else
        {
            if(this.isHoverShow)
            {
                var rscName = this.getSpriteRecName();
                this.setFrames(rscName.imageName+1, rscName.imageName+0, rscName.imageName+0);
            }
            else
            {
                var rscName = this.getSpriteRecName();
                this.setFrames(rscName.imageName+0, rscName.imageName+0, rscName.imageName+0);
            }
        }
    }
    else
    {
        if(this.bettype == BetTypeEnum.Super7PK.S7PKMain)
        {
            this.tint = 0x808080;
        }
        else if(this.bettype == BetTypeEnum.Super7PK.S7PKRaise)
        {
            var rscName = this.getSpriteRecName();
            this.setFrames(rscName.imageName+0, rscName.imageName+0, rscName.imageName+0);
        }
        else
        {
            var rscName = this.getSpriteRecName();
            this.setFrames(rscName.imageName+2, rscName.imageName+2, rscName.imageName+2);
        }
    }
};
S7BetButton.prototype.setOddsText = function (value)
{
    this.oddsText.visible = true;
    this.oddsText.text = "X "+value;
}
S7BetButton.prototype.initial = function ()
{
    BetButton.prototype.initial.call(this);
    this.oddsText.text = "";
    this.oddsText.visible = false;
    this.setEnable(true);
    this.highOdds.visible = false;
};

S7BetButton.prototype.setNewStateBetValue = function (betValue)
{
    if(this.bettype != BetTypeEnum.Super7PK.S7PKRaise)
    {
        this.betCredit = betValue;
        this.showCoin(this.betCredit);
    }
    else
    {
        this.showCoin(betValue);
    }
};

S7BetButton.prototype.getSpriteRecName = function ()
{
    var spriteRscName = {};
    var imageName;
    var sheetName;
    switch (this.bettype)
    {
        case BetTypeEnum.Super7PK.S7PKRaise:
            imageName = SpriteName.S7Bet.S7PKRaise;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKNone:
            imageName = SpriteName.S7Bet.S7PKNone;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKMain:
            imageName = SpriteName.S7Bet.S7PKMain;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKOnePair:
            imageName = SpriteName.S7Bet.S7PKOnePair;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKTwoPair:
            imageName = SpriteName.S7Bet.S7PKTwoPair;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKTriple:
            imageName = SpriteName.S7Bet.S7PKTriple;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKStraight:
            imageName = SpriteName.S7Bet.S7PKStraight;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKFlush:
            imageName = SpriteName.S7Bet.S7PKFlush;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKFullHouse:
            imageName = SpriteName.S7Bet.S7PKFullHouse;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKFourOfAKind:
            imageName = SpriteName.S7Bet.S7PKFourOfAKind;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKStraightFlush:
            imageName = SpriteName.S7Bet.S7PKStraightFlush;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKFiveOfAKind:
            imageName = SpriteName.S7Bet.S7PKFiveOfAKind;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKRoyalFlush:
            imageName = SpriteName.S7Bet.S7PKRoyalFlush;
            sheetName = SheetName.S7BetButton;
            break;
        case BetTypeEnum.Super7PK.S7PKPureRoyalFlush:
            imageName = SpriteName.S7Bet.S7PKPureRoyalFlush;
            sheetName = SheetName.S7BetButton;
            break;
    }

    spriteRscName.imageName = imageName;
    spriteRscName.sheetName = sheetName;

    return spriteRscName;
};

S7BetButton.prototype.showHighOdds = function (value)
{
    this.highOdds.visible = value;
}

S7BetButton.prototype.getCoinPos = function ()
{
    var coin = new Coin(this.game, 0, 0, 1000);
    coin.setScale(this.coinScale);
    var coinPos = new Object();
    var coinposY = this.height - coin.height - this.height / 10;
    var coinposX = this.width / 3;

    if(this.bettype ==  BetTypeEnum.Super7PK.S7PKRaise)
    {
        coinposY =  this.height - coin.height;
        coinposX = this.width / 2;
    }
    coinPos.x = coinposX;
    coinPos.y = coinposY;
    coin.destroy();
    return coinPos;
};