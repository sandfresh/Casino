/* jshint browser:true */

// create Game function in BasicGame
BasicGame.BigWin = function (game)
{
};

// set Game function prototype
BasicGame.BigWin.prototype = {


    preload: function ()
    {
    }
    ,
    //Init  Game Value
    init: function ()
    {
        this.currentState = -2;

        this.gameRound = -1;
        this.gameType = GameSceneEnum.BigWin;
        this.betStateObjArray = [];
        this.betArray = [];
        this.coinbtnArray = [];

        this.prepareSendBetType = -1;
        this.lastBetType = -1;
        this.isFirstGame = true;
        this.isRefresh = false;
        this.isFirstBlink = true;
        this.lastProability;
        this.clearBonusTwoPair = false;
        this.clearBonusTripple = false;
        this.client = Client.getInstance();
    }
    ,

//*************************************************************************************************************

    //Create Game Object
    create: function ()
    {
        if (CustomConfig.DebugMode == true)
            this.game.time.advancedTiming = true;

        var background = this.add.sprite(0, 0, SheetName.BigWinMain, SpriteName.Background);
        background.width = this.game.width;
        background.height = this.game.height;

        this.menuBtn = new Phaser.Button(this.game, 50, 15, SheetName.System,
            function ()
            {
                this.infoMenu.showMenu();
            },
            this, SpriteName.MenuButton + 0, SpriteName.MenuButton + 0, SpriteName.MenuButton + 1);
        this.add.existing(this.menuBtn);

        this.cashBar = new CashBar(this.game, 1445, 10);
        this.add.existing(this.cashBar);

        this.roundBar = new RoundBar(this.game, 190, 20);
        this.add.existing(this.roundBar);

        this.table = this.add.sprite(0, 0, SheetName.BigWinMain, SpriteName.BetTable);
        this.table.position.y = this.game.height - this.table.height;

        this.cardTable = new CardTable(this.game, 0, 0);
        this.add.existing(this.cardTable);
        this.cardTable.y = 1080 - this.cardTable.height;

        this.dealer = this.add.sprite(715, 40, SheetName.BigWinMain, SpriteName.Dealer + 0);

        this.oddsInfo = new HandPercentWindow(this.game, 35, 80);
        this.add.existing(this.oddsInfo);
        this.betinfo = new BetInfoWindow(this.game, 1250, 80);
        this.add.existing(this.betinfo);
        this.oddsInfo.visible = false;
        this.oddsWindow = new BWOddsWindow(this.game, 35, 80);
        this.add.existing(this.oddsWindow);

        this.help = this.add.button(25, 960, SheetName.Button, function ()
        {
            this.tutorialMenu.openWindow();
        }, this, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 1);
        this.againbtn = this.add.button(1740, 975, SheetName.Button, function ()
        {
            this.onAgainClick();
        }, this, SpriteName.Button.AgainButton + 0, SpriteName.Button.AgainButton + 0, SpriteName.Button.AgainButton + 1);
        this.againbtn.visible = false;

//*************************************************************************************************************
        var betCallback = function (betRetValue, betType)
        {
            this.againbtn.visible = false;
            if (betRetValue == BetStateEnum.Betable)
            {
                if (betType != this.lastBetType && (this.lastBetType != -1))
                {
                    this.sendConsumeInfo(this.prepareSendBetType);
                }
                this.prepareSendBetType = betType;
                this.lastBetType = betType;
            }
            if (betRetValue == BetStateEnum.Insufficient)
            {
                this.showMessage(GameMessageEnum.Insufficient);
            }
        };
        this.specialbtn = new BWBetButton(this.game, 0, 0, BetTypeEnum.BigWin.Special, betCallback, this);
        this.add.existing(this.specialbtn);
        this.specialbtn.position.setTo(780, 540);
        this.betArray.push(this.specialbtn);

        this.drawbtn = new BWBetButton(this.game, this.table.width / 2, 705, BetTypeEnum.BigWin.Draw, betCallback, this);
        this.add.existing(this.drawbtn);
        this.drawbtn.position.setTo(765, 700);
        this.betArray.push(this.drawbtn);

        this.bankerbtn = new BWBetButton(this.game, 1120, 545, BetTypeEnum.BigWin.Banker, betCallback, this);
        this.add.existing(this.bankerbtn);
        this.bankerbtn.position.setTo(1120, 545);
        this.betArray.push(this.bankerbtn);

        this.bankerpairbtn = new BWBetButton(this.game, 1520, 600, BetTypeEnum.BigWin.BankerPair, betCallback, this);
        this.add.existing(this.bankerpairbtn);
        this.bankerpairbtn.position.setTo(1520, 600);
        this.betArray.push(this.bankerpairbtn);

        this.playerbtn = new BWBetButton(this.game, 330, 545, BetTypeEnum.BigWin.Player, betCallback, this);
        this.add.existing(this.playerbtn);
        this.playerbtn.position.setTo(330, 545);
        this.betArray.push(this.playerbtn);

        this.playerpairbtn = new BWBetButton(this.game, 10, 600, BetTypeEnum.BigWin.PlayerPair, betCallback, this);
        this.add.existing(this.playerpairbtn);
        this.playerpairbtn.position.setTo(10, 610);
        this.betArray.push(this.playerpairbtn);

        this.highOddsBtn = this.add.button(1000, 605, SheetName.Common, function ()
        {
            if (this.speicalOddsBtn.visible == false)
                this.speicalOddsBtn.visible = true;

        }, this, SpriteName.HighOdds + 0, SpriteName.HighOdds + 0, SpriteName.HighOdds + 1);
        this.betStateObjArray.push(this.highOddsBtn);
        this.speicalOddsBtn = this.add.button(1000, 300, SheetName.BigWinMain, function ()
        {
            this.speicalOddsBtn.visible = false;
        }, this, SpriteName.SpecialOddsReference, SpriteName.SpecialOddsReference, SpriteName.SpecialOddsReference);

        this.speicalOddsBtn.visible = false;
        this.betStateObjArray.push(this.speicalOddsBtn);

//*************************************************************************************************************

        var coincallback = function ()
        {
            for (var i = 0; i < this.coinbtnArray.length; i++)
                this.coinbtnArray[i].release();
        };
        var coinbtn = new CoinButton(this.game, 0, 0, CoinEnum.Coin5, coincallback, this);
        this.coinbtnArray[0] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 0, 0, CoinEnum.Coin500, coincallback, this);
        this.coinbtnArray[1] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 0, 0, CoinEnum.Coin1k, coincallback, this);
        this.coinbtnArray[2] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 0, 0, CoinEnum.Coin5k, coincallback, this);
        this.coinbtnArray[3] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 0, 0, CoinEnum.Coin10k, coincallback, this);
        this.coinbtnArray[4] = coinbtn;
        this.game.add.existing(coinbtn);

        for (var i = 0; i < this.coinbtnArray.length; i++)
        {
            this.coinbtnArray[i].position.setTo(600 + 180 * i, 1025);
        }

