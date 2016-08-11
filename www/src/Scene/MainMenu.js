/* jshint browser:true */

// create Game function in BasicGame
BasicGame.MainMenu = function (game)
{
};

// set Game function prototype
BasicGame.MainMenu.prototype = {


    preload: function ()
    {

    },

    create: function ()
    {
        window.console.log("MainMenuState");

        this.client = Client.getInstance();
        this.client.setCallBack(this.handleCmd, this);

        this.base = new Phaser.Group(this.game);
        this.add.existing(this.base);

        var background = new Phaser.Sprite(this.game, 0, 0, SheetName.LobbyMain, SpriteName.Background);
        this.base.add(background);
        background.width = 1920;
        background.height = 1080;

        this.btnArray = [];
        var button = new LobbyMainButton(this.game,190,240,function()
        {
            this.selectGame(GameSceneEnum.BigWin)},this,GameSceneEnum.BigWin);
        this.base.add(button);
        this.btnArray.push(button);

        var button = new LobbyMainButton(this.game,190 + button.width-20,240,function()
        {
            this.selectGame(GameSceneEnum.PerfectAngel)},this,GameSceneEnum.PerfectAngel);
        this.base.add(button);
        this.btnArray.push(button);

        var button = new LobbyMainButton(this.game,190 +(button.width -20)*2,240,function()
        {
            this.selectGame(GameSceneEnum.Super7PK)},this,GameSceneEnum.Super7PK);
        this.base.add(button);
        this.btnArray.push(button);

        var button = new LobbyMainButton(this.game,190 +(button.width -20) *3,240,function()
        {},this);
        this.base.add(button);
        this.btnArray.push(button);

        this.game.time.events.loop(Phaser.Timer.SECOND * 1, function()
        {
            this.btnArray[util.randomValue(0,this.btnArray.length)].playEffectOnce();
        }, this);

        var curtain = new Phaser.Sprite(this.game,0,0,SheetName.LobbyMain,SpriteName.Lobby.Curtain);
        this.base.add(curtain);
        var curtain = new Phaser.Sprite(this.game,1920,0,SheetName.LobbyMain,SpriteName.Lobby.Curtain);
        this.base.add(curtain);
        curtain.scale.x = -1;

        var keyArray = [];
        for(var key in GameTypeEnum)
            keyArray.push(key);

        for(var i = 0 ; i < 3 ; i++)
        {
            button = new LobbySideButton(this.game,0,0,function(){},this,GameTypeEnum[keyArray[i]]);
            this.base.add(button);
            button.position.setTo(240+button.width/2+(button.width+40)*i,840+button.height/2);
        }

        this.menuBtn = new Phaser.Button(this.game, 50, 15, SheetName.System,
            function ()
            {
                this.infoMenu.showMenu();
            },
            this, SpriteName.MenuButton + 0, SpriteName.MenuButton + 0, SpriteName.MenuButton + 1);
        this.base.add(this.menuBtn);

        this.cashBar = new CashBar(this.game, 1445, 10);
        this.base.add(this.cashBar);

        this.infoMenu = new InfoMenu(this.game, 0, 0, this.exitScene, this);
        this.base.add(this.infoMenu);
        this.infoMenu.setLobbyEnabled(false);
        this.infoMenu.closeMenu();

        GameMgr.getInstance().registerListener(function(){this.updateUI();},this);
    },

    update: function ()
    {

    },
    handleCmd: function (jsonObj)
    {
        if (jsonObj[WebSocketNameTag.GameType] == GameTypeNameTag.Lobby && jsonObj[WebSocketNameTag.MessageType] == MessageNameTag.Login)
        {
            window.console.log("Select Game");
            var playerInfo = jsonObj[WebSocketNameTag.PlayerInfo];
            this.gameList = jsonObj[WebSocketNameTag.GameList];

            GameMgr.getInstance().credit = Math.floor(playerInfo[WebSocketNameTag.PlayerCredit]);
            GameMgr.getInstance().uuid = playerInfo[WebSocketNameTag.PlayerUUID];
            GameMgr.getInstance().name = playerInfo[WebSocketNameTag.PlayerName];
            GameMgr.getInstance().account = playerInfo[WebSocketNameTag.PlayerAccount];
            GameMgr.getInstance().id = playerInfo[WebSocketNameTag.PlayerID];

        }
        else if (jsonObj[WebSocketNameTag.GameType] == GameTypeNameTag.Lobby)
        {
            return;
        }
    },
    selectGame: function (value)
    {
        var id;
        var type;
        var msgtpye = MessageNameTag.EnterGame;

        switch (value)
        {
            case GameSceneEnum.BigWin:
                type = GameTypeNameTag.BigWin;
                BasicGame.currentStage = "BigWin";
                id = this.getGameID(type);
                this.game.state.start(GameSceneEnum.BigWin);
                break;
            case GameSceneEnum.Super7PK:
                type = GameTypeNameTag.Super7PK;
                id = this.getGameID(type);
                BasicGame.currentStage = "Super7PK";
                this.game.state.start(GameSceneEnum.Super7PK);
                break;
            case GameSceneEnum.PerfectAngel:
                type = GameTypeNameTag.PerfectAngel;
                id = this.getGameID(type);
                BasicGame.currentStage = "PerfectAngel";
                this.game.state.start(GameSceneEnum.PerfectAngel);
                break;
        }

        if (BasicGame.gameMode == GameModeEnum.Online)
        {
            var ret = {};
            ret[WebSocketNameTag.ID] = 1010;
            ret[WebSocketNameTag.GameID] = id;
            ret[WebSocketNameTag.TimeStamp] = util.getTimeStamp();
            ret[WebSocketNameTag.MessageType] = msgtpye;
            var retjson = JSON.stringify(ret);
            BasicGame.gameid = id;
            this.client.sendMessage(retjson);
        }
    },

    getGameID: function (type)
    {
        var id;
        for (var key in this.gameList)
        {
            if (this.gameList[key][WebSocketNameTag.GameType] == type)
                return this.gameList[key][WebSocketNameTag.GameID];
        }
    }
    ,
    updateUI: function ()
    {
        this.cashBar.setValue(GameMgr.getInstance().credit);
        this.infoMenu.setCredit(GameMgr.getInstance().credit);
        this.infoMenu.setName(GameMgr.getInstance().name);
    },
};
 