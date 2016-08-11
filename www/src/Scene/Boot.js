BasicGame = {


    /* Here we've just got some global level vars that persist regardless of State swaps */

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Bomber.orientated in internal loops to know if it should pause or not */
    orientated: false,

    currentCoin: 0,
    currentStage: null,
    gameMode: 0,
    gameid : null

};

BasicGame.Boot = function (game)
{
};

BasicGame.Boot.prototype = {

    preload: function ()
    {

        this.load.image('preloaderBar', 'asset/image/preload.png');

        this.load.atlas(SheetName.Login, 'asset/texture/login/loginsheet.png', 'asset/texture/login/loginsheet.json');
    },

    create: function ()
    {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

        }
        window.console.log("BootState");

        BasicGame.gameMode = CustomConfig.GameMode;
        this.state.start(GameSceneEnum.Preloader);

    },

    gameResized: function (width, height)
    {
    },

    enterIncorrectOrientation: function ()
    {

        BasicGame.orientated = false;

       // document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function ()
    {

        BasicGame.orientated = true;

      //  document.getElementById('orientation').style.display = 'none';
    },

};