BetButton = function (game, x, y, value, callback, callbackContext)
{
    this.betable = true;
    this.bettype = value;
    this.lastbetCredit;
    this.betCredit = 0;
    this.tmpConsumeCredit = 0;
    this.callback = callback;
    this.callbackContext = callbackContext;
    this.coinArray = new Array();
    this.gameScene = callbackContext;
    this.coinScale = 0.7;
    this.tmpConsumeCreditArray = [];
    this.isHoverShow = false;
    if (Phaser.Device.desktop)
        this.isHoverShow = true;
    else
        this.isHoverShow = false;

    var spriteRecName = this.getSpriteRecName();
    var sheetName = spriteRecName.sheetName;
    var imageName = spriteRecName.imageName;
    this.spriteName = imageName;
    Phaser.Button.call(this, game, x, y, sheetName, function ()
    {
        this.onBetClick();
    }, this, (this.isHoverShow == true ? imageName + 1 : imageName + 0), imageName + 0, imageName + 0, imageName + 0);


    var style = {
        'font': 'bold 30px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };
    this.betValueText = new Phaser.Text(this.game, 500, 650, "99999", style);
    this.betValueText.anchor.x = 0.5;
    this.betValueText.stroke = "#0A0030";
    this.betValueText.strokeThickness = 6;
    var grd = this.betValueText.context.createLinearGradient(0, 0, 0, this.betValueText.height);
    grd.addColorStop(0, '#FFDA00');
    grd.addColorStop(1, '#C37F0C');
    this.betValueText.fill = grd;
    this.addChild(this.betValueText);

    this.coinshadow = new Phaser.Sprite(game, 0, 0, SheetName.CoinSheet,SpriteName.CoinShadow);
    this.coinshadow.scale.setTo(this.coinScale);
    this.coinshadow.anchor.x = 0.5;
    this.addChild(this.coinshadow);
    this.coinshadow.visible = false;

    this.betValueText.position.setTo(this.getCoinPos().x, this.getCoinPos().y - 30);
    this.betValueText.visible = false;

    this.cancelBtn = new CancelButton(game, 0, 0, function ()
    {
        this.cancelBtn.visible = false;
        this.cancelTimer.stop(false);
        this.cancelBet();

    }, this);
    var cancelpos = this.getCancelPos();
    this.cancelBtn.position.setTo(cancelpos.x, cancelpos.y);
    this.addChild(this.cancelBtn);
    this.cancelBtn.visible = false;

    this.timerCount = 3;
    this.cancelTimer = this.game.time.create(false);
    this.cancelTimer.loop(1000, function ()
    {
        this.timerCount--;
        this.cancelBtn.setText(this.timerCount);
        if (this.timerCount <= 0)
        {
            this.cancelTimer.stop(false);
            this.sendConsumeInfo();
            this.cancelBtn.visible = false;
        }
    }, this);
};

BetButton.prototype = Object.create(Phaser.Button.prototype);
BetButton.prototype.constructor = BetButton;

BetButton.prototype.setEnable = function (value)
{
    this.betable = value;
    if (this.betable)
        this.tint = 0xFFFFFF;
    else
        this.tint = 0x808080;
};

BetButton.prototype.showBlinkEffect = function ()
{
    if (this.bettype == BetTypeEnum.Special)
    {
        this.counter = 0;
        this.blinkTimer.pause();
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.2, 6, function ()
        {
            this.frameName = (this.frameName == this.spriteName+0 ? this.spriteName+1 : this.spriteName+0);

            if (++this.counter >= 6)
                this.blinkTimer.resume();
        }, this);
    }
    else
    {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.3, 6, function ()
        {
            this.frameName = (this.frameName == this.spriteName+0 ? this.spriteName+1 : this.spriteName+0);
        }, this);
    }
}

/**
 * Send the json of the bet Consumption to server
 */

