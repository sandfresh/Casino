/**
 * Created by Maxpain on 2016/7/14.
 */
InfoMenu = function (game, x, y,callback,callbackContext)
{

    Phaser.Sprite.call(this, game, x, y);

    this.background = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    this.background.width = game.width;
    this.background.height = game.height;
    this.background.alpha = 0.1;
    this.background.tint = "#000000";
    this.addChild(this.background);
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(function() {this.closeMenu(true)}, this);

    this.menubg = new Phaser.Sprite(game,0,0,SheetName.System, SpriteName.MenuBackground);
    this.addChild(this.menubg);

    this.lobbyBtn = new Phaser.Button(game,0,250,SheetName.System,function()
    {
        callback.call(callbackContext);

    },this,
        SpriteName.LobbyButton+0,
        SpriteName.LobbyButton+0,
        SpriteName.LobbyButton+1);
    this.menubg.addChild(this.lobbyBtn);

    this.systemBtn = new Phaser.Button(game,0,350,SheetName.System,function(){},this,
        SpriteName.SystemButton+0,
        SpriteName.SystemButton+0,
        SpriteName.SystemButton+1);
    this.menubg.addChild(this.systemBtn);

    this.menubg.inputEnabled = true;
    this.menubg.events.onInputDown.add(function()
    {
        this.closeMenu(true);
    }, this);


    var style = {
    'fontWeight': 'bold', 'font': '40px Arial', 'fill':  '#FFCD00',
    align: "center",
    boundsAlignH: "center",
    boundsAlignV: "top"
    };
    var style2 = {
        'fontWeight': 'bold', 'font': '30px Arial', 'fill':  '#FFFFFF',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };

    this.nameText =  new Phaser.Text(game,  145, 110, "Nanashi", style);
    this.menubg.addChild(this.nameText);
    this.creditText =  new Phaser.Text(game,  165, 150, "0", style2);
    this.menubg.addChild(this.creditText);

};

InfoMenu.prototype = Object.create(Phaser.Sprite.prototype);
InfoMenu.prototype.constructor = InfoMenu;

InfoMenu.prototype.update = function()
{
};

InfoMenu.prototype.showMenu = function()
{
    this.game.add.tween(this.menubg).to({ x: 0 }, 350, Phaser.Easing.Sinusoidal.In, true);
    this.background.inputEnabled = true;
};
InfoMenu.prototype.closeMenu = function(isSmooth)
{
    if(isSmooth)
    {
        this.game.add.tween(this.menubg).to({ x: -this.menubg.width }, 350, Phaser.Easing.Sinusoidal.Out, true);
        this.background.inputEnabled = false;
    }
    else
    {
        this.menubg.x = -this.menubg.width;
        this.background.inputEnabled = false;
    }

};

InfoMenu.prototype.setName = function(value)
{
    this.nameText.text= value;
};

InfoMenu.prototype.setCredit = function(value)
{
    this.creditText.text= util.numberWithCommas(value);
};

InfoMenu.prototype.setLobbyEnabled = function(value)
{
    if(value)
    {
        this.lobbyBtn.inputEnabled = true;
        this.lobbyBtn.tint = 0xffffff;
    }
    else
    {
        this.lobbyBtn.inputEnabled = false;
        this.lobbyBtn.tint = 0x808080;
    }
};
