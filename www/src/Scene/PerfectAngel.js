/* jshint browser:true */

// create Game function in BasicGame
BasicGame.PerfectAngel = function (game)
{

};

// set Game function prototype
BasicGame.PerfectAngel.prototype = {


    preload: function ()
    {
        // Here we load the assets required for our preloader (in this case a
        // Background and a loading bar)
    },

    init: function ()
    {
        this.isFirstGame = true;
        this.isRefresh = true;

        this.prepareSendBetType = -1;
        this.lastBetType = -1;
        this.client = Client.getInstance();
        this.gameRound = 0;
        this.gameID = "";
        this.gameType = "PerfectAngel";
        this.onBlurTime = 0;
        this.currentState = -2;

        this.betArray = [];
        this.coinbtnArray = [];
        this.playerComb = [];
        this.bankerComb = [];
    }
    ,

//*************************************************************************************************************

    create: function ()
    {
        if (CustomConfig.DebugMode == true)
            this.game.time.advancedTiming = true;



        var background = this.add.sprite(this.world.centerX, this.world.centerY, SheetName.PerfectAngelMain, SpriteName.Background);
        background.anchor.setTo(0.5, 0.5);
        background.width = 1920;
        background.height = 1080;

        var wing = this.add.sprite(600, 30, SheetName.PerfectAngelMain, SpriteName.Wing);

        this.betTable = this.add.sprite(0, 0, SheetName.PerfectAngelMain, SpriteName.BetTable);
        this.betTable.y = this.game.height - this.betTable.height;

        this.cardTable = new PerfectCardTable(this.game, 0, 0);
        this.add.existing(this.cardTable);
        this.cardTable.x = 0;
        this.cardTable.y = this.game.height - this.cardTable.height;
//*************************************************************************************************************
        var betcallback = function (betRetValue, betType)
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

        var betBtn = new PerfectBetButton(this.game, 390, 540, BetTypeEnum.PerfectAngel.BetPAAngel, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 1125, 540, BetTypeEnum.PerfectAngel.BetPAEvil, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 100, 540, BetTypeEnum.PerfectAngel.BetPABigAngel, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 1500, 540, BetTypeEnum.PerfectAngel.BetPABigEvil, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 40, 730, BetTypeEnum.PerfectAngel.BetPAPerfectAngel, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 1530, 730, BetTypeEnum.PerfectAngel.BetPAUnbeatenEvil, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 810, 705, BetTypeEnum.PerfectAngel.BetPATiePoint, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);
        var betBtn = new PerfectBetButton(this.game, 820, 540, BetTypeEnum.PerfectAngel.BetPABothNone, betcallback, this)
        this.betTable.addChild(betBtn);
        this.betArray.push(betBtn);

        for (var i = 0; i < this.betArray.length; i++)
        {
            this.betArray[i].y = this.betArray[i].y - this.betTable.height / 2 + 50;
        }

//*************************************************************************************************************

        var coincallback = function ()
        {
            for (var i = 0; i < this.coinbtnArray.length; i++)
                this.coinbtnArray[i].release();
        };
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

//****************************************************************************************************************
        this.againbtn = this.add.button(1740, 975, SheetName.Button, function ()
        {
            this.onAgainClick();
        }, this, SpriteName.Button.AgainButton + 0, SpriteName.Button.AgainButton + 0, SpriteName.Button.AgainButton + 1);
        this.againbtn.visible = false;
        this.help = this.add.button(25, 960, SheetName.Button, function ()
        {
            this.tutorialMenu.openWindow();
        }, this, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 0, SpriteName.Button.HelpButton + 1);


        this.gamemessage = new GameMessage(this.game, 0, 0);
        this.gamemessage.position.x = (this.game.width - this.gamemessage.width) / 2;
        this.add.existing(this.gamemessage);

//****************************************************************************************************************
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

        this.dealer = this.add.sprite(600, 30, SheetName.PerfectAngelMain, SpriteName.Dealer + 0);

        this.historyWindow = new PerfectHistoryWindow(this.game, 1270, 80);
        this.add.existing(this.historyWindow);

        this.oddsWindow = new PerfectOddsWindow(this.game, 36, 80);
        this.add.existing(this.oddsWindow);
        this.betInfoWindow = new PerfectBetWindow(this.game, 1250, 80);
        this.add.existing(this.betInfoWindow);

        this.bonushinet = new PerfectBonusHint(this.game, 0, 0);
        this.oddsWindow.addChild(this.bonushinet);
        this.bonushinet.position.setTo(40, 340);

//*************************************************************************************************************
        this.marioslot = new PerfectMarioSlot(this.game);
        this.add.existing(this.marioslot);

        this.bonusPoint = new PerfectBonusPoint(this.game, 840, 380);
        this.add.existing(this.bonusPoint);

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

        this.pokerOpenEffect = new PokerOpenWindow(this.game);
        this.add.existing(this.pokerOpenEffect);
        this.pokerOpenEffect.close();

        this.winEffect = new WinEffect(this.game, 200, 200);
        this.add.existing(this.winEffect);
        this.winEffect.scale.setTo(0.5);
        this.winEffect.visible = false;

        this.infoMenu = new InfoMenu(this.game, 0, 0, this.exitScene, this);
        this.add.existing(this.infoMenu);
        this.infoMenu.closeMenu();

        this.tutorialMenu = new TutorialWindow(this.game, GameTypeNameTag.PerfectAngel);
        this.add.existing(this.tutorialMenu);
        this.tutorialMenu.closeWindow();

        this.client.setCallBack(this.handleCmd, this);
        this.game.onFocus.add(this.onFocus, this);
        this.game.onBlur.add(this.onBlur, this);

        GameMgr.getInstance().registerListener(function ()
        {
            this.updateUI();
        }, this);

        this.updateUI();
        this.selectCoin(CoinEnum.Coin1k);
        this.selectState(GameStateNameTag.NonState);

        this.msgwindow = new MessageWindow(this.game);
        this.add.existing(this.msgwindow);
        this.msgwindow.hide();

    },

//*************************************************************************************************************

    update: function ()
    {
    },
    gameResized: function (width, height)
    {
        // This could be handy if you need to do any extra processing if the
        // game resizes. A resize could happen if for example swapping
        // orientation on a device or resizing the browser window. Note that
        // this callback is only really useful if you use a ScaleMode of RESIZE
        // and place it inside your main game state.
    },
    /**
     *   Handle server json
     */
    handleCmd: function (object)
    {
        //if(object.hasOwnProperty(WebSocketNameTag.Result))
        //{
        //    var result = object[WebSocketNameTag.Result];
        //    if(result == -1)
        //    {
        //         this.client.closenConnetcion();
        //        return;
        //    }
        //}
        if (object.hasOwnProperty("message"))
        {
            if (object["code"] == WebSocketStatusEnum.Disconnected)
                this.msgwindow.showDefault(SystemMessageEnum.Disconnected);
        }
        if (object.hasOwnProperty(WebSocketNameTag.MessageType))
        {
            if (object[WebSocketNameTag.MessageType] == MessageNameTag.PlayerBet)
            {
                this.confirmConsume(object);
            }

            else if (object[WebSocketNameTag.MessageType] == MessageNameTag.EnterGame)
            {
                this.playerEnterGame(object);

            }
            else if (object[WebSocketNameTag.MessageType] == MessageNameTag.UpdateInfo)
            {
                this.isRefresh = true;
                this.playerEnterGame(object);
            }

            else if (object[WebSocketNameTag.MessageType] == MessageNameTag.KickOut)
            {
                this.msgwindow.showDefault(SystemMessageEnum.KickOut);
            }

        }
//*************************************************************************************************************
        //Handle state message
        if (object[WebSocketNameTag.GameState] == GameStateNameTag.PerfectAngel.NewRoundState)
        {
            window.console.log("Enter NewRoundState");
            this.selectState(GameStateNameTag.PerfectAngel.NewRoundState);

            if (object.hasOwnProperty(WebSocketNameTag.RecordList))
                this.showHistory(object[WebSocketNameTag.RecordList]);
            if (object.hasOwnProperty(WebSocketNameTag.GameRound))
            {
                this.gameRound = object[WebSocketNameTag.GameRound];
                this.roundBar.setValue(this.gameRound);
            }
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.PerfectAngel.StartBetState)
        {
            this.selectState(GameStateNameTag.PerfectAngel.StartBetState);
            this.showMessage(GameMessageEnum.PlzBet, 2);
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
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.PerfectAngel.EndBetState)
        {
            this.selectState(GameStateNameTag.PerfectAngel.EndBetState);
            this.marioslot.initial();
            this.game.time.events.repeat(2000, 0, function ()
            {
                this.marioslot.show();
                this.marioslot.start();
            }, this);

        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.PerfectAngel.OpenState)
        {
            this.selectState(GameStateNameTag.PerfectAngel.OpenState);
            var playerComb = object[WebSocketNameTag.PlayerComb];
            var bankerComb = object[WebSocketNameTag.BankerComb];
            this.playerComb = playerComb;
            this.bankerComb = bankerComb;

            this.showCard(object, playerComb, bankerComb);
        }
        else if (object[WebSocketNameTag.GameState] == GameStateNameTag.PerfectAngel.EndRoundState)
        {
            this.selectState(GameStateNameTag.PerfectAngel.EndRoundState);
            if (object.hasOwnProperty(WebSocketNameTag.CardList))
            {
                var playerComb = object[WebSocketNameTag.PlayerComb];
                var bankerComb = object[WebSocketNameTag.BankerComb];
                this.playerComb = playerComb;
                this.bankerComb = bankerComb;
                this.showCard(object, playerComb, bankerComb);
            }

            var resultList = object[WebSocketNameTag.ResultList];

            this.showSettleValue(resultList);
            this.showResult(resultList);
        }

        this.isFirstGame = false;
        this.isRefresh = false;
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
            case GameStateNameTag.PerfectAngel.NewRoundState:
                this.onNewRoundState();
                break;
            case GameStateNameTag.PerfectAngel.StartBetState:
                this.onStartBetState();
                break;
            case GameStateNameTag.PerfectAngel.EndBetState:
                this.onEndBetState();
                break;
            case GameStateNameTag.PerfectAngel.OpenState:
                this.onOpenState();
                break;
            case GameStateNameTag.PerfectAngel.EndRoundState:
                this.onEndRoundState();
                break;
        }
        this.currentState = value;
    }
    ,
    onNonState: function ()
    {
        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].visible = false;
        for (var i = 0; i < this.betArray.length; i++)
        {
            this.betArray[i].setEnable(false);
            this.betArray[i].initial();
            this.betArray[i].visible = false;
        }
        this.againbtn.visible = false;
        this.counter.visible = false;
        this.betInfoWindow.visible = false;
        this.cardTable.visible = false;
        this.bonusPoint.visible = false;
        this.bonushinet.visible = false;
        this.winEffect.visible = false;
        this.playerComb = null;
        this.bankerComb = null;
        this.cardTable.initial();
        this.marioslot.close();
        this.marioslot.initial();
        this.dealer.frameName = SpriteName.Dealer + 0;
    }
    ,
    onNewRoundState: function ()
    {
        for (var i = 0; i < this.betArray.length; i++)
        {
            this.betArray[i].visible = true;
            this.betArray[i].setEnable(false);
            this.betArray[i].initial();
        }

        this.againbtn.visible = false;
        this.counter.visible = false;
        this.historyWindow.visible = true;
        this.betInfoWindow.visible = false;
        this.bonusPoint.visible = false;
        this.bonushinet.visible = false;
        this.cardTable.initial();
        this.cardTable.visible = false;
        this.winEffect.visible = false;
        this.marioslot.close();
        this.marioslot.initial();
        this.dealer.frameName = SpriteName.Dealer + 0;
    },
    onStartBetState: function ()
    {
        var totalLastBetValue = 0;
        for (var i = 0; i < this.betArray.length; i++)
        {
            totalLastBetValue += Number(this.betArray[i].lastbetCredit);
            this.betArray[i].setEnable(true);
        }

        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].visible = true;
        this.againbtn.visible = (totalLastBetValue > 0 ? true : false);
        for (var i = 0; i < this.betArray.length; i++)
            this.betArray[i].visible = true;
    }
    ,
    onEndBetState: function ()
    {
        this.counter.stop();
        this.counter.visible = false;
        this.historyWindow.visible = false;
        this.betInfoWindow.visible = true;
        this.cardTable.visible = true;
        this.betInfoWindow.showSettleValue(false);
        this.gamemessage.hide();
        for (var i = 0; i < this.coinbtnArray.length; i++)
            this.coinbtnArray[i].visible = false;
        for (var i = 0; i < this.betArray.length; i++)
            this.betArray[i].visible = false;
        this.againbtn.visible = false;

    }
    ,
    onOpenState: function ()
    {
        this.gamemessage.hide();
        this.cardTable.visible = true;
        this.historyWindow.visible = false;
        this.betInfoWindow.visible = true;
    }
    ,
    onEndRoundState: function ()
    {
        this.cardTable.visible = true;
        this.historyWindow.visible = false;
        this.betInfoWindow.visible = true;
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
    }
    ,
    updateUI: function ()
    {
        this.cashBar.setValue(GameMgr.getInstance().credit);
        this.infoMenu.setCredit(GameMgr.getInstance().credit);
        this.infoMenu.setName(GameMgr.getInstance().name);
        this.updateBetButton();
        this.updateBetCoin();
    }
    ,
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
    },
    playerEnterGame: function (object)
    {
        if(object.hasOwnProperty(WebSocketNameTag.GameRound))
        {
            this.gameRound = object[WebSocketNameTag.GameRound];
            this.roundBar.setValue(this.gameRound);
        }
        if(object.hasOwnProperty(WebSocketNameTag.GameID))
            this.gameID = object[WebSocketNameTag.GameID];
        if(object.hasOwnProperty(WebSocketNameTag.GameType))
            this.gameType = object[WebSocketNameTag.GameType];

        if (object.hasOwnProperty(WebSocketNameTag.RecordList))
            this.showHistory(object[WebSocketNameTag.RecordList]);

        var betList = object[WebSocketNameTag.BetList]
        if (betList != null)
        {
            var totalBet = 0;
            var betArray = [];

            for (var key in betList)
            {
                var betvalue = betList[key];
                totalBet += Number(betvalue);
                var obj = {};
                obj.type = key;
                obj.value = betvalue;
                betArray.push(obj);

                for (var key2 in this.betArray)
                {
                    if (this.betArray[key2].bettype == key)
                    {
                        this.betArray[key2].setNewStateBetValue(betvalue);
                        this.betArray[key2].setNewStateBetValue(betvalue);
                        break;
                    }
                }

                this.showBetValue(betArray);
            }
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
                this.historyWindow.setPoint(i, record[RecordNameTag.Winner], record[RecordNameTag.Point]);
                this.historyWindow.showPoint(i, true);
            }
            else
                this.historyWindow.showPoint(i, false);
        }
    }
    ,
    showBetValue: function (array)
    {
        var totalBet = 0;
        for (var i = 0; i < array.length; i++)
            totalBet += array[i].value;

        this.betInfoWindow.setBetValueArray(array);
        this.betInfoWindow.setBetTotalValue(totalBet);
    }
    ,
    showCard: function (object, playerComb, bankerComb)
    {
        window.console.log("ShowCard");
        var cardType = object[WebSocketNameTag.CardType];
        var cardInfo = object[WebSocketNameTag.CardsInfo];

        var target;
        var index;
        var nexttarget;
        var nextindex;
        var playerCardArray = cardInfo[CardTypeNameTag.PlayerList];
        var bankerCardArray = cardInfo[CardTypeNameTag.BankerList];
        var extraCardArray = cardInfo[CardTypeNameTag.ExtraList];

        switch (cardType)
        {
            case CardTypeNameTag.Player:
                target = CardTargetEnum.Player;
                index = playerCardArray.length - 1;
                break;
            case CardTypeNameTag.Banker:
                target = CardTargetEnum.Banker;
                index = bankerCardArray.length - 1;
                break;
            case CardTypeNameTag.Extra:
                target = CardTargetEnum.Extra;
                index = extraCardArray.length - 1;
                break;
        }
        nexttarget = target;
        nextindex = index;
        this.cardTable.showHalo(nexttarget, nextindex);
        if(target != CardTargetEnum.Extra)
            this.marioslot.close();

        if (extraCardArray.length >= 1)
        {

            this.bonusPoint.setPoint(extraCardArray[0]);
            this.bonushinet.setPoint(extraCardArray[0]);

            if (target == CardTargetEnum.Extra)
            {
                if (this.isFirstGame || this.isRefresh)
                {
                    this.bonushinet.visible = true;
                    this.bonusPoint.visible = true;
                }
                else
                {
                    this.marioslot.setPoint(extraCardArray[0]);
                    this.marioslot.setCallback(function ()
                    {
                        this.marioslot.close();
                        this.bonushinet.visible = true;
                        this.bonusPoint.visible = true;
                    }, this);
                }
            }
            else
            {
                this.bonushinet.visible = true;
                this.bonusPoint.visible = true;
            }

        }


        for (var i = 0; i < playerCardArray.length; i++)
        {
            this.cardTable.setCardSuitPoint(CardTargetEnum.Player, i, playerCardArray[i]);
            //If isFirstGame is true,
            //ShowCard will skip all effects and open instantly.

            if (this.isFirstGame || this.isRefresh)
            {
                this.cardTable.showCard(CardTargetEnum.Player, i, false);

                if ((playerComb != null) && i == (playerCardArray.length - 1))
                {
                    // Order Card position to two parts.
                    // THe bottom part is set of ten of combination.
                    // The others are upper part.
                    this.cardTable.orderCard(playerComb, CardTargetEnum.Player, false);
                }
            }
            else
            {
                if (index == i && (target == CardTargetEnum.Player))
                {
                    if (index >= 3)
                    {
                        this.cardTable.setCardSuitPoint(CardTargetEnum.Player, i, playerCardArray[i]);
                        nexttarget = CardTargetEnum.Player;
                        nextindex = index;
                        this.cardTable.showHalo(nexttarget, nextindex);


                        this.pokerOpenEffect.showCardByObj(playerCardArray[i], function ()
                        {
                            this.cardTable.showCard(CardTargetEnum.Player, index, false);

                            this.pokerOpenEffect.close();

                            if (playerComb != null)
                                this.cardTable.orderCard(playerComb, CardTargetEnum.Player, true);
                            nexttarget = CardTargetEnum.Banker;
                            nextindex = index;
                            this.cardTable.showHalo(nexttarget, nextindex);
                        }, this);
                    }
                    else
                    {
                        if (playerComb != null)
                            this.cardTable.showCard(CardTargetEnum.Player, index, true, function ()
                            {
                                // Order Card position to two parts.
                                this.cardTable.orderCard(playerComb, CardTargetEnum.Player, true);
                            }, this);
                        else
                            this.cardTable.showCard(CardTargetEnum.Player, index, true);

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
            this.cardTable.setCardSuitPoint(CardTargetEnum.Banker, i, bankerCardArray[i]);
            if (this.isFirstGame || this.isRefresh)
            {
                this.cardTable.showCard(CardTargetEnum.Banker, i, false);

                if (bankerComb != null && (i == bankerCardArray.length - 1))
                {
                    // Order Card position to two parts.
                    this.cardTable.orderCard(bankerComb, CardTargetEnum.Banker, false);
                }
            }
            else
            {
                if (index == i && (target == CardTargetEnum.Banker))
                    if (index >= 3)
                    {
                        this.cardTable.setCardSuitPoint(CardTargetEnum.Banker, i, bankerCardArray[i]);
                        nexttarget = CardTargetEnum.Banker;
                        nextindex = index;

                        if (nextindex < 5)
                            this.cardTable.showHalo(nexttarget, nextindex);

                        this.pokerOpenEffect.showCardByObj(bankerCardArray[i], function ()
                        {
                            this.cardTable.showCard(CardTargetEnum.Banker, index, false);

                            //      this.cardTable.showTargetPoint(CardTargetEnum.Banker);
                            this.pokerOpenEffect.close();

                            if (bankerComb != null)
                                this.cardTable.orderCard(bankerComb, CardTargetEnum.Banker, true);

                            nexttarget = CardTargetEnum.Player;
                            nextindex = index + 1;
                            if (nextindex < 5)
                                this.cardTable.showHalo(nexttarget, nextindex);
                            else
                            {
                                nexttarget = CardTargetEnum.None;
                                this.cardTable.showHalo(nexttarget, nextindex);
                            }

                        }, this);
                    }
                    else
                    {
                        if (bankerComb != null)
                            this.cardTable.showCard(CardTargetEnum.Banker, index, true, function ()
                            {
                                // Order Card position to two parts.
                                this.cardTable.orderCard(bankerComb, CardTargetEnum.Banker, true);
                            }, this);
                        else
                            this.cardTable.showCard(CardTargetEnum.Banker, index, true);
                        nexttarget = CardTargetEnum.Player;
                        nextindex = index + 1;

                        if (nextindex < 5)
                            this.cardTable.showHalo(nexttarget, nextindex);
                    }
                else
                    this.cardTable.showCard(CardTargetEnum.Banker, i, false);

            }
        }
    }
    ,
    showSettleValue: function (results)
    {
        var settleTotal = 0;
        var settleArray = [];
        for (var i = 0; i < results.length; i++)
        {
            var settleAmount = results[i][BetNameTag.SettleAmount];
            var betType = results[i][BetNameTag.BetType];
            var settleContent = new Object();

            settleContent.type = betType;
            settleContent.value = settleAmount;
            settleTotal += Number(settleAmount);
            settleArray.push(settleContent);
        }
        this.betInfoWindow.showSettleValue(true);
        this.betInfoWindow.setSettleValueArray(settleArray);
        this.betInfoWindow.setSettleTotalValue(settleTotal);
    }
    ,
    showResult: function (results)
    {
        this.cardTable.showRoundResult(this.playerComb, this.bankerComb);

        for (var i = 0; i < results.length; i++)
        {
            var winstate = results[i][BetNameTag.WinState];
            var betType = results[i][BetNameTag.BetType];

            if (winstate != WinnerNameTag.WSLost)
            {

                window.console.log("win bet type:" + betType);
                if (betType == BetTypeEnum.PerfectAngel.BetPAAngel)
                {
                    this.winEffect.position.setTo(150, 860);
                    this.winEffect.visible = true;
                }
                else if (betType == BetTypeEnum.PerfectAngel.BetPAEvil)
                {
                    this.winEffect.position.setTo(1760, 860);
                    this.winEffect.visible = true;
                }
                break;
            }
        }
    }
    ,
    showMessage: function (value, time)
    {
        this.gamemessage.showMessage(value, time);
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
    render: function()
    {
        if (CustomConfig.DebugMode == true)
            this.game.debug.text(this.game.time.fps, 2, 60, "#00ff00", '60px Arial');
    }
}