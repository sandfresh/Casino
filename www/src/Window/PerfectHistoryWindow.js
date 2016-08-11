/**
 * Created by Maxpain on 2016/7/19.
 */
PerfectHistoryWindow = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.Windows, SpriteName.NoHeaderWindow);

    var frame = new Phaser.Sprite(game,35,75,SheetName.InfoWindow,SpriteName.HistoryTable);
    this.addChild(frame);

    this.recordPointArray = [];

    for (var i = 0; i < 60; i++)
    {
        var recordpoint = new RecordPoint(game, 8+ 57 * Math.floor(i/6) ,7 +  48.5 * (i%6));
        frame.addChild(recordpoint);
        this.recordPointArray.push(recordpoint);
        recordpoint.visible = false;
    }
};

PerfectHistoryWindow.prototype = Object.create(Phaser.Sprite.prototype);
PerfectHistoryWindow.prototype.constructor = PerfectHistoryWindow;

PerfectHistoryWindow.prototype.update = function ()
{

};

PerfectHistoryWindow.prototype.setPoint = function (i, winner,point)
{
    this.recordPointArray[i].setPerfectPoint(winner,point);
};

PerfectHistoryWindow.prototype.showPoint = function (index, isShow)
{
    if(index < this.recordPointArray.length)
        this.recordPointArray[index].visible = isShow;
};