//*************************************************************************************************************


        this.counter = new Counter(this.game, 830, 280);
        this.add.existing(this.counter);
        this.counter.setValue(0);
        this.counter.visible = false;
        this.counter.setCallback(function ()
        {
            for (var key in this.betArray)
            {
                this.betArray[key].sendConsumeInfo();
                this.betArray[key].setEnable(false);
            }

            this.showMessage(GameMessageEnum.StopBet);

            this.counter.visible = false;
        }, this);

        this.gamemessage = new GameMessage(this.game, 0, 0);
        this.gamemessage.position.x = (this.game.width - this.gamemessage.width) / 2;
        this.add.existing(this.gamemessage);

        this.pokerOpenEffect = new PokerOpenWindow(this.game);
        this.add.existing(this.pokerOpenEffect);
        this.pokerOpenEffect.close();

        this.winEffect = new WinEffect(this.game, 200, 200);
        this.add.existing(this.winEffect);
        this.winEffect.scale.setTo(0.5);
        this.winEffect.visible = false;

        this.specialWinEffect = new SpecialWinEffect(this.game, 0, 0);
        this.add.existing(this.specialWinEffect);
        this.specialWinEffect.hide();

        this.infoMenu = new InfoMenu(this.game, 0, 0, this.exitScene, this);
        this.add.existing(this.infoMenu);
        this.infoMenu.closeMenu();

        //this.setting = new SettingWindow(this.game, 0, 0);
        //this.add.existing(this.setting);

        this.tutorialMenu = new TutorialWindow(this.game, GameTypeNameTag.BigWin);
        this.add.existing(this.tutorialMenu);
        this.tutorialMenu.closeWindow();
        this.client.setCallBack(this.handleCmd, this);
        this.game.onFocus.add(this.onFocus, this);
        this.game.onBlur.add(this.onBlur, this);

        this.oddsWindow.blinkIndex(WinnerNameTag.BigWin.WSBWStraight);
        GameMgr.getInstance().registerListener(function ()
        {
            this.updateUI();
        }, this);

        this.selectCoin(CoinEnum.Coin1k);
        this.selectState(GameStateNameTag.NonState);
        this.updateUI();


    }
    ,
