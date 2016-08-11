/**
 * Created by Maxpain on 2016/7/15.
 */
BasicGame.Super7PK = function (game)
{
    this.FirstBetTime = 14;
    this.SecondBetTime = 19;
};

BasicGame.Super7PK.prototype = {

    init: function ()
    {
        this.isFirstGame = true;
        this.isRefresh = true;

        this.prepareSendBetType = -1;
        this.lastBetType = -1;
        this.client = Client.getInstance();
        this.gameRound = 0;
        this.gameID = "";
        this.gameType = "Super7PK";
        this.onBlurTime = 0;
        this.currentState = -2;
    },
    preload: function ()
    {

    },

    create: function ()
    {
        window.console.log("Super7State");
        if (CustomConfig.DebugMode == true)
            this.game.time.advancedTiming = true;

        var background = this.add.sprite(this.world.centerX, this.world.centerY, SheetName.S7Main, SpriteName.Background);
        background.anchor.setTo(0.5, 0.5);
        background.width = 1920;
        background.height = 1080;
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
        //*************************************************************************************************************
        this.betTable = this.add.sprite(0, 0, SheetName.S7Main, SpriteName.BetTable);
        this.betTable.y = this.game.height - this.betTable.height;
        this.dealer = this.add.sprite(735, 0, SheetName.S7Main, SpriteName.Dealer + 0);
        this.mainOdds = this.add.sprite(245, 540, SheetName.S7Main, SpriteName.MainOdds);

        //*************************************************************************************************************
        var betcallback = function (betRetValue, betType)
        {
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

        this.secBetArray = [];
        this.betArray = [];
        this.mainBet = new S7BetButton(this.game, 1280, 520, BetTypeEnum.Super7PK.S7PKMain, betcallback, this);
        this.add.existing(this.mainBet);
        this.betArray.push(this.mainBet);

        for (var key in BetTypeEnum.Super7PK)
        {
            if (BetTypeEnum.Super7PK[key] == BetTypeEnum.Super7PK.S7PKMain)
                continue;
            if (BetTypeEnum.Super7PK[key] == BetTypeEnum.Super7PK.S7PKRaise)
                continue;
            var betBtn = new S7BetButton(this.game, 0, 0, BetTypeEnum.Super7PK[key], betcallback, this)
            this.add.existing(betBtn);
            this.secBetArray.push(betBtn);
            this.betArray.push(betBtn);
        }

        for (var i = this.secBetArray.length - 1; i >= 0; i--)
        {
            var counter = this.secBetArray.length - i - 1;

            this.secBetArray[i].position.setTo(30 * Math.floor(i / 6) + 10 + ((this.secBetArray[i].width - 35) * ((counter) % 6)) + 270 * (Math.floor((counter / 3)) % 2),
                520 + (this.secBetArray[i].height - 20) * Math.floor(counter / 6));
        }

        for (var i = (this.secBetArray.length - 4); i >= (this.secBetArray.length - 6 ); i--)
        {
            this.secBetArray[i].x = this.secBetArray[i].x - 60;
        }
        this.secBetArray[9].x = this.secBetArray[9].x - 10;
        this.secBetArray[6].x = this.secBetArray[6].x - 10;

        this.raiseBet = new S7BetButton(this.game, 840, 633, BetTypeEnum.Super7PK.S7PKRaise, function ()
        {
        }, this)
        this.add.existing(this.raiseBet);
        this.betArray.push(this.raiseBet);
        this.secBetArray.push(this.raiseBet);
        //*************************************************************************************************************

        this.boardWindow = new BoardWindow(this.game, 36, 80);
        this.add.existing(this.boardWindow);
        this.historyWindow = new S7HistoryWindow(this.game, 1270, 80);
        this.add.existing(this.historyWindow);

        this.oddsWindow = new S7OddsWindow(this.game, 36, 80);
        this.add.existing(this.oddsWindow);

        this.betInfoWindow = new S7BetWindow(this.game, 1250, 80);
        this.add.existing(this.betInfoWindow);
        //*************************************************************************************************************
        this.secondCardArray = [];
        for (var i = 0; i < 7; i++)
        {
            var card = new Poker(this.game, 0, 0);
            card.position.setTo(330 + 220 * i, 760);
            this.add.existing(card);
            this.secondCardArray.push(card);
        }

        //*************************************************************************************************************

        var coincallback = function ()
        {
            for (var i = 0; i < this.coinbtnArray.length; i++)
                this.coinbtnArray[i].release();
        };
        this.coinbtnArray = [];
        var coinbtn = new CoinButton(this.game, 520, 1005, CoinEnum.Coin5, coincallback, this);
        this.coinbtnArray[0] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 710, 1005, CoinEnum.Coin500, coincallback, this);
        this.coinbtnArray[1] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 900, 1005, CoinEnum.Coin1k, coincallback, this);
        this.coinbtnArray[2] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 1090, 1005, CoinEnum.Coin5k, coincallback, this);
        this.coinbtnArray[3] = coinbtn;
        this.game.add.existing(coinbtn);
        coinbtn = new CoinButton(this.game, 1300, 1005, CoinEnum.Coin10k, coincallback, this);
        this.coinbtnArray[4] = coinbtn;
        this.game.add.existing(coinbtn);

        for (var i = 0; i < this.coinbtnArray.length; i++)
        {
            this.coinbtnArray[i].position.setTo(600 + 180 * i, 1025);
        }

