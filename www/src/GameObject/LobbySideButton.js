/**
 * Created by Maxpain on 2016/8/8.
 */
LobbySideButton = function (game, x, y,callback,callbackcontext,type)
{
    var frameName;
    var iconName;
    var tint;
    var offsetX = 0 ,offsetY = 0;
    switch(type)
    {
        case GameTypeEnum.All:
            frameName = SpriteName.Lobby.SideButton+0;
            iconName = SpriteName.Lobby.Icon +0 ;
            tint = 0xff0000;
            break;
        case GameTypeEnum.Card:
            frameName = SpriteName.Lobby.SideButton+1;
            iconName = SpriteName.Lobby.Icon +1 ;
            tint = 0x00ff00;
            offsetX = -20;
            offsetY = -5;
            break;
        case GameTypeEnum.Bingo:
            frameName = SpriteName.Lobby.SideButton+2;
            iconName = SpriteName.Lobby.Icon +2 ;
            tint = 0xA803B8;
            offsetY = -25;
            break;
    }
    Phaser.Sprite.call(this,game,x,y,SheetName.LobbyButton+2,frameName);
    this.anchor.setTo(0.5);

    this.halo = new Phaser.Sprite(game,0,0,SheetName.LobbyButton+2,SpriteName.Lobby.Halo);
    this.addChild(this.halo);
    this.halo.tint = tint;

    var button = new Phaser.Button(game,-this.width/2,-this.height/2,SheetName.LobbyButton+2,callback,callbackcontext,frameName,frameName,frameName);
    this.addChild(button);
    this.halo.position.setTo((-this.halo.width)/2,(-this.halo.height)/2);
    button.onInputUp.add(function(){this.playEffect(false);}, this);
    button.onInputDown.add(function(){this.playEffect(true);}, this);

    var icon = new Phaser.Sprite(game,0,0,SheetName.LobbyButton+2,iconName);
    button.addChild(icon);
    icon.y = ((icon.height) /2) + offsetY;
    icon.x = 70 + offsetX;
    icon.anchor.setTo(0.5);

    this.glorySprite = new Phaser.Sprite(game,0,0,SheetName.LobbyButton+2,SpriteName.Lobby.Glory+0);
    this.addChild(this.glorySprite);
    this.glorySprite.position.setTo((-this.glorySprite.width)/2+38,(-this.glorySprite.height)/2+15);
    this.glorySprite.scale.setTo(0.9);
    this.glorySprite.animations.add("glory", Phaser.Animation.generateFrameNames(SpriteName.Lobby.Glory, 0, 6, "", 0));

    this.halo.alpha = 0.5;
    this.tweenArray = [];
    var tween = game.add.tween(this.halo).to({ alpha: 1 },700, Phaser.Easing.Linear.None, false, 0, -1, true);
    this.tweenArray.push(tween);
    tween = game.add.tween(icon.scale).to({x:1.05,y:1.05 },700, Phaser.Easing.Linear.None, false, 0, -1, true);
    this.tweenArray.push(tween);

    for(var key in this.tweenArray)
    {
        this.tweenArray[key].start();
        this.tweenArray[key].pause();
    }
    this.halo.visible = false;
}

LobbySideButton.prototype = Object.create(Phaser.Sprite.prototype);
LobbySideButton.prototype.constructor = LobbySideButton;
LobbySideButton.prototype.update = function()
{

};
LobbySideButton.prototype.playEffect = function(value)
{
    if(value)
    {
        this.glorySprite.animations.play("glory",5,true);
        this.glorySprite.visible = true;
        for(var key in this.tweenArray)
            this.tweenArray[key].resume();

        this.scale.setTo(1.05);
        this.halo.alpha = 0.5;
        this.halo.visible = true;
    }
    else
    {
        this.glorySprite.animations.stop("glory");
        this.glorySprite.visible = false;
        for(var key in this.tweenArray)
            this.tweenArray[key].pause();
        this.scale.setTo(1);
        this.halo.visible = false;
    }
}