BetButton.prototype.sendConsumeInfo = function ()
{
    var ret = {};
    this.cancelTimer.stop(false);
    this.cancelBtn.visible = false;

    if (this.tmpConsumeCreditArray.length > 0)
    {
        var consumeInfo = this.tmpConsumeCreditArray[this.tmpConsumeCreditArray.length - 1];
        if (consumeInfo.TransactionState == TransactionState.Hold)
        {
            consumeInfo.TransactionState = TransactionState.InProgress;
            ret[WebSocketNameTag.ID] = consumeInfo.UID;
            ret[WebSocketNameTag.GameID] = this.gameScene.gameID;
            ret[WebSocketNameTag.TimeStamp] = util.getTimeStamp();
            ret[WebSocketNameTag.MessageType] = MessageNameTag.PlayerBet;

            ret[WebSocketNameTag.GameRound] = this.gameScene.gameRound;
            ret[WebSocketNameTag.BetType] = consumeInfo.betType;
            ret[WebSocketNameTag.BetAmount] = consumeInfo.creditValue;
            ret[WebSocketNameTag.TotalBetAmount] = this.betCredit + consumeInfo.creditValue;
            var retjson = JSON.stringify(ret);
            Client.getInstance().sendMessage(retjson);
        }
    }
};

/**
 * Confirm the  consummation result from server
 */
BetButton.prototype.confirmConsume = function (id, isReturnSuccess, totalBetAmount)
{
    for (var i = 0; i < this.tmpConsumeCreditArray.length; i++)
    {
        var consumeinfo = this.tmpConsumeCreditArray[i];
        if (consumeinfo.UID == id)
        {
            consumeinfo.TransactionState = TransactionState.Done;
            this.removeTempConsume(id);
            if (isReturnSuccess == true)
            {
                this.setRealCredit(totalBetAmount);
            }
            break;
        }
    }
}

/**
 * Create the credit coin on bet button.
 */

BetButton.prototype.showCoin = function (coinValue)
{
    for (var i = 0; i < this.coinArray.length; i++)
    {
        this.coinArray[i].destroy();
    }
    this.coinArray.length = 0;

    var coin10k = Math.floor(coinValue / 10000);
    var coin5k = Math.floor((coinValue % 10000) / 5000);
    var coin1k = Math.floor((coinValue % 5000) / 1000);
    var coin5h = Math.floor((coinValue % 1000) / 500);
    var coin1h = Math.floor((coinValue % 500) / 100);
    var coin50 = Math.floor((coinValue % 100) / 50);
    var coin10 = Math.floor((coinValue % 50) / 10);
    var coin5 = Math.floor((coinValue % 10) / 5);

    var coincounter = 0;
    var coinlimit = 5;
    var coin;
    for (var i = 0; (i < coin10k) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 10000);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin5k) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 5000);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin1k) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 1000);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin5h) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 500);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin1h) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 100);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin50) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 50);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin10) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 10);
        this.coinArray.push(coin);
        coincounter++;
    }
    for (var i = 0; (i < coin5) && (coincounter < coinlimit); i++)
    {
        coin = new Coin(this.game, 0, 0, 5);
        this.coinArray.push(coin);
        coincounter++;
    }

    for (var key in this.coinArray)
        this.coinArray[key].setScale(this.coinScale);

    if (coincounter > 0)
    {
        var coinposX = 0;
        var coinposY = this.height - coin.height - this.height / 10;

        var coinPos = this.getCoinPos();
        coinposX = coinPos.x;
        coinposY = coinPos.y;

        for (var i = 0; i < this.coinArray.length; i++)
        {
            this.coinArray[i].position.setTo(coinposX, coinposY);
            this.coinArray[i].y = this.coinArray[i].y - 8 * i;
            this.coinArray[i].anchor.setTo(0.5, 0);
            this.addChild(this.coinArray[i]);
        }
    }
    if (this.coinArray.length > 0)
    {
        this.coinshadow.position.setTo(this.coinArray[0].x, this.coinArray[0].y + this.coinshadow.height*0.5);
    }
    this.coinshadow.visible = coinValue > 0 ? true : false;
    this.betValueText.y = this.getCoinPos().y - (30 + this.coinArray.length * 10);
    this.betValueText.visible = coinValue > 0 ? true : false;
    this.betValueText.text = util.numberWithCommas(coinValue);
};

