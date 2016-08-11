(function () {
    /* globals Phaser:false, BasicGame:false */
    //  Create your Phaser game and inject it into the game div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    //  We're using a game size of 640 x 480 here, but you can use whatever you feel makes sense for your game of course.


	var config = {  width: 1920  ,height: 1080,  renderer: Phaser.AUTO,  parent: 'game',
		transparent: false,  antialias: true,  forceSetTimeOut: false, preload : preload ,update:update,create:create}
	var game = new Phaser.Game(config);

  //  var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
	game.state.add(GameSceneEnum.Boot, BasicGame.Boot);
	game.state.add(GameSceneEnum.Preloader, BasicGame.Preloader);
	game.state.add(GameSceneEnum.Menu, BasicGame.MainMenu);
	game.state.add(GameSceneEnum.BigWin, BasicGame.BigWin);
	game.state.add(GameSceneEnum.Super7PK, BasicGame.Super7PK);
	game.state.add(GameSceneEnum.PerfectAngel,BasicGame.PerfectAngel);
	var resize = function(e)
    {
		window.console.log("window resize");
   	    var aspectRatio = 1920/1080;
   		if ((window.innerWidth / window.innerHeight) > aspectRatio)
   		{    
			game.scale.width = window.innerHeight * aspectRatio;	
			game.scale.height = window.innerHeight;
		}
		else if ((window.innerWidth / window.innerHeight) < aspectRatio)
   		{   
			game.scale.width = window.innerWidth;    
			game.scale.height = window.innerWidth / aspectRatio;  
   		}
   		else
		{    
			game.scale.width = window.innerWidth;   
       		game.scale.height = window.innerHeight;
   		}  
			game.scale.refresh();
   }

	window.onresize = resize;

	function preload()
	{
		window.console.log("app preload");
	};
	function create()
	{  
		window.console.log("app create");
    	game.scale.pageAlignHorizontally = true;
    	game.scale.pageAlignVertically = true;
    	resize();
	}
	function update()
	{
		window.console.log("app update");
		if (this.game.input.totalActivePointers == 0 && !this.game.input.activePointer.isMouse)
        {
            this.stage.backgroundColor = '#FFFF00';
        }
	};

	//  Now start the Game state.
	game.state.start(GameSceneEnum.Boot);
})();