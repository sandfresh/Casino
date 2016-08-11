/**
 * Created by Maxpain on 2016/8/9.
 */

SettingWindow = function (game)
{
    Phaser.Sprite.call(this,game,0,0);

    var background = new Phaser.Sprite(game,0,0,SpriteName.White,0);
    this.addChild(background);
    background.width = game.width;
    background.height = game.height;
    background.tint = 0x000000;
    background.alpha = 0.5;

    var window = new Phaser.Sprite(game,0,0,SheetName.Setting,SpriteName.SettingWindow.SettingWindow);
    this.addChild(window);

    this.peronalLayer = new Phaser.Group(game);
    window.addChild(this.peronalLayer);
    this.gameLayer = new Phaser.Group(game);
    window.addChild(this.gameLayer);


    window.position.setTo((background.width - window.width)/2,(background.height - window.height)/2);
    window.position.setTo((background.width - window.width)/2,(background.height - window.height)/2);

    var textSprite  = new Phaser.Sprite(game,0,0,SheetName.Setting,SpriteName.SettingWindow.AccountText);
    this.peronalLayer.add(textSprite);
    textSprite.position.setTo(190,380);
    textSprite  = new Phaser.Sprite(game,0,0,SheetName.Setting,SpriteName.SettingWindow.NickNameText);
    this.peronalLayer.add(textSprite);
    textSprite.position.setTo(190,555);

    textSprite  = new Phaser.Sprite(game,0,0,SheetName.Setting,SpriteName.SettingWindow.MusicText);
    this.gameLayer.add(textSprite);
    textSprite.position.setTo(190,380);
    textSprite  = new Phaser.Sprite(game,0,0,SheetName.Setting,SpriteName.SettingWindow.SoundText);
    this.gameLayer.add(textSprite);
    textSprite.position.setTo(190,555);
//**************************************************************************************************************************************
    this.personalBtn = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {
        this.setTab(0);

    }, this);
    this.addChild(this.personalBtn);
    this.personalBtn.position.setTo(290,110);

    this.gameBtn = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {
        this.setTab(1);

    }, this);
    this.addChild(this.gameBtn);
    this.gameBtn.position.setTo(590,110);
//**************************************************************************************************************************************
    var button = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {


    }, this,SpriteName.SettingWindow.LogoutButton+0,SpriteName.SettingWindow.LogoutButton+0,SpriteName.SettingWindow.LogoutButton+1);
    this.peronalLayer.add(button);
    button.position.setTo(1120,370);

    button = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {


    }, this,SpriteName.SettingWindow.ModifyButton+0,SpriteName.SettingWindow.ModifyButton+0,SpriteName.SettingWindow.ModifyButton+1);
    this.peronalLayer.add(button);
    button.position.setTo(1120,540);
//**************************************************************************************************************************************

    this.musicbutton = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {
        var frameNum = this.musicbutton.frameName.substring(this.musicbutton.frameName.length-1,this.musicbutton.frameName.length);
        frameNum = (frameNum == 0? 1 : 0);
        this.musicbutton.frameName = (SpriteName.SettingWindow.ToggleButton+frameNum);

    }, this);
    this.gameLayer.add( this.musicbutton);
    this.musicbutton.frameName = SpriteName.SettingWindow.ToggleButton + 0;
    this.musicbutton.position.setTo(1120,370);

    this.soundbutton = new Phaser.Button(game, 0, 0, SheetName.Setting, function ()
    {
        var frameNum = this.soundbutton.frameName.substring(this.soundbutton.frameName.length-1,this.soundbutton.frameName.length);
        frameNum = (Number(frameNum) == 0? 1 : 0);
        this.soundbutton.frameName = (SpriteName.SettingWindow.ToggleButton+frameNum);
    }, this);
    this.gameLayer.add(this.soundbutton);
    this.soundbutton.frameName = SpriteName.SettingWindow.ToggleButton + 0;
    this.soundbutton.position.setTo(1120,540);
//**************************************************************************************************************************************
    button = new Phaser.Button(game, 0, 0, SheetName.Tutorial, function ()
    {
        this.closeWindow();

    }, this,SpriteName.CloseButton,SpriteName.CloseButton);
    window.addChild(button);
    button.position.setTo(1370,80);
//**************************************************************************************************************************************


    var graphics = new Phaser.Graphics(game, 0, 0);
    this.addChild(graphics);
    graphics.beginFill(0x64605D);
    graphics.lineStyle(4, 0x64605D, 1);
    graphics.moveTo(385, 490);
    graphics.lineTo(1550, 490);
    graphics.endFill();

    var graphics = new Phaser.Graphics(game, 0, 0);
    this.addChild(graphics);
    graphics.beginFill(0x64605D);
    graphics.lineStyle(4, 0x64605D, 1);
    graphics.moveTo(385, 660);
    graphics.lineTo(1550, 660);
    graphics.endFill();
//**************************************************************************************************************************************

    this.setTab(0);
}

SettingWindow.prototype = Object.create(Phaser.Sprite.prototype);
SettingWindow.prototype.constructor = SettingWindow;

SettingWindow.prototype.setTab = function(value)
{
    this.peronalLayer.visible = false;
    this.gameLayer.visible = false;
    this.personalBtn.frameName = SpriteName.SettingWindow.PersonalButton+1;
    this.gameBtn.frameName = SpriteName.SettingWindow.GameButton+1;
    if(value == 0)
    {
        this.peronalLayer.visible = true;
        this.personalBtn.frameName = SpriteName.SettingWindow.PersonalButton+0;
    }

    else
    {
        this.gameLayer.visible = true;
        this.gameBtn.frameName = SpriteName.SettingWindow.GameButton+0;
    }

}