/**
 * This button click event.
 * Click adn return click result.
 */
BetButton.prototype.onBetClick = function ()
{
    var ret = BetStateEnum.Betable;
    if (BasicGame.currentCoin <= 0 || this.betable == false)
        ret = BetStateEnum.Unbetable;
    else if (this.betable == true)
    {
        if ((GameMgr.getInstance().credit - GameMgr.getInstance().hold) >= BasicGame.currentCoin)
        {
            this.addTempConsume(BasicGame.currentCoin);

            this.timerCount = 3;
            this.cancelBtn.setText(this.timerCount);
            this.cancelTimer.start();

            this.cancelBtn.visible = true;
            ret = BetStateEnum.Betable;
        }
        else
        {
            ret = BetStateEnum.Insufficient;
        }
    }
    else
    {
        ret = BetStateEnum.Unbetable;
    }
    this.callback.call(this.callbackContext, ret, this.bettype);
};

/**
 * Cancel the bet and remove consumption object from array.
 */

BetButton.prototype.cancelBet = function ()
{
    for (var i = this.tmpConsumeCreditArray.length - 1; i >= 0; i--)
    {
        var consumeInfo = this.tmpConsumeCreditArray[i];
        if (consumeInfo.TransactionState == TransactionState.Hold)
        {
            this.removeTempConsume(consumeInfo.UID);
        }
    }

    var ret = this.tmpConsumeCredit;
    return ret;
};

BetButton.prototype.getBetContent = function ()
{
    var betContent = {
        type: this.bettype,
        value: (this.betCredit + this.tmpConsumeCredit)
    };
    return betContent;
};

/**
 * Bet last time bet credit.
 */
BetButton.prototype.betLastValue = function ()
{
    this.addTempConsume(this.lastbetCredit);
};

/**
 * Add Consumption object from array.
 */
BetButton.prototype.addTempConsume = function (credit)
{
    if (this.tmpConsumeCreditArray.length > 0)
    {
        var consumeObj = this.tmpConsumeCreditArray[this.tmpConsumeCreditArray.length - 1];
        if (consumeObj.TransactionState == TransactionState.Hold)
        {
            consumeObj.addValue(credit);
            this.addTempCredit(credit);
        }
        else
        {
            var consumeObj = new ConsumeCreditInfo(this.bettype, credit);
            this.tmpConsumeCreditArray.push(consumeObj);
            this.addTempCredit(consumeObj.creditValue);
        }
    }
    else
    {
        var consumeObj = new ConsumeCreditInfo(this.bettype, credit);
        this.tmpConsumeCreditArray.push(consumeObj);
        this.addTempCredit(consumeObj.creditValue);
    }

};

/**
 * Remove temporary Consumption object from array
 */

BetButton.prototype.removeTempConsume = function (id)
{
    for (var i = 0; i < this.tmpConsumeCreditArray.length; i++)
    {
        var consumeInfo = this.tmpConsumeCreditArray[i]
        if (id == consumeInfo.UID && (consumeInfo.TransactionState != TransactionState.InProgress))
        {
            this.addTempCredit(-consumeInfo.creditValue);
            this.tmpConsumeCreditArray.splice(i, 1);
            return true;
        }
    }
    return false;
};

/**
 * Modify the actual credit value
 */

BetButton.prototype.setRealCredit = function (value)
{
    this.betCredit = Number(value);
    window.console.log("BetRealCredit:" + this.betCredit + "," + "BetTempCredit:" + this.tmpConsumeCredit);
    this.showCoin(this.betCredit + this.tmpConsumeCredit);
};

