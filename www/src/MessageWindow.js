/**
 * Created by Maxpain on 2016/7/29.
 */

/**
 * Created by Maxpain on 2016/7/20.
 */
MessageWindow = function (game)
{
    Phaser.Sprite.call(this, game);

    var bg = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    this.addChild(bg);
    bg.width = game.width;
    bg.height = game.height;
    bg.alpha = 0.5;
    bg.tint = 0x000000;
    bg.inputEnabled = true;

    var frame = new Phaser.Sprite(game, 0, 0, SheetName.Windows, SpriteName.HeaderWindow);
    this.addChild(frame);
    frame.position.setTo((bg.width - frame.width) / 2, (bg.height - frame.height) / 2);

    var style = {
        'font': '36px Arial', 'fill': 'white',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top",
        wordWrap: true,
        wordWrapWidth: frame.width - 30,
    };

    this.text = new Phaser.Text(game, 0, 0, "0", style);
    frame.addChild(this.text);
    this.text.anchor.x = 0.5;
    this.text.position.setTo(frame.width / 2, frame.height / 2 - 50);

    var button = new Phaser.Button(game, 0, 0, SheetName.Button, this.onClick, this,
        SpriteName.Button.ConfirmButton + 0,
        SpriteName.Button.ConfirmButton + 0,
        SpriteName.Button.ConfirmButton + 1);
    frame.addChild(button);
    button.position.setTo((frame.width - button.width) / 2, frame.height - button.height - 40);
};

MessageWindow.prototype = Object.create(Phaser.Sprite.prototype);
MessageWindow.prototype.constructor = MessageWindow;

MessageWindow.prototype.update = function ()
{

};

MessageWindow.prototype.onClick = function()
{
    this.hide();
}


MessageWindow.prototype.showDefault = function (value, callback, callbackContext)
{
    window.console.trace();
    var hintText;
    switch (value)
    {
        case SystemMessageEnum.KickOut:
            hintText = "Kicked out of game";
            break;
        case SystemMessageEnum.ConnectionError:
            hintText = "Connection error";
            break;
        case SystemMessageEnum.Disconnected:
            hintText = "Disconnected";
            break;
        case SystemMessageEnum.Disconnected:
            hintText = "Disconnected";
            break;
    }
    this.show(hintText, callback, callbackContext);
}

MessageWindow.prototype.show = function (value, callback, callbackContext)
{
    this.visible = true;
    this.bringToTop();
    this.text.text = value;
    this.callback = callback;
    this.callbackContext = callbackContext;
};


MessageWindow.prototype.hide = function ()
{
    this.visible = false;
};

//MessageWindow.prototype.onConfirm = function ()
//{
//    if (this.callback != null & this.callbackContext != null)
//    {
//        this.callback.call(this.callbackContext);
//    }
//    this.hide();
//};

MessageWindow.getInstance = function ()
{
    if (!this.instance)
    {
        this.instance = new MessageWindow()
    }
    return this.instance;
}

var SystemMessageEnum =
{
    ConnectionError: 10,
    Disconnected: 11,
    KickOut: 12,
}

