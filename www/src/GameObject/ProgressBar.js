/**
 * Created by Maxpain on 2016/6/28.
 */

ProgressBar = function(game,x,y,progressname)
{
    // just a property we can tween so the bar has a progress to show
   // this.barProgress = 256;

    // the bar itself
    //this.bar = game.add.bitmapData(256, 32);
    //this.bar.context.fillStyle = '#f00';
    //this.bar.context.fillRect(0, 0, this.barProgress, 32);
    Phaser.Sprite.call(this, game, x, y,SheetName.InfoWindow,progressname);
  //  this.white = new Phaser.Sprite(game,x,y,SpriteName.Progressbar);
  //  this.addChild(this.white);


};

ProgressBar.prototype = Object.create(Phaser.Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;

ProgressBar.prototype.update = function()
{

};

ProgressBar.prototype.setValue = function(progress)
{
    var progress = Phaser.Math.clamp(progress, 0 , 100);

    var scaleX =  progress/100;
    var zoom = this.game.add.tween(this.scale).to({x: scaleX}, 700);
    zoom.start();
};