/**
 * Modify the temporary credit value
 */

BetButton.prototype.addTempCredit = function (value)
{
    this.tmpConsumeCredit += Number(value);
    GameMgr.hold += Number(value);
  //  window.console.log("BetRealCredit:" + this.betCredit + "," + "BetTempCredit:" + this.tmpConsumeCredit);
    this.showCoin(this.betCredit + this.tmpConsumeCredit);
};

/**
 * Start new round ,init value with default.
 */

BetButton.prototype.initial = function ()
{
    if (this.betCredit != 0)
        this.lastbetCredit = this.betCredit;
    else
        this.lastbetCredit = 0;
    this.tmpConsumeCreditArray.length = 0;
    this.tmpConsumeCredit = 0;
    this.betCredit = 0;
    this.showCoin(0);
};

/**
 * When player enter game and  the round is same as last time, set credit value
 */

BetButton.prototype.setNewStateBetValue = function (betValue)
{
    this.betCredit = betValue;
    this.showCoin(this.betCredit);
};

BetButton.prototype.getCoinPos = function ()
{
    var coin = new Coin(this.game, 0, 0, 1000);
    coin.setScale(this.coinScale);
    var coinPos = new Object();
    var coinposY = this.height - coin.height - this.height / 10;
    var coinposX = this.width / 3;
    coinPos.x = coinposX;
    coinPos.y = coinposY;
    coin.destroy();
    return coinPos;
};

BetButton.prototype.getCancelPos = function ()
{
    var cancelBtnPos = this.getCoinPos();
    var cancelBtnWidth = this.cancelBtn.width;
    var cancelBtnHeight = this.cancelBtn.height;
    cancelBtnPos.x += this.cancelBtn.width / 2;
    return cancelBtnPos;
}

BetButton.prototype.getSpriteRecName = function ()
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

BetBar = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Common, SpriteName.BetBar);
    game.add.existing(this);
    this.style = {
        'font': '34px Arial',
        'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };
    this.label = new Phaser.Text(game, this.width / 2 - 10, this.height / 2, "0", this.style);
    this.label.anchor.x = 1;
    this.label.anchor.y = 0.5;
    this.addChild(this.label);
}

BetBar.prototype = Object.create(Phaser.Sprite.prototype);
BetBar.prototype.constructor = BetBar;

BetBar.prototype.setValue = function (value)
{
    var newvalue = util.numberWithCommas(value);
    this.label.text = "" + newvalue;
};

function ConsumeCreditInfo(betType, creditValue)
{
    this.betType = betType;
    this.creditValue = creditValue;
    this.UID = util.getGuid();
    this.TransactionState = TransactionState.Hold;
}

var TransactionState =
{
    Hold: 0,
    InProgress: 1,
    Done: 2,
}

ConsumeCreditInfo.prototype.constructor = ConsumeCreditInfo;
ConsumeCreditInfo.prototype.addValue = function (value)
{
    this.creditValue += Number(value);
}


CancelButton = function (game, x, y, callback, callbackContext)
{
    Phaser.Button.call(this, game, 0, 0, SheetName.Button, callback, callbackContext,
        SpriteName.Button.SmallCancelButton+0,
        SpriteName.Button.SmallCancelButton+0,
        SpriteName.Button.SmallCancelButton+1,
        SpriteName.Button.SmallCancelButton+0);

    var style = {font: "bold 36px Arial", fill: "#000000", boundsAlignH: "center", boundsAlignV: "top"};
    this.btnText = new Phaser.Text(game, this.width - 5, this.height / 2 + 2, "3", style);
    this.btnText.anchor.y = 0.5;
    this.btnText.anchor.x = 1;
    this.addChild(this.btnText);
}

CancelButton.prototype = Object.create(Phaser.Button.prototype);
CancelButton.prototype.constructor = CancelButton;

CancelButton.prototype.setText = function (text)
{
    this.btnText.text = text;
}