/**
 * Created by Maxpain on 2016/7/19.
 */
S7HistoryWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.NoHeaderWindow);

    var frame = new Phaser.Sprite(game,0,0,SheetName.S7History,SpriteName.HistoryFrame);
    this.addChild(frame);
    frame.position.setTo((this.width-frame.width)/2,55);

    this.recordPointArray = [];

    for (var i = 0; i < 60; i++)
    {
        var recRect = new RecordRect(game, 0, 0);
        recRect.position.setTo(0 + 4 * (Math.floor(i / 6) ) + (recRect.width) * Math.floor(i / 6), 0 + (recRect.height + 5) * (i % 6));
        frame.addChild(recRect);
        recRect.setPoint(0);
        recRect.visible = false;
        this.recordPointArray.push(recRect);
    }
};

S7HistoryWindow.prototype = Object.create(Phaser.Sprite.prototype);
S7HistoryWindow.prototype.constructor = S7HistoryWindow;

S7HistoryWindow.prototype.update = function ()
{

};

S7HistoryWindow.prototype.setPoint = function (i, type)
{
    this.recordPointArray[i].setPoint(type);
};

S7HistoryWindow.prototype.showPoint = function (index, isShow)
{
    if(index < this.recordPointArray.length)
        this.recordPointArray[index].visible = isShow;
};







