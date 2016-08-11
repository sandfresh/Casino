/**
 * Created by Maxpain on 2016/6/27.
 */
GameMessage = function (game, x, y)
{
    this.spriteArray = new Array();
    Phaser.Sprite.call(this, game, x, y);

    this.bg = new Phaser.Sprite(game,0,600,SheetName.Messages,SpriteName.MessageBG);
    this.addChild(this.bg);
    this.bg.anchor.setTo(0.5,0.5);

    var sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessageInsufficient);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.Insufficient] = sprite;

    sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessageDraw);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.Draw] = sprite;

    sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessageStopBet);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.StopBet] = sprite;

    sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessagePlzBet);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.PlzBet] = sprite;

    sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessageOpenBoard);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.OpenBoard] = sprite;

    sprite = new Phaser.Sprite(game,0,0,SheetName.Messages,SpriteName.MessageHigh);
    this.addChild(sprite);
    this.spriteArray[GameMessageEnum.High] = sprite;

    for(var i=0;i<this.spriteArray.length;i++)
    {
        var sprite = this.spriteArray[i];
        sprite.position.setTo((this.width-sprite.width)/2,this.bg.y -this.bg.height*0.5  + (this.bg.height - sprite.height)/2 );
        sprite.visible = false;
    }

    this.alpha = 0;
};

GameMessage.prototype = Object.create(Phaser.Sprite.prototype);
GameMessage.prototype.constructor = GameMessage;

GameMessage.prototype.hide = function()
{
    if(this.tween != null)
        this.tween.stop();
    if(this.bgtween != null)
        this.bgtween.stop();
    for(var key in this.spriteArray)
    {
        this.spriteArray[key].visible = false;
        this.spriteArray[key].alpha = 1;
    }
    this.bg.alpha = 0;
}
GameMessage.prototype.showMessage = function(value,time)
{
    if(time == null)
        time = 1;

    if(this.tween != null)
        this.tween.stop();
    if(this.bgtween != null)
        this.bgtween.stop();
    for(var key in this.spriteArray)
    {
        this.spriteArray[key].visible = false;
        this.spriteArray[key].alpha = 1;
    }
    var sprite = this.spriteArray[value];
    sprite.visible = true;
    this.alpha = 1;

    switch (value)
    {
        case GameMessageEnum.StopBet:
        case GameMessageEnum.PlzBet:
        case GameMessageEnum.Insufficient:
        case GameMessageEnum.OpenBoard:
            this.bg.alpha = 1
            break;
        case GameMessageEnum.Insufficient:
        case GameMessageEnum.Draw:
        case GameMessageEnum.High:
            sprite.y= 500;
            this.bg.alpha = 0
            break;
    }


    this.tween = this.game.add.tween(this.bg).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true,time*1000);
    this.bgtween = this.game.add.tween(this).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true,time*1000);
};