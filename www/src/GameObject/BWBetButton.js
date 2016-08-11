/**
 * Created by Maxpain on 2016/7/21.
 */

BWBetButton = function (game, x, y, value, callback, callbackContext)
{
    BetButton.call(this, game, x, y, value, callback, callbackContext);

    if (this.bettype == BetTypeEnum.Special)
    {
        this.blinkTimer = game.time.create(false);
        this.blinkTimer.loop(1000, function ()
        {
            this.frameName = (this.frameName == this.spriteName+0 ? this.spriteName+1 : this.spriteName+0);
        }, this);
        this.blinkTimer.start();

        if (this.isHoverShow == true)
        {
            this.onInputOver.add(function ()
            {
                this.blinkTimer.pause();
            }, this);
            this.onInputOut.add(function ()
            {
                this.blinkTimer.resume();
            }, this);
        }
        else
        {
            this.onInputDown.add(function ()
            {
                this.blinkTimer.pause();
            }, this);
            this.onInputUp.add(function ()
            {
                this.blinkTimer.resume();
            }, this);
        }
    }

    this.coinScale = 0.7;
    this.coinshadow.scale.setTo(this.coinScale);
};

BWBetButton.prototype = Object.create(BetButton.prototype);
BWBetButton.prototype.constructor = BetButton;

BWBetButton.prototype.getCoinPos = function ()
{
    var coin = new Coin(this.game, 0, 0, 1000);
    coin.setScale(this.coinScale);
    var coinPos = new Object();
    var coinposY = this.height - coin.height - this.height / 10;
    var coinposX = this.width /3;
    switch (this.bettype)
    {
        case BetTypeEnum.BigWin.Special:
        case BetTypeEnum.BigWin.Draw:
            coinposX = this.width * 0.2;
            break;
        case BetTypeEnum.BigWin.Player:
        case BetTypeEnum.BigWin.PlayerPair:
            coinposX = this.width * 0.3;
            break;
        case BetTypeEnum.BigWin.Banker:
        case BetTypeEnum.BigWin.BankerPair:
            coinposX = this.width * 0.7;
            break;
    }
    coinPos.x = coinposX;
    coinPos.y = coinposY;
    coin.destroy();
    return coinPos;
};

BWBetButton.prototype.getCancelPos = function ()
{
    var cancelBtnPos = this.getCoinPos();
    var cancelBtnWidth = this.cancelBtn.width;
    var cancelBtnHeight =  this.cancelBtn.height;

    switch (this.bettype)
    {
        case BetTypeEnum.BigWin.Special:
            cancelBtnPos.x = cancelBtnPos.x + cancelBtnWidth / 2;
            cancelBtnPos.y = cancelBtnPos.y - cancelBtnHeight *(2/3);
            break;
        case BetTypeEnum.BigWin.Draw:
            cancelBtnPos.x = cancelBtnPos.x + cancelBtnWidth / 2;
            cancelBtnPos.y = cancelBtnPos.y - cancelBtnHeight *(2/3);
            break;
        case BetTypeEnum.BigWin.Player:
        case BetTypeEnum.BigWin.PlayerPair:
            cancelBtnPos.x = cancelBtnPos.x + cancelBtnWidth / 2;
            break;
        case BetTypeEnum.BigWin.Banker:
        case BetTypeEnum.BigWin.BankerPair:
            cancelBtnPos.x = cancelBtnPos.x - cancelBtnWidth * 1.5;
            break;
        default :
            cancelBtnPos.x +=  this.cancelBtn.width /2;
            break;
    }
    return cancelBtnPos;
}
BWBetButton.prototype.getSpriteRecName = function ()
{
    var spriteRscName = {};
    var imageName;
    var sheetName;

    switch (this.bettype)
    {
        case BetTypeEnum.BigWin.Special:
            imageName = SpriteName.BWBet.BWSpecial;
            sheetName = SheetName.BWBetButton;
            break;
        case BetTypeEnum.BigWin.Draw:
            imageName = SpriteName.BWBet.BWDraw;
            sheetName = SheetName.BWBetButton;
            break;
        case BetTypeEnum.BigWin.Player:
            imageName = SpriteName.BWBet.BWPlayer;
            sheetName = SheetName.BWBetButton;
            break;
        case BetTypeEnum.BigWin.PlayerPair:
            imageName = SpriteName.BWBet.BWPlayerPair;
            sheetName = SheetName.BWBetButton;
            break;
        case BetTypeEnum.BigWin.Banker:
            imageName = SpriteName.BWBet.BWBanker;
            sheetName = SheetName.BWBetButton;
            break;
        case BetTypeEnum.BigWin.BankerPair:
            imageName = SpriteName.BWBet.BWBankerPair;
            sheetName = SheetName.BWBetButton;
            break;
    }

    spriteRscName.imageName = imageName;
    spriteRscName.sheetName = sheetName;

    return spriteRscName;
};
