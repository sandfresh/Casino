/**
 * Created by Maxpain on 2016/8/8.
 */
LobbyMainButton = function (game, x, y,callback,callbackcontext,type)
{
    var frameName;
    switch (type)
    {
        case GameSceneEnum.BigWin:
            frameName = SpriteName.Lobby.MainButton+"1_"
            break;
        case GameSceneEnum.Super7PK:
            frameName = SpriteName.Lobby.MainButton+"2_"
            break;
        case GameSceneEnum.PerfectAngel:
            frameName = SpriteName.Lobby.MainButton+"3_"
            break;
        default:
            frameName = SpriteName.Lobby.MainButton+"0_"
            break;
    }

    Phaser.Button.call(this, game, x, y, SheetName.LobbyButton, callback,callbackcontext,
        frameName+0,frameName+0,frameName+1);


    this.effect = new Phaser.Sprite(this.game, 0, 0, SheetName.LobbyButton, SpriteName.Lobby.Glory+0);
    this.addChild(this.effect);

    this.timer = this.game.time.create(false);
    this.timer.loop(4000, function ()
    {
        this.effect.animations.add("glory", Phaser.Animation.generateFrameNames(SpriteName.Lobby.Glory, 0, 5, "", 0));
        this.effect.play("glory", 5, false);
    }, this);

}

LobbyMainButton.prototype = Object.create(Phaser.Button.prototype);
LobbyMainButton.prototype.constructor = LobbyMainButton;
LobbyMainButton.prototype.playEffect = function(value)
{
    if(value)
    {
        this.timer.start();
    }
    else
    {
        this.timer.stop(false);
        this.effect.stop("glory");
    }
}

LobbyMainButton.prototype.playEffectOnce = function()
{
    this.effect.animations.add("glory", Phaser.Animation.generateFrameNames(SpriteName.Lobby.Glory, 0, 5, "", 0));
    this.effect.play("glory", 5, false);
}