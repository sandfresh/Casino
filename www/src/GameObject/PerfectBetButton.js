PerfectBetButton = function (game, x, y, value, callback, callbackContext)
{
    BetButton.call(this, game, x, y, value, callback, callbackContext);

    this.coinScale = 0.6;
    this.coinshadow.scale.setTo(this.coinScale);
};

PerfectBetButton.prototype = Object.create(BetButton.prototype);
PerfectBetButton.prototype.constructor = BetButton;

PerfectBetButton.prototype.initial = function ()
{
    BetButton.prototype.initial.call(this);
    this.setEnable(true);
};

PerfectBetButton.prototype.getSpriteRecName = function ()
{
    var spriteRscName = {};
    var imageName;
    var sheetName;
    switch (this.bettype)
    {
        case BetTypeEnum.PerfectAngel.BetPAAngel:
            imageName = SpriteName.PerfectBet.BetPAAngel;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPAEvil:
            imageName = SpriteName.PerfectBet.BetPAEvil;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPABigAngel:
            imageName = SpriteName.PerfectBet.BetPABigAngel;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPABigEvil:
            imageName = SpriteName.PerfectBet.BetPABigEvil;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPAPerfectAngel:
            imageName = SpriteName.PerfectBet.BetPAPerfectAngel;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPAUnbeatenEvil:
            imageName = SpriteName.PerfectBet.BetPAUnbeatenEvil;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPATiePoint:
            imageName = SpriteName.PerfectBet.BetPATiePoint;
            sheetName = SheetName.PerfectBetButton;
            break;
        case BetTypeEnum.PerfectAngel.BetPABothNone:
            imageName = SpriteName.PerfectBet.BetPABothNone;
            sheetName = SheetName.PerfectBetButton;
            break;
    }

    spriteRscName.imageName = imageName;
    spriteRscName.sheetName = sheetName;

    return spriteRscName;
};