//*********************************************************************************************************************

        this.help = this.add.button(25, 960, SheetName.Button, function ()
        {
            this.tutorialMenu.openWindow();
        }, this, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 1);


        this.counter = new Counter(this.game, 830, 280);
        this.add.existing(this.counter);
        this.counter.setValue(0);
        this.counter.visible = false;
        this.counter.setCallback(function ()
        {
            for (var key in this.betArray)
            {
                this.betArray[key].sendConsumeInfo();
                // this.betArray[key].betable = false;
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

        this.specialWinEffect = new SpecialWinEffect(this.game, 0, 0);
        this.add.existing(this.specialWinEffect);
        this.specialWinEffect.hide();

        this.tutorialMenu = new TutorialWindow(this.game, GameTypeNameTag.Super7PK);
        this.add.existing(this.tutorialMenu);
        this.tutorialMenu.closeWindow();

        this.infoMenu = new InfoMenu(this.game, 0, 0, this.exitScene, this);
        this.add.existing(this.infoMenu);
        this.infoMenu.closeMenu();
//********************************************************************************************************************
        GameMgr.getInstance().registerListener(function ()
        {
            this.updateUI();
        }, this);

        this.selectCredit(CoinEnum.Coin1k);
        this.updateUI();
        this.client.setCallBack(this.handleCmd, this);
        this.game.onFocus.add(this.onFocus, this);
        this.game.onBlur.add(this.onBlur, this);

        this.selectState(GameStateNameTag.NonState);
    },
//*************************************************************************************************************

    update: function ()
    {

    },
    /**
     *   Update UI method
     */
    updateUI: function ()
    {
        this.cashBar.setValue(GameMgr.getInstance().credit);
        this.infoMenu.setCredit(GameMgr.getInstance().credit);
        this.infoMenu.setName(GameMgr.getInstance().name);

        this.updateBetCoin();
    },
    updateBetButton: function ()
    {
        var betArray = [];
        for (var i = 0; i < this.betArray.length; i++)
        {
            var betContent = this.betArray[i].getBetContent();
            if (betContent.value > 0)
            {
                betArray.push(betContent);
            }
        }
        this.showBetValue(betArray);
    },

    updateBetCoin: function ()
    {
        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].updateCoinUI();
    }
    ,
    //*************************************************************************************************************
    /**
     *   Handle server json
     */
    handleCmd: function (object)
    {
        //Handle message
        if (object.hasOwnProperty(WebSocketNameTag.MessageType))
        {
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.PlayerBet)
            {
                this.confirmConsume(object);
            }

            if (object[WebSocketNameTag.MessageType] == MessageNameTag.EnterGame)
            {
                this.playerEnterGame(object);
                if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                {
                    var oddsList = object[WebSocketNameTag.UpdateOdds]
                    if (oddsList != null)
                        this.setOddsWindow(oddsList);
                }
            }
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.UpdateInfo)
            {
                this.isRefresh = true;
                this.playerEnterGame(object);
            }
        }

        //Handle state message
        if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.NewRoundState)
        {
            window.console.log("Enter NewRoundState");
            this.selectState(GameStateNameTag.Super7pk.NewRoundState);

            if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                this.showHistory(object[WebSocketNameTag.RecordList]);
            if (object.hasOwnProperty(WebSocketNameTag.GameRound))
            {
                this.gameRound = object[WebSocketNameTag.GameRound];
                this.roundBar.setValue(this.gameRound);
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.FirstStartBetState)
        {
            window.console.log("Enter FirstStartBetState");
            this.selectState(GameStateNameTag.Super7pk.FirstStartBetState);

            this.showMessage(GameMessageEnum.PlzBet, 2);
            if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                this.showHistory(object[WebSocketNameTag.RecordList]);

            if (object.hasOwnProperty(WebSocketNameTag.RemainTime))
            {
                var remaintime = object[WebSocketNameTag.RemainTime];
                if (remaintime > 0)
                {
                    this.counter.setValue(object[WebSocketNameTag.RemainTime]);
                    this.counter.visible = true;
                    this.counter.start(this.FirstBetTime);
                }
            }

        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.FirstOpenState)
        {
            window.console.log("Enter FirstOpenState");
            this.selectState(GameStateNameTag.Super7pk.FirstOpenState);

            this.showBoardCard(object);
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.FirstEndBetState)
        {
            window.console.log("Enter FirstOpenState");
            this.selectState(GameStateNameTag.Super7pk.FirstEndBetState);

        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.SecondStartBetState)
        {
            window.console.log("Enter SecondBetState");
            this.selectState(GameStateNameTag.Super7pk.SecondStartBetState);

            this.showMessage(GameMessageEnum.PlzBet, 2);
            var oddsList = object[WebSocketNameTag.UpdateOdds]
            if (oddsList != null)
            {
                this.updateOdds = oddsList;
                this.setBetButtonOdds(oddsList);
                this.setOddsWindow(oddsList);
            }

            if (object.hasOwnProperty(WebSocketNameTag.RemainTime))
            {
                var remaintime = object[WebSocketNameTag.RemainTime];
                if (remaintime > 0)
                {
                    this.counter.setValue(object[WebSocketNameTag.RemainTime]);
                    this.counter.visible = true;
                    this.counter.start(this.SecondBetTime);
                }
            }
            if (object.hasOwnProperty(WebSocketNameTag.CardType))
            {
                this.showBoardCard(object);
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.SecondEndBetState)
        {
            window.console.log("Enter SecondEndBetState");
            this.selectState(GameStateNameTag.Super7pk.SecondEndBetState);

            if (object.hasOwnProperty(WebSocketNameTag.CardList))
                this.showSecondCard(object);
            var oddsList = object[WebSocketNameTag.UpdateOdds]
            if (oddsList != null)
                this.setOddsWindow(oddsList);
            this.updateBetButton();
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.SecondOpenBetState)
        {
            window.console.log("Enter SecondOpenBetState");
            this.selectState(GameStateNameTag.Super7pk.SecondOpenBetState);

            if (object.hasOwnProperty(WebSocketNameTag.CardsInfo))
                this.showSecondCard(object);

        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.Super7pk.EndRoundState)
        {
            window.console.log("Enter EndRoundState");
            this.selectState(GameStateNameTag.Super7pk.EndRoundState);

            if (object.hasOwnProperty(WebSocketNameTag.CardsInfo))
                this.showSecondCard(object);
            var resultList = object[WebSocketNameTag.ResultList];
            var cardcombination = object[WebSocketNameTag.CardShowHandCombination];
            var cardhandtype = object[WebSocketNameTag.CardShowHandType];

            this.showWinMessage(resultList);
            this.showSettleValue(resultList);
            this.showHandCombination(cardcombination);
        }

        this.isFirstGame = false;
        this.isRefresh = false;
    }
    ,
    //*****************************************************************************************************************
    //*  Select game state
    selectState: function (value)
    {
        if (this.currentState == value)
            return;
        switch (value)
        {
            case GameStateNameTag.NonState:
                this.onNonState();
                break;
            case GameStateNameTag.Super7pk.NewRoundState:
                this.onNewRoundState();
                break;
            case GameStateNameTag.Super7pk.FirstStartBetState:
                this.onFirstStartBetState();
                break;
            case GameStateNameTag.Super7pk.FirstEndBetState:
                this.onFirstEndBetState();
                break;
            case GameStateNameTag.Super7pk.FirstOpenState:
                this.onFirstOpenState();
                break;
            case GameStateNameTag.Super7pk.SecondStartBetState:
                this.onSecondBetState();
                break;
            case GameStateNameTag.Super7pk.SecondEndBetState:
                this.onSecondEndBetState();
                break;
            case GameStateNameTag.Super7pk.SecondOpenBetState:
                this.onSecondOpenBetState();
                break;
            case GameStateNameTag.Super7pk.EndRoundState:
                this.onEndRoundState();
                break;
        }
        this.currentState = value;
    }
    ,
    onNonState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secBetArray)
        {
            this.secBetArray[key].visible = false;
            this.secBetArray[key].initial();
        }
        for (var key in this.secondCardArray)
        {
            this.secondCardArray[key].y = 760;
            this.secondCardArray[key].visible = false;
            this.secondCardArray[key].initial();
        }
        this.dealer.frameName = SpriteName.Dealer + 0;

        this.oddsWindow.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;

        this.mainBet.initial();
        this.mainBet.visible = false;
        this.mainOdds.visible = false;

        this.pokerOpenEffect.close();
        this.counter.visible = false;
        this.counter.stop();

        this.betInfoWindow.initial();
        this.boardWindow.initial();

    }
    ,
    onNewRoundState: function ()
    {
        for (var key in this.secBetArray)
        {
            this.secBetArray[key].visible = false;
            this.secBetArray[key].initial();
        }
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
        {
            this.secondCardArray[key].visible = false;
            this.secondCardArray[key].initial();
            this.secondCardArray[key].y = 760;
        }
        for (var key in this.betArray)
            this.betArray[key].setEnable(false);

        this.dealer.frameName = SpriteName.Dealer + 0;
        this.gamemessage.hide();
        this.mainBet.initial();
        this.mainBet.visible = true;
        this.mainOdds.visible = true;

        this.specialWinEffect.hide();
        this.boardWindow.visible = true;
        this.raiseBet.visible = false;
        this.oddsWindow.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;
        this.betInfoWindow.initial();
        this.boardWindow.initial();
        this.pokerOpenEffect.close();
        this.counter.visible = false;
    }
    ,
    onFirstStartBetState: function ()
    {
        this.dealer.frameName = SpriteName.Dealer + 0;
        this.specialWinEffect.hide();
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = true;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.betArray)
            this.betArray[key].setEnable(true);
        //   this.betArray[key].betable = true;

        this.gamemessage.hide();

        this.mainBet.visible = true;
        this.mainBet.setEnable(true);
        this.mainOdds.visible = true;

        this.raiseBet.visible = false;
        this.oddsWindow.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;
    },
    onFirstEndBetState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.betArray)
            this.betArray[key].setEnable(false);
        //   this.betArray[key].betable = false;

        this.gamemessage.hide();
        this.mainBet.visible = true;
        this.mainBet.setEnable(false);
        this.mainOdds.visible = true;
        this.raiseBet.visible = false;
        this.oddsWindow.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;

        this.counter.visible = false;
        this.counter.stop();
    }
    ,
    onFirstOpenState: function ()
    {
        this.showMessage(GameMessageEnum.OpenBoard, 2);


        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.betArray)
            this.betArray[key].setEnable(false);
        //  this.betArray[key].betable = false;
        this.mainBet.visible = true;
        this.mainBet.setEnable(false);
        this.mainOdds.visible = true;

        this.raiseBet.visible = false;
        this.oddsWindow.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;
        this.specialWinEffect.hide();

        this.counter.visible = false;
        this.counter.stop();


        this.raiseBet.showCoin(this.mainBet.betCredit);
    }
    ,
    onSecondBetState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = true;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = true;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = false;
        for (var key in this.betArray)
            this.betArray[key].setEnable(true);

        this.raiseBet.visible = true;
        this.oddsWindow.visible = false;
        this.mainBet.visible = false;
        this.mainOdds.visible = false;
        this.specialWinEffect.hide();
        this.historyWindow.visible = true;
        this.boardWindow.visible = true;

        var totalLastBetValue = 0;
        for (var i = 0; i < this.secBetArray.length; i++)
        {
            if (this.secBetArray[i].type != BetTypeEnum.Super7PK.S7PKRaise)
                totalLastBetValue += Number(this.secBetArray[i].lastbetCredit);
        }
    }
    ,
    onSecondEndBetState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;

        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = true;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].showHalo(false);
        for (var key in this.betArray)
            this.betArray[key].setEnable(true);
        //    this.betArray[key].betable = true;

        this.secondCardArray[5].showHalo(true);

        this.raiseBet.visible = false;
        this.historyWindow.visible = false;

        this.mainBet.visible = false;
        this.mainOdds.visible = false;
        this.historyWindow.visible = false;
        this.boardWindow.visible = false;

        this.oddsWindow.visible = true;
        this.betInfoWindow.visible = true;

        this.counter.visible = false;
        this.counter.stop();
    }
    ,
    onSecondOpenBetState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;

        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = true;
        for (var key in this.betArray)
            this.betArray[key].setEnable(false);
        //  this.betArray[key].betable = false;


        this.raiseBet.visible = false;
        this.historyWindow.visible = false;

        this.betInfoWindow.showSettleValue(false);
        this.historyWindow.visible = false;
        this.mainBet.visible = false;
        this.mainOdds.visible = false;
        this.boardWindow.visible = false;

        this.oddsWindow.visible = true;
        this.betInfoWindow.visible = true;

        this.counter.visible = false;
        this.counter.stop();
    }
    ,
    onEndRoundState: function ()
    {
        for (var key in this.secBetArray)
            this.secBetArray[key].visible = false;
        for (var key in this.coinbtnArray)
            this.coinbtnArray[key].visible = false;
        for (var key in this.secondCardArray)
            this.secondCardArray[key].visible = true;
        for (var key in this.betArray)
            this.betArray[key].setEnable(false);
        //    this.betArray[key].betable = false;

        this.dealer.frameName = SpriteName.Dealer + 1;

        this.raiseBet.visible = false;
        this.historyWindow.visible = false;


        this.mainBet.visible = false;
        this.mainOdds.visible = false;
        this.boardWindow.visible = false;

        this.betInfoWindow.visible = true;
        this.oddsWindow.visible = true;

        this.counter.visible = false;
        this.counter.stop();
    }
    //******************************************************************************************************************
    ,
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

        this.showHistory(object[WebSocketNameTag.RecordList]);

        var updateOdds = object[WebSocketNameTag.UpdateOdds];
        if (updateOdds != null)
            this.updateOdds = updateOdds;

        var betList = object[WebSocketNameTag.BetList]
        if (betList != null)
        {
            var totalBet = 0;
            var counter = 0;
            var betArray = [];

            for (var key in betList)
            {
                var betvalue = betList[key];
                totalBet += Number(betvalue);
                var obj = {};
                obj.type = key;
                obj.value = betvalue;
                betArray.push(obj);

                for (var key2 in this.secBetArray)
                {
                    if (this.secBetArray[key2].bettype == key)
                    {
                        this.secBetArray[key2].setNewStateBetValue(betvalue);
                        this.secBetArray[key2].setNewStateBetValue(betvalue);
                        break;
                    }
                    if (this.secBetArray[key2].bettype == BetTypeEnum.Super7PK.S7PKRaise
                        && key == BetTypeEnum.Super7PK.S7PKMain)
                    {

                        this.secBetArray[key2].setNewStateBetValue(betvalue);
                        this.mainBet.setNewStateBetValue(betvalue);
                        break;
                    }
                }
            }
            if (updateOdds != null)
                this.showBetValue(betArray);
        }
    }
    ,
    showHistory: function (recordlist)
    {
        for (var i = 0; i < 60; i++)
        {
            if (i < recordlist.length)
            {
                var record = recordlist[i];
                this.historyWindow.setPoint(i, record[RecordNameTag.Winner]);
                this.historyWindow.showPoint(i, true);
            }
            else
                this.historyWindow.showPoint(i, false);
        }
    }
    ,
    showBoardCard: function (object)
    {
        cardtype = object[WebSocketNameTag.CardType];
        cardinfo = object[WebSocketNameTag.CardsInfo];
        if (cardtype == CardTargetEnum.River)
            return;

        var extraCardArray = cardinfo[CardTypeNameTag.ExtraList];
        switch (cardtype)
        {
            case CardTypeNameTag.Extra:
                target = CardTargetEnum.Extra;
                index = extraCardArray.length - 1;
                break;
        }

        for (var i = 0; i < extraCardArray.length; i++)
        {
            if (this.isFirstGame || this.isRefresh)
            {
                this.boardWindow.setCard(target, i, extraCardArray[i])
                this.boardWindow.showCard(target, i, false)
            }
            else
            {
                if (i == extraCardArray.length - 1)
                {
                    this.boardWindow.setCard(target, i, extraCardArray[i])
                    this.boardWindow.showCard(target, i, true)
                }
                else
                {
                    this.boardWindow.setCard(target, i, extraCardArray[i])
                    this.boardWindow.showCard(target, i, false)
                }
            }

            this.secondCardArray[i].setCardByObj(extraCardArray[i]);
            this.secondCardArray[i].showCard(false);
        }
    }
    ,
    showSecondCard: function (object)
    {
        cardtype = object[WebSocketNameTag.CardType];
        cardinfo = object[WebSocketNameTag.CardsInfo];

        var target, nexttarget;
        var index, nextindex;
        var riverCardArray = cardinfo[CardTypeNameTag.RiverList];
        var extraCardArray = cardinfo[CardTypeNameTag.ExtraList];

        switch (cardtype)
        {
            case CardTypeNameTag.Extra:
                target = CardTargetEnum.Extra;
                index = extraCardArray.length - 1;
                break;
            case CardTypeNameTag.River:
                target = CardTargetEnum.River;
                index = riverCardArray.length - 1;
                break;
        }

        for (var i = 0; i < extraCardArray.length; i++)
        {
            this.secondCardArray[i].setCardByObj(extraCardArray[i])
            this.secondCardArray[i].showCard(false)
        }

        for (var i = 0; i < riverCardArray.length; i++)
        {
            var riverIndex = Number(i + 5); //River index  means the index in all cards.
            var riverCard = riverCardArray[i];

            if (this.isFirstGame || this.isRefresh)
            {
                window.console.log("RiverCard:", riverCard);
                this.secondCardArray[riverIndex].setCardByObj(riverCard)
                this.secondCardArray[riverIndex].showCard(false)
            }
            else
            {
                if (i == index)
                {
                    for (var key in this.secondCardArray)
                        this.secondCardArray[key].showHalo(false);

                    this.secondCardArray[riverIndex].showHalo(true);
                    this.secondCardArray[riverIndex].setCardByObj(riverCard);

                    this.pokerOpenEffect.showCardByObj(riverCard, function ()
                    {
                        this.pokerOpenEffect.close();
                        this.secondCardArray[riverIndex].showCard(false)

                        nexttarget = CardTargetEnum.River;
                        nextindex = Number((riverIndex + 1));

                        for (var key in this.secondCardArray)
                            this.secondCardArray[key].showHalo(false);

                        if (nextindex < this.secondCardArray.length)
                        {
                            this.secondCardArray[nextindex].showHalo(true);
                        }
                    }, this);
                }
                else
                {
                    this.secondCardArray[riverIndex].setCardByObj(riverCard)
                    this.secondCardArray[riverIndex].showCard(false)
                }
            }
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

        this.mainBet.sendConsumeInfo();
    }
    ,
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

    }
    ,
    setBetButtonOdds: function (oddslist)
    {
        var counter = 0;
        var highOddsArray = this.getHighOddsArray(oddslist);

        for (var i = oddslist.length - 1; i >= 0; i--)
        {
            var odds = oddslist[i];
            var type = getSuper7PKBetTypeByVavlue(i);

            for (var j = 0; j < this.secBetArray.length; j++)
            {
                if (this.secBetArray[j].bettype == type)
                {
                    if (odds > 0)
                    {
                        this.secBetArray[j].setOddsText(odds);
                        if (odds == highOddsArray[0] || odds == highOddsArray[1])
                            this.secBetArray[j].showHighOdds(true);
                    }
                    else
                    {
                        this.secBetArray[j].setEnable(false);
                    }
                }
            }
        }
    }
    ,
    setOddsWindow: function (oddslist)
    {
        var counter = 0;

        var oddsArray = [];
        window.console.log("oddslist:", oddslist);
        var highOddsArray = this.getHighOddsArray(oddslist);

        for (var i = 0; i < oddslist.length; i++)
        {
            var obj = {};
            if (oddslist[i] <= 0)
                continue;
            obj.type = getSuper7PKBetTypeByVavlue(i);
            obj.value = oddslist[i];
            oddsArray.push(obj);
        }

        this.oddsWindow.setValueArray(oddsArray);
    }
    ,
    getHighOddsArray: function (array)
    {
        var counter = 0;
        var maxOdds = 0;
        var secMaxodds = 0;
        for (var i = 0; i < array.length; i++)
        {
            if (array[i] > 0 && array[i] > maxOdds)
            {
                secMaxodds = maxOdds;
                maxOdds = array[i];
            }
        }
        var highOddsArray = [];
        highOddsArray.push(maxOdds);
        highOddsArray.push(secMaxodds);
        return highOddsArray;
    }
    ,
    showBetValue: function (array)
    {
        var totalBet = 0;
        for (var i = 0; i < array.length; i++)
            totalBet += array[i].value;

        var betArray = [];
        if (totalBet == 0)
        {
            betArray.length = 0;
            for (var i = 0; i < this.updateOdds.length; i++)
            {
                if (this.updateOdds[i] <= 0)
                    continue;
                var obj = {};
                obj.value = 0;
                obj.type = getSuper7PKBetTypeByVavlue(i);
                betArray.push(obj);
            }
        }
        else
        {
            betArray = array.slice();
        }
        this.betInfoWindow.setBetValueArray(betArray);
        this.betInfoWindow.setBetTotalValue(totalBet);
    }
    ,
    showHandCombination: function (array)
    {
        window.console.log("HandCombination:", array)
        for (var i = 0; i < this.secondCardArray.length; i++)
        {
            for (var j = 0; j < array.length; j++)
            {
                if (this.secondCardArray[i].isCardEqual(array[j]))
                {
                    this.secondCardArray[i].y = 760;
                    this.secondCardArray[i].showBlackMask(false);
                    break;
                }
                else if (j == array.length - 1)
                {
                    window.console.log("CardSuit", this.secondCardArray[i].suit, this.secondCardArray[i].point);

                    this.secondCardArray[i].showBlackMask(true);
                    //   this.secondCardArray[i].y = 760 + 100;
                    this.game.add.tween(this.secondCardArray[i]).to({y: 860}, 600, Phaser.Easing.Sinusoidal.InOut, true);
                }
            }
        }
    }
    ,
    selectCredit: function (value)
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
    }
    ,
    showSettleValue: function (results)
    {
        var betTotal = 0;
        var settleTotal = 0;
        var settleArray = [];
        for (var i = 0; i < results.length; i++)
        {
            var obj = [];
            var betAmount = results[i][BetNameTag.BetAmount];
            var settleAmount = results[i][BetNameTag.SettleAmount];
            var betType = results[i][BetNameTag.BetType];
            obj.type = betType;
            obj.value = settleAmount;
            obj.bet = betAmount;
            settleArray.push(obj);
            settleTotal += Number(settleAmount);
            betTotal += Number(betAmount);
        }

        if (betTotal > 0)
        {
            for (var i = settleArray.length - 1; i >= 0; i--)
            {
                if (settleArray[i].bet == 0)
                {
                    settleArray.splice(i, 1);
                }
            }
        }
        else
        {
            settleArray.length = 0;
            for (var i = 0; i < this.updateOdds.length; i++)
            {
                if (this.updateOdds[i] <= 0)
                    continue;
                var obj = {};
                obj.type = getSuper7PKBetTypeByVavlue(i);
                obj.value = 0;
                settleArray.push(obj);
            }
        }

        window.console.log("settle total:" + settleTotal);
        this.betInfoWindow.showSettleValue(true);
        this.betInfoWindow.setSettleValueArray(settleArray);
        this.betInfoWindow.setSettleTotalValue(settleTotal);
    },
    showWinMessage: function (results)
    {
        for (var i = 0; i < results.length; i++)
        {
            var winstate = results[i][BetNameTag.WinState];
            var betType = results[i][BetNameTag.BetType];

            if (winstate != WinnerNameTag.WSLost)
            {
                window.console.log("winstate" + i + ":" + winstate);
                window.console.log("bettype" + i + ":" + betType);

                if (winstate == WinnerNameTag.WSWin)
                {
                    this.oddsWindow.blinkType(betType, true);
                    if (betType == BetTypeEnum.Super7PK.S7PKNone)
                    {
                        window.console.log("ShowHigh");
                        this.showMessage(GameMessageEnum.High, 10)
                    }
                    else
                    {
                        this.specialWinEffect.show();
                        ;
                        this.specialWinEffect.setWinType(betType);
                    }

                }
                else
                {
                    this.specialWinEffect.show();
                    this.specialWinEffect.setWinType(winstate);
                }
                break;
            }
        }

        for (var i = 0; i < results.length; i++)
        {
            var winstate = results[i][BetNameTag.WinState];
            var betType = results[i][BetNameTag.BetType];
            if (winstate != WinnerNameTag.WSLost)
            {
                if (winstate == WinnerNameTag.WSWin)
                {
                    this.oddsWindow.blinkType(betType, true);
                }
            }
        }
    }
    ,
    showMessage: function (value, time)
    {
        this.gamemessage.showMessage(value, time);
    }
    ,
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