//*************************************************************************************************************
    update: function ()
    {
    }
    ,
    gameResized: function (width, height)
    {
        // This could be handy if you need to do any extra processing if the
        // game resizes. A resize could happen if for example swapping
        // orientation on a device or resizing the browser window. Note that
        // this callback is only really useful if you use a ScaleMode of RESIZE
        // and place it inside your main game state.
    }
    ,
    selectState: function (value)
    {
        if (this.currentState == value)
            return;
        switch (value)
        {
            case GameStateNameTag.NonState:
                this.onNonState();
                break;
            case GameStateNameTag.BigWin.NewRoundState:
                this.onNewState();
                break;
            case GameStateNameTag.BigWin.StartBetState:
                this.onStartState();
                break;
            case GameStateNameTag.BigWin.EndBetState:
                this.onEndBetState();
                break;
            case GameStateNameTag.BigWin.OpenState:
                this.onOpenState();
                break;
            case GameStateNameTag.BigWin.EndRoundState:
                this.onEndRoundState();
                break;
            default:
                break;
        }
        this.currentState = value;
    }
    ,
    onNonState: function ()
    {
        window.console.log("NonState");
        this.cardTable.visible = false;
        for (var key in this.betArray)
            this.betArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.betStateObjArray)
            this.betStateObjArray[key].visible = false;

        this.dealer.frameName = SpriteName.Dealer + 0;
        this.highOddsBtn.visible = false;
        this.speicalOddsBtn.visible = false;
        this.winEffect.visible = false;
        this.specialWinEffect.hide();
        this.oddsWindow.visible = true;
        this.oddsInfo.visible = false;
        this.oddsInfo.initial();
        this.counter.visible = false;
        this.counter.stop();
        this.cardTable.initial();
        this.pokerOpenEffect.close();
        this.betinfo.initial();
        this.oddsWindow.initial();
        this.gamemessage.hide();
    }
    ,
    onNewState: function ()
    {
        for (var key in this.betArray)
        {
            this.betArray[key].visible = true;
            this.betArray[key].setEnable(false);
            this.betArray[key].initial();
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;

        for (var key in this.betStateObjArray)
        {
            this.betStateObjArray[key].visible = true;
        }
        this.dealer.frameName = SpriteName.Dealer + 0;

        this.betinfo.showWindow(BetInfoEnum.HistoryInfo);
        this.highOddsBtn.visible = true;
        this.oddsWindow.visible = true;
        this.oddsInfo.visible = false;
        this.oddsInfo.initial();
        this.cardTable.visible = false;
        this.speicalOddsBtn.visible = false;
        this.counter.visible = false;
        this.winEffect.visible = false;
        this.specialWinEffect.hide();

        this.pokerOpenEffect.close();
        this.betinfo.initial();
        this.oddsWindow.initial();
        this.cardTable.initial();

        if (this.clearBonusTripple == true)
        {
            this.betinfo.setBonusValue(BonusNameTag.BonusTripple, 0);
            this.clearBonusTripple = false;
        }
        if (this.clearBonusTwoPair == true)
        {
            this.betinfo.setBonusValue(BonusNameTag.BonusTwoPair, 0);
            this.clearBonusTwoPair = false;
        }

        this.gamemessage.hide();
    }
    ,
    onStartState: function ()
    {
        for (var key in this.betArray)
        {
            this.betArray[key].visible = true;
            this.betArray[key].setEnable(true);

            if (this.isFirstBlink)
                this.betArray[key].showBlinkEffect();
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = true;
        for (var key in this.betStateObjArray)
            this.betStateObjArray[key].visible = true;
        var totalLastBetValue = 0;
        for (var i = 0; i < this.betArray.length; i++)
            totalLastBetValue += Number(this.betArray[i].lastbetCredit);
        this.againbtn.visible = (totalLastBetValue > 0 ? true : false);

        this.betinfo.showWindow(BetInfoEnum.HistoryInfo);
        this.oddsWindow.visible = true;
        this.oddsInfo.visible = false;
        this.speicalOddsBtn.visible = false;
        this.cardTable.visible = false;
        this.counter.visible = true;
        this.counter.stop();
        this.gamemessage.hide();
    }
    ,
    onEndBetState: function ()
    {
        for (var key in this.betArray)
        {
            this.betArray[key].visible = false;
            this.betArray[key].betalbe = false;
            this.betArray[key].sendConsumeInfo();
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;

        for (var key in this.betStateObjArray)
            this.betStateObjArray[key].visible = false;

        this.cardTable.initial();
        this.cardTable.showHalo(CardTargetEnum.Player, 0);

        this.betinfo.showWindow(BetInfoEnum.BetInfo);
        this.oddsWindow.visible = false;
        this.oddsInfo.visible = true;
        this.cardTable.visible = true;
        this.speicalOddsBtn.visible = false;
        this.againbtn.visible = false;
        this.betinfo.showSettleValue(false);

        this.counter.visible = false;
        this.counter.stop();
        this.gamemessage.hide();
    }
    ,
    onOpenState: function ()
    {
        this.cardTable.visible = true;
        this.cardTable.initial();
        for (var key in this.betArray)
        {
            this.betArray[key].visible = false;
            this.betArray[key].betalbe = false;
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;

        for (var key in this.betStateObjArray)
            this.betStateObjArray[key].visible = false;

        this.oddsWindow.visible = false;
        this.oddsInfo.visible = true;
        this.betinfo.showWindow(BetInfoEnum.BetInfo);
        this.betinfo.showSettleValue(false);
        this.counter.visible = false;
    }
    ,
    onEndRoundState: function ()
    {
        for (var key in this.betArray)
        {
            this.betArray[key].visible = false;
            this.betArray[key].betalbe = false;
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.betStateObjArray)
            this.betStateObjArray[key].visible = false;

        this.cardTable.visible = true;

        this.oddsInfo.visible = false;
        this.oddsWindow.visible = true;
        this.betinfo.showWindow(BetInfoEnum.BetInfo);
        this.betinfo.showSettleValue(true);
        this.counter.visible = false;
        this.counter.stop();
        this.dealer.frameName = SpriteName.Dealer + 1;
    }
    ,

//*************************************************************************************************************

    onAgainClick: function ()
    {
        this.againbtn.visible = false;
        var totalLastBetValue = 0;
        for (var i = 0; i < this.betArray.length; i++)
            totalLastBetValue += this.betArray[i].lastbetCredit;
        if (GameMgr.getInstance().credit >= totalLastBetValue)
        {
            for (var i = 0; i < this.betArray.length; i++)
            {
                this.betArray[i].betLastValue();
                this.betArray[i].sendConsumeInfo();
            }
        }
        else
        {
            this.showMessage(GameMessageEnum.Insufficient);
        }
    },

    addTempConsume: function ()
    {
        var totalTempConsume = 0;
        for (var i = 0; i < this.betArray.length; i++)
        {
            totalTempConsume += this.betArray[i].tmpConsumeCredit;
        }
        GameMgr.getInstance().hold = totalTempConsume;
    }

    ,
    selectCoin: function (value)
    {
        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].release();
        switch (value)
        {
            case CoinEnum.Coin10k:
                this.coinbtnArray[4].hold();
                break;
            case CoinEnum.Coin5k:
                this.coinbtnArray[3].hold();
                break;
            case CoinEnum.Coin1k:
                this.coinbtnArray[2].hold();
                break;
            case CoinEnum.Coin500:
                this.coinbtnArray[1].hold();
                break;
            case CoinEnum.Coin5:
                this.coinbtnArray[0].hold();
                break;
            case CoinEnum.Coin0:
                BasicGame.currentCoin = 0;
                break;
        }
    },
    updateUI: function ()
    {
        this.cashBar.setValue(GameMgr.getInstance().credit);
        this.infoMenu.setCredit(GameMgr.getInstance().credit);
        this.infoMenu.setName(GameMgr.getInstance().name);
        this.updateBetButton();
        this.updateBetCoin();
    },
    updateBetButton: function ()
    {
        var total = 0;
        for (var i = 0; i < this.betArray.length; i++)
        {
            var betContent = this.betArray[i].getBetContent();
            this.betinfo.setBetValueByObject(betContent);
            this.betinfo.setBetValueByObject(betContent);
            total += betContent.value;
        }
        this.betinfo.setBetTotalValue(total);
    },
    updateBetCoin: function ()
    {
        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].updateCoinUI();
    }
    ,
    showMessage: function (value, time)
    {
        this.gamemessage.showMessage(value, time);
    },

//*************************************************************************************************************

    /**
     * Handle the json contains state
     * @param {object} the json receive from server.
     */
    handleCmd: function (object)
    {
        if (object.hasOwnProperty(WebSocketNameTag.GameState))
            window.console.log(object[WebSocketNameTag.GameState]);

        if (object.hasOwnProperty(WebSocketNameTag.MessageType))
        {
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.PlayerBet)
                this.confirmConsume(object);
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.EnterGame)
            {
                this.playerEnterGame(object);
            }
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.UpdateInfo)
            {
                this.isRefresh = true;
                this.playerEnterGame(object);
            }
        }

        if (object[WebSocketNameTag.GameState] == GameStateNameTag.BigWin.NewRoundState)
        {
            window.console.log("Enter NewState");
            this.selectState(GameStateNameTag.BigWin.NewRoundState);

            if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                this.showHistory(object[WebSocketNameTag.RecordList]);
            if (object.hasOwnProperty(WebSocketNameTag.GameRound))
            {
                this.gameRound = object[WebSocketNameTag.GameRound];
                this.roundBar.setValue(this.gameRound);
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.BigWin.StartBetState)
        {
            window.console.log("Enter StartBetState");
            this.showMessage(GameMessageEnum.PlzBet, 2);

            this.selectState(GameStateNameTag.BigWin.StartBetState);
            this.isFirstBlink = false;

            if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                this.showHistory(object[WebSocketNameTag.RecordList]);
            if (object.hasOwnProperty(WebSocketNameTag.RemainTime))
            {
                var remaintime = object[WebSocketNameTag.RemainTime];
                if (remaintime > 0)
                {
                    this.counter.setValue(object[WebSocketNameTag.RemainTime]);
                    this.counter.visible = true;
                    this.counter.start();
                }
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.BigWin.EndBetState)
        {
            window.console.log("Enter EndBetState");
            this.selectState(GameStateNameTag.BigWin.EndBetState);
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.BigWin.OpenState)
        {
            window.console.log("Enter OpenState");
            this.selectState(GameStateNameTag.BigWin.OpenState);

            this.showCard(object[WebSocketNameTag.CardType], object[WebSocketNameTag.CardList], object[WebSocketNameTag.CardsInfo],
                object[WebSocketNameTag.BigWinProbability]);

            if (object.hasOwnProperty(WebSocketNameTag.ResultList))
            {
                var resultList = object[WebSocketNameTag.ResultList];
                var bonusList = object[WebSocketNameTag.BonusResultList];
                this.showBetValue(resultList);
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.BigWin.EndRoundState)
        {
            window.console.log("Enter EndRoundState");
            this.selectState(GameStateNameTag.BigWin.EndRoundState);
            if (object.hasOwnProperty(WebSocketNameTag.CardList))
                this.showCard(object[WebSocketNameTag.CardType], object[WebSocketNameTag.CardList], object[WebSocketNameTag.CardsInfo]
                    , object[WebSocketNameTag.BigWinProbability]);

            var resultList = object[WebSocketNameTag.ResultList];
            var bonusList = object[WebSocketNameTag.BonusResultList];

            this.showWinMessage(resultList);
            this.showSettleValue(resultList);
            if (bonusList != null)
            {
                this.showBonusValue(bonusList);
                this.showWinMessage(resultList);
            }
            if (object.hasOwnProperty(WebSocketNameTag.PlayerUpdateCredit))
            {
                var playUpdateCredit = object[WebSocketNameTag.PlayerUpdateCredit];

                GameMgr.getInstance().credit = Math.floor(playUpdateCredit);
            }
        }
        this.isFirstGame = false;
        this.isRefresh = false;
    },

//*************************************************************************************************************
    /**
     * Init value when player enter game
     * @param {object} the json receive from server.
     */
    playerEnterGame: function (object)
    {
        if (object.hasOwnProperty(WebSocketNameTag.GameRound))
        {
            this.gameRound = object[WebSocketNameTag.GameRound];
            this.roundBar.setValue(this.gameRound);
        }
        if (object.hasOwnProperty(WebSocketNameTag.GameID))
            this.gameID = object[WebSocketNameTag.GameID];
        if (object.hasOwnProperty(WebSocketNameTag.GameType))
            this.gameType = object[WebSocketNameTag.GameType];

        var betList = object[WebSocketNameTag.BetList];
        var totalBet = 0;
        for (var key in betList)
        {
            var betvalue = betList[key];
            totalBet += Number(betvalue);
            for (var key2 in this.betArray)
            {
                if (this.betArray[key2].bettype == key)
                {
                    this.betArray[key2].setNewStateBetValue(betvalue);
                    this.betArray[key2].setNewStateBetValue(betvalue);
                    break;
                }
            }
            this.betinfo.setBetValue(key, betvalue);
            this.betinfo.setBetTotalValue(totalBet);
        }
    }
    ,
    /**
     * Show history values
     * @param {object} the json array receive from server.
     */
    showHistory: function (recordlist)
    {
        for (var i = 0; i < 60; i++)
        {
            if (i < recordlist.length)
            {
                var record = recordlist[i];
                this.betinfo.setPoint(i, record[RecordNameTag.Point],
                    record[RecordNameTag.PlayerPair], record[RecordNameTag.BankerPair], record[RecordNameTag.Winner]);
                this.betinfo.showPoint(i, true);
            }
            else
                this.betinfo.showPoint(i, false);
        }
    },
    /**
     * Show suit probability
     * @param {string} the json receive from server.
     */
    showProbabilities: function (probabilities)
    {
        this.lastProability = probabilities;
        var newProbabilities = this.genNewProbabilities(probabilities);
        var maxIndex = 0;

        for (var i = 0; i < probabilities.length; i++)
        {
            if (probabilities[i] > probabilities[maxIndex])
                maxIndex = i;
        }

        for (var i = 0; i < newProbabilities.length; i++)
        {
            this.oddsInfo.setProgressValueByIndex(i, newProbabilities[i] * 100);
            this.oddsInfo.setProgressTextByIndex(i, probabilities[i]);
            this.oddsInfo.setProgressColor(i, 0);
            this.oddsInfo.setTextColor(i, 0);
        }
        this.oddsInfo.setProgressColor(maxIndex, 1);
        this.oddsInfo.setTextColor(maxIndex, 1);
        this.oddsInfo.setProgressTextByIndex(maxIndex, probabilities[maxIndex], true);
    },
    /**
     * Show card
     * @param {string} the current card type.
     * @param {string} the current open card.
     * @param {object} the array of  all card on table.
     * @param {object} the jsonarray of the probability.
     */
    showCard: function (cardtype, cardlist, cardinfo, probability)
    {
        var target;
        var index;
        var nexttarget;
        var nextindex;
        var playCardArray = cardinfo[CardTypeNameTag.PlayerList];
        var bankerCardArray = cardinfo[CardTypeNameTag.BankerList];
        var riverCardArray = cardinfo[CardTypeNameTag.RiverList];

        switch (cardtype)
        {
            case CardTypeNameTag.Player:
                target = CardTargetEnum.Player;
                index = playCardArray.length - 1;
                break;
            case CardTypeNameTag.Banker:
                target = CardTargetEnum.Banker;
                index = bankerCardArray.length - 1;
                break;
            case CardTypeNameTag.River:
                target = CardTargetEnum.River;
                index = riverCardArray.length - 1;
                break;
        }

        for (var i = 0; i < playCardArray.length; i++)
        {
            this.cardTable.setCardByObj(CardTargetEnum.Player, i, playCardArray[i]);
            //If isFirstGame is true,
            //ShowCard will skip all effects and open immediately.

            if (this.isFirstGame || this.isRefresh)
            {
                this.cardTable.showCard(CardTargetEnum.Player, i, false);
                this.showProbabilities(probability);
                if (index == 1)
                {
                    this.cardTable.showTargetPoint(CardTargetEnum.Player);
                }

            }
            else
            {
                if (index == i && (target == CardTargetEnum.Player))
                {
                    if (index == 1)
                    {
                        this.pokerOpenEffect.showCardByObj(playCardArray[i], function ()
                        {
                            this.cardTable.showCard(CardTargetEnum.Player, index, false);
                            this.showProbabilities(probability);
                            this.cardTable.showTargetPoint(CardTargetEnum.Player);
                            this.pokerOpenEffect.close();

                            nexttarget = CardTargetEnum.Banker;
                            nextindex = index;
                            this.cardTable.showHalo(nexttarget, nextindex);
                        }, this);

                        nexttarget = CardTargetEnum.Player;
                        nextindex = index;
                        this.cardTable.showHalo(nexttarget, nextindex);
                    }
                    else
                    {
                        this.cardTable.showCard(CardTargetEnum.Player, i, true);
                        this.showProbabilities(probability);

                        nexttarget = CardTargetEnum.Banker;
                        nextindex = index;
                        this.cardTable.showHalo(nexttarget, nextindex);
                    }
                }
                else
                    this.cardTable.showCard(CardTargetEnum.Player, i, false);
            }
        }


        for (var i = 0; i < bankerCardArray.length; i++)
        {
            this.cardTable.setCardByObj(CardTargetEnum.Banker, i, bankerCardArray[i]);
            if (this.isFirstGame || this.isRefresh)
            {
                this.cardTable.showCard(CardTargetEnum.Banker, i, false);
                this.showProbabilities(probability);
                if (index == 1 && (target != CardTargetEnum.Player))
                    this.cardTable.showTargetPoint(CardTargetEnum.Banker);
            }
            else
            {
                if (index == i && (target == CardTargetEnum.Banker))
                    if (index == 1)
                    {
                        this.pokerOpenEffect.showCardByObj(bankerCardArray[i], function ()
                        {
                            this.cardTable.showCard(CardTargetEnum.Banker, index, false);
                            this.showProbabilities(probability);
                            this.cardTable.showTargetPoint(CardTargetEnum.Banker);
                            this.pokerOpenEffect.close();

                            nexttarget = CardTargetEnum.River;
                            nextindex = index;
                            this.cardTable.showHalo(nexttarget, nextindex);
                        }, this);

                        nexttarget = CardTargetEnum.Banker;
                        nextindex = index;
                        this.cardTable.showHalo(nexttarget, nextindex);
                    }
                    else
                    {
                        this.cardTable.showCard(CardTargetEnum.Banker, i, true);
                        this.showProbabilities(probability);

                        nexttarget = CardTargetEnum.River;
                        nextindex = index;
                        this.cardTable.showHalo(nexttarget, nextindex);
                    }
                else
                    this.cardTable.showCard(CardTargetEnum.Banker, i, false);
            }
        }

        for (var i = 0; i < riverCardArray.length; i++)
        {
            this.cardTable.setCardByObj(CardTargetEnum.River, i, riverCardArray[i]);
            if (this.isFirstGame || this.isRefresh)
            {
                this.cardTable.showCard(CardTargetEnum.River, i, false);
                this.showProbabilities(probability);
            }
            else
            {
                if (index == i && (target == CardTargetEnum.River))
                {
                    if (index == 0)
                    {
                        this.cardTable.showCard(CardTargetEnum.River, index, true);
                        this.showProbabilities(probability);
                        nexttarget = CardTargetEnum.Player;
                        nextindex = index + 1;
                        this.cardTable.showHalo(nexttarget, nextindex);
                    }
                    else
                    {
                        var sum = 0;
                        for (var key in this.lastProability)
                        {
                            sum = (sum + this.lastProability[key]);
                        }

                        if (sum > 0)
                        {

                            this.pokerOpenEffect.showCardByObj(riverCardArray[i], function ()
                            {
                                this.cardTable.showCard(CardTargetEnum.River, index, false);
                                this.showProbabilities(probability);
                                this.pokerOpenEffect.close();

                                nexttarget = CardTargetEnum.None;
                                this.cardTable.showHalo(nexttarget, nextindex);
                            }, this);

                            nexttarget = CardTargetEnum.River;
                            nextindex = index;
                            this.cardTable.showHalo(nexttarget, nextindex);
                        }
                        else
                        {
                            this.cardTable.showCard(CardTargetEnum.River, i, true);
                            this.showProbabilities(probability);

                            nexttarget = CardTargetEnum.None;
                            this.cardTable.showHalo(nexttarget, nextindex);
                        }

                    }
                }
                else
                    this.cardTable.showCard(CardTargetEnum.River, i, false);
            }

            //if (i == 1)
            //{
            //    this.pokerOpenEffect.close();
            //}
        }
    },
    showBetValue: function (results)
    {
        var betTotal = 0;

        for (var i = 0; i < results.length; i++)
        {
            var betAmount = results[i][BetNameTag.BetAmount];
            var bettype = results[i][BetNameTag.BetType];
            var betContent = new Object();

            if (bettype != BonusNameTag.BonusTripple && (betType != BonusNameTag.BonusTwoPair))
            {
                betContent.value = betAmount;
                betTotal += Number(betAmount);
                this.betinfo.setBetValueByObject(betContent);
            }
        }
        this.betinfo.setBetTotalValue(betTotal);
    },

    showSettleValue: function (results)
    {
        var settleTotal = 0;
        for (var i = 0; i < results.length; i++)
        {
            var settleAmount = results[i][BetNameTag.SettleAmount];
            var betType = results[i][BetNameTag.BetType];
            var settleContent = new Object();

            if (betType != BonusNameTag.BonusTripple && (betType != BonusNameTag.BonusTwoPair))
            {
                settleContent.type = betType;
                settleContent.value = settleAmount;
                settleTotal += Number(settleAmount);
                this.betinfo.setSettleValue(settleContent);
            }
        }
        this.betinfo.setSettleTotalValue(settleTotal);
    },
    showBonusValue: function (bonus)
    {
        if (bonus != null)
        {
            for (var key in bonus)
            {
                var settleAmount = 0;
                var bonuslist;
                var type;
                switch (key)
                {
                    case BonusNameTag.BonusTwoPair:
                        type = BonusNameTag.BonusTwoPair;
                        settleAmount = bonus[BonusNameTag.BonusTwoPair][BetNameTag.SettleAmount];
                        bonuslist = bonus[BonusNameTag.BonusTwoPair][BonusNameTag.BonusList];
                        if (settleAmount > 0)
                            this.clearBonusTwoPair = true;
                        break;
                    case BonusNameTag.BonusTripple:
                        type = BonusNameTag.BonusTripple;
                        settleAmount = bonus[BonusNameTag.BonusTripple][BetNameTag.SettleAmount];
                        bonuslist = bonus[BonusNameTag.BonusTripple][BonusNameTag.BonusList];
                        if (settleAmount > 0)
                            this.clearBonusTripple = true;
                        break;
                }
                this.betinfo.setBonusValue(type, bonuslist);
            }
        }
    },
    showWinMessage: function (results)
    {
        var loserCounter = 0;
        for (var i = 0; i < results.length; i++)
        {
            var winstate = results[i][BetNameTag.WinState];
            var betType = results[i][BetNameTag.BetType];

            if (betType != BetTypeEnum.BigWin.Player && betType != BetTypeEnum.BigWin.Banker)
                continue;
            this.oddsWindow.blinkIndex(winstate);
            switch (winstate)
            {
                case WinnerNameTag.BigWin.WSBWStraight:
                case WinnerNameTag.BigWin.WSBWFlush:
                case WinnerNameTag.BigWin.WSBWFullHouse:
                case WinnerNameTag.BigWin.WSBWFourOfAKind:
                case WinnerNameTag.BigWin.WSBWStraightFlush:
                case WinnerNameTag.BigWin.WSBWRoyalFlush:
                case WinnerNameTag.BigWin.WSBWTriple:
                case WinnerNameTag.BigWin.WSBWTwoPair:
                    this.specialWinEffect.show();
                    this.specialWinEffect.setWinType(winstate);
                    break;
                case WinnerNameTag.WSLost:
                    loserCounter++;
                    break;
                case WinnerNameTag.BigWin.WSBWNormalWin:
                    this.winEffect.visible = true;
                    if (betType == BetTypeEnum.BigWin.Player)
                        this.winEffect.position.setTo(150, 860);

                    if (betType == BetTypeEnum.BigWin.Banker)
                        this.winEffect.position.setTo(1760, 860);
                    break;
            }

            if (loserCounter == 2)
            {
                this.showMessage(GameMessageEnum.Draw, 10);
                break;
            }
        }

        var bonusValue = 0;
        var bonusOdds = 0;
        var settleAmount = 0;
        for (var i = 0; i < results.length; i++)
        {
            var winstate = results[i][BetNameTag.WinState];

            switch (winstate)
            {
                case WinnerNameTag.BigWin.WSBWStraight:
                    bonusOdds = BigWinOdds.Straight;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
                case WinnerNameTag.BigWin.WSBWFlush:
                    bonusOdds = BigWinOdds.Flush;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
                case WinnerNameTag.BigWin.WSBWFullHouse:
                    bonusOdds = BigWinOdds.FullHouse;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
                case WinnerNameTag.BigWin.WSBWFourOfAKind:
                    bonusOdds = BigWinOdds.Four;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
                case WinnerNameTag.BigWin.WSBWStraightFlush:
                    bonusOdds = BigWinOdds.StraightFlush;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
                case WinnerNameTag.BigWin.WSBWRoyalFlush:
                    bonusOdds = BigWinOdds.RoyalFlush;
                    settleAmount = results[i][BetNameTag.SettleAmount];
                    break;
            }
            if (settleAmount > 0)
            {
                this.specialWinEffect.setBonusOdds(bonusOdds);
                this.specialWinEffect.setBonusValue(settleAmount);
            }
        }

    }
    ,
    /**
     *  Send all consumption to server
     */
    sendConsumeInfo: function (betType)
    {
        for (var i = 0; i < this.betArray.length; i++)
        {
            if (this.betArray[i].bettype == betType)
            {
                this.betArray[i].sendConsumeInfo();
                break;
            }
        }
    },
    confirmConsume: function (jsonObj)
    {
        window.console.log("confirmConsume");
        var result = (jsonObj[WebSocketNameTag.Result] == 0 ? true : false);
        var id = jsonObj[WebSocketNameTag.ID];
        var playerCredit = jsonObj[WebSocketNameTag.PlayerUpdateCredit];
        var betType = jsonObj[WebSocketNameTag.BetType];
        var round = jsonObj[WebSocketNameTag.GameRound];
        var totalBetAmount = jsonObj[WebSocketNameTag.TotalBetAmount];

        for (var i = 0; i < this.betArray.length; i++)
        {
            this.betArray[i].confirmConsume(id, result, totalBetAmount);
        }

        if (playerCredit != null)
        {
            GameMgr.getInstance().credit = Math.floor(playerCredit);
        }

    },
    /**
     *  Regenerate new normal distribution probability
     */
    genNewProbabilities: function (array)
    {
        if (array instanceof Array == false)
            return array;
        var raw_data = array.slice();

        for (var i; i < raw_data.length; i++)
        {
            raw_data[i] *= 10000;
        }

        for (i = 0; i < raw_data.length; i++)
        {
            raw_data[i] = Math.sqrt(raw_data[i]) * 10;
        }

        var total = 0;
        for (i = 0; i < raw_data.length; i++)
        {
            raw_data[i] = Math.sqrt(raw_data[i]) * 10;
            total += raw_data[i];
        }

        if (total == 0)
            return raw_data;

        for (i = 0; i < raw_data.length; i++)
        {
            raw_data[i] = raw_data[i] / total;
        }

        //one kind match
        for (i = 0; i < raw_data.length; i++)
        {
            if (raw_data[i] == 1 && total == 1000)
                return raw_data;
        }

        for (i = 0; i < raw_data.length; i++)
        {
            if (raw_data [i] != 0)
            {
                raw_data[i] = Math.min(raw_data[i] + 0.3, 0.9);
            }
        }
        return raw_data;
    },
    exitScene: function ()
    {
        var ret = {};
        ret[WebSocketNameTag.ID] = GameMgr.getInstance().uuid;
        ret[WebSocketNameTag.GameID] = this.gameID;
        ret[WebSocketNameTag.TimeStamp] = util.getTimeStamp();
        ret[WebSocketNameTag.MessageType] = MessageNameTag.ExiGame;
        var retjson = JSON.stringify(ret);
        Client.getInstance().sendMessage(retjson);
        GameMgr.getInstance().unregisterListener(this);
        this.game.onFocus.removeAll();
        this.game.onBlur.removeAll();
        this.game.state.start(GameSceneEnum.Menu);
    }
    ,
    /**
     *  App onBlur
     *  Save the onBlur time.
     */
    onBlur: function ()
    {
        window.console.log("onblur");
        this.onBlurTime = new Date();

    },
    /**
     *  App onFocus
     *  Calculate the elapsed time .
     *  Init the game state with enter game state.
     */
    onFocus: function ()
    {
        var difference = Math.abs(this.onBlurTime - new Date());
        difference = Math.floor(difference / 1000);
        window.console.log("onfocus:" + difference);
        if (difference > 3)
        {
            this.selectState(GameStateNameTag.NonState);
            var ret = {};
            ret[WebSocketNameTag.ID] = GameMgr.getInstance().uuid;
            ret[WebSocketNameTag.TimeStamp] = util.getTimeStamp();
            ret[WebSocketNameTag.MessageType] = MessageNameTag.UpdateInfo;
            ret[WebSocketNameTag.GameID] = this.gameID;

            var retjson = JSON.stringify(ret);
            Client.getInstance().sendMessage(retjson)
        }
    }
    ,
    render: function ()
    {
        if (CustomConfig.DebugMode == true)
            this.game.debug.text(this.game.time.fps, 2, 60, "#00ff00", '60px Arial');
    }
};