BasicGame.Preloader = function (game)
{

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    init: function ()
    {

    },
    preload: function ()
    {
        this.load.image(SpriteName.White, 'asset/white.png');
        this.bg = this.add.sprite(0, 0, SheetName.Login, SpriteName.LoginBg);
        this.loginbarbg = this.add.sprite(0, 0, SheetName.Login, SpriteName.LoginBarBg);
        this.loginbarbg.position.setTo((this.game.width - this.loginbarbg.width) / 2, 800);
        this.loginbar = new Phaser.Sprite(this.game, 0, 0, SheetName.Login, SpriteName.LoginBar);
        this.loginbarbg.addChild(this.loginbar);
        this.loginbar.position.setTo((this.loginbarbg.width - this.loginbar.width) / 2, (this.loginbarbg.height - this.loginbar.height) / 2);
        this.load.setPreloadSprite(this.loginbar);

        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.addOnce(this.loadSpriteComplete, this);

        this.load.atlas(SheetName.Messages, 'asset/texture/common/message/messagesheet.png', 'asset/texture/common/message/messagesheet.json');
        this.load.atlas(SheetName.Common, 'asset/texture/common/commonsheet.png', 'asset/texture/common/commonsheet.json');
        this.load.atlas(SheetName.Windows, 'asset/texture/common/window/windowsheet.png', 'asset/texture/common/window/windowsheet.json');
        this.load.atlas(SheetName.Windows, 'asset/texture/common/window/windowsheet.png', 'asset/texture/common/window/windowsheet.json');
        this.load.atlas(SheetName.System, 'asset/texture/common/system/systemsheet.png', 'asset/texture/common/system/systemsheet.json');
        this.load.atlas(SheetName.BigWinMain, 'asset/texture/bigwin/main/bigwinmainsheet.png', 'asset/texture/bigwin/main/bigwinmainsheet.json');
        this.load.atlas(SheetName.BWBetButton, 'asset/texture/bigwin/button/betbuttonsheet.png', 'asset/texture/bigwin/button/betbuttonsheet.json');
        this.load.atlas(SheetName.BigWinOddsText, 'asset/texture/bigwin/odds/oddstext.png', 'asset/texture/bigwin/odds/oddstext.json');

        this.load.atlas(SheetName.InfoWindow, 'asset/texture/bigwin/window/infowindowsheet.png', 'asset/texture/bigwin/window/infowindowsheet.json');
        this.load.atlas(SheetName.WinEffect + 0, 'asset/texture/common/effect/wineffect0.png', 'asset/texture/common/effect/wineffect0.json');
        this.load.atlas(SheetName.WinEffect + 1, 'asset/texture/common/effect/wineffect1.png', 'asset/texture/common/effect/wineffect1.json');
        this.load.atlas(SheetName.WinEffect + 2, 'asset/texture/common/effect/wineffect2.png', 'asset/texture/common/effect/wineffect2.json');
        this.load.atlas(SheetName.SmallCard, 'asset/texture/common/poker/SmallCardSheet.png', 'asset/texture/common/poker/SmallCardSheet.json');

        this.load.atlas(SheetName.BigCard + 0, 'asset/texture/common/poker/BigCardSheet0.png', 'asset/texture/common/poker/BigCardSheet0.json');
        this.load.atlas(SheetName.BigCard + 1, 'asset/texture/common/poker/BigCardSheet1.png', 'asset/texture/common/poker/BigCardSheet1.json');
        this.load.atlas(SheetName.BigCard + 2, 'asset/texture/common/poker/BigCardSheet2.png', 'asset/texture/common/poker/BigCardSheet2.json');
        this.load.atlas(SheetName.BigCard + 3, 'asset/texture/common/poker/BigCardSheet3.png', 'asset/texture/common/poker/BigCardSheet3.json');

        this.load.atlas(SheetName.LobbyButton, 'asset/texture/lobby/lobbybutton.png', 'asset/texture/lobby/lobbybutton.json');
        this.load.atlas(SheetName.LobbyButton+2, 'asset/texture/lobby/lobbybutton2.png', 'asset/texture/lobby/lobbybutton2.json');
        this.load.atlas(SheetName.LobbyMain, 'asset/texture/lobby/lobbymain.png', 'asset/texture/lobby/lobbymain.json');

        this.load.atlas(SheetName.S7Main, 'asset/texture/s7pk/main/super7mainsheet.png', 'asset/texture/s7pk/main/super7mainsheet.json');
        this.load.atlas(SheetName.S7BetButton, 'asset/texture/s7pk/button/betbuttonsheet.png', 'asset/texture/s7pk/button/betbuttonsheet.json');
        this.load.atlas(SheetName.S7History, 'asset/texture/s7pk/history/historysheet.png', 'asset/texture/s7pk/history/historysheet.json');
        this.load.atlas(SheetName.S7OddsText, 'asset/texture/s7pk/odds/oddstext.png', 'asset/texture/s7pk/odds/oddstext.json');
        this.load.atlas(SheetName.S7BetInfo, 'asset/texture/s7pk/betinfo/betinfosheet.png', 'asset/texture/s7pk/betinfo/betinfosheet.json');


        this.load.atlas(SheetName.Button, 'asset/texture/common/button/buttonsheet.png', 'asset/texture/common/button/buttonsheet.json');
        this.load.atlas(SheetName.PerfectAngelMain, 'asset/texture/perfect/main/perfectmain.png', 'asset/texture/perfect/main/perfectmain.json');
        this.load.atlas(SheetName.PerfectBetButton, 'asset/texture/perfect/bet/betsheet.png', 'asset/texture/perfect/bet/betsheet.json');
        this.load.atlas(SheetName.PerfectOddsText, 'asset/texture/perfect/odds/oddstextsheet.png', 'asset/texture/perfect/odds/oddstextsheet.json');
        this.load.atlas(SheetName.PerfectMarioSlot, 'asset/texture/perfect/bonus/marioslotsheet.png', 'asset/texture/perfect/bonus/marioslotsheet.json')
        this.load.atlas(SheetName.Tutorial, 'asset/texture/common/tutorial/tutorialsheet.png', 'asset/texture/common/tutorial/tutorialsheet.json');
        this.load.atlas(SheetName.CoinSheet, 'asset/texture/common/coin/coinsheet.png', 'asset/texture/common/coin/coinsheet.json');
        this.load.atlas(SheetName.Setting, 'asset/texture/common/setting/setting.png', 'asset/texture/common/setting/setting.json');
        this.load.bitmapFont(SpriteFont.DigitNumber, 'asset/font/numberfont.png', 'asset/font/numberfont.xml');
        this.load.bitmapFont(SpriteFont.DigitNumber+2, 'asset/font/numberfont2.png', 'asset/font/numberfont2.xml');
        this.load.bitmapFont(SpriteFont.RollText, 'asset/font/rollfont.png', 'asset/font/rollfont.xml');

        this.load.atlas(SheetName.Tutorial+0, 'asset/texture/bigwin/tutorial/tutorial.png', 'asset/texture/bigwin/tutorial/tutorial.json');
        this.load.atlas(SheetName.Tutorial+1, 'asset/texture/s7pk/tutorial/tutorial.png', 'asset/texture/s7pk/tutorial/tutorial.json');
        this.load.atlas(SheetName.Tutorial+2, 'asset/texture/perfect/tutorial/tutorial.png', 'asset/texture/perfect/tutorial/tutorial.json');
    },

    create: function ()
    {
        window.console.log("PreloaderState");
        this.loginbar.cropEnabled = false;
    },

    update: function ()
    {

    }
    ,
    loadSpriteSheet: function ()
    {
        this.load.onLoadComplete.addOnce(this.loadSpriteSheetComplete, this);
        this.load.start();
    }
    ,
    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles)
    {
        //this.loginbar.scale.x = progress / 100;
    }
    ,
    loadSpriteComplete: function ()
    {
        window.console.log("loadSpritecomplete");

        if (BasicGame.gameMode == GameModeEnum.Online)
        {
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function ()
            {
                this.state.start(GameSceneEnum.Menu);
                this.client = Client.getInstance();
                this.client.openConnection();
            }, this);
        }
        else
        {
            this.state.start(GameSceneEnum.Menu);
        }
    }
    ,
    loadSpriteSheetComplete: function ()
    {
        window.console.log("loadSheetComplete");

    }
};