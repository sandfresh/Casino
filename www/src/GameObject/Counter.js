/**
 * Created by Maxpain on 2016/7/1.
 */

Counter = function (game, x, y)
{
    Phaser.Sprite.call(this, game,x,y,SheetName.Common,SpriteName.CounterBall);


    //this.spritetext = new SpriteText(game,0,0,SheetName.Numbers,SpriteName.DigitNumber,99,65,-30);
    //this.addChild(this.spritetext);

    this.spritetext = new Phaser.BitmapText(this.game, 0, 0, SpriteFont.DigitNumber, "00",100);
    this.addChild(this.spritetext);

    this.pie = new PieProgress(this.game, 114, 119, 98);
    this.addChild(this.pie);
    this.pie.weight = 0.06;
    this.pie.color = "#00FFF6";

    this.remainValue = 0;
    this.maxCounterTime = 24;
    this.countertimer = this.game.time.create(false);
    this.countertimer.loop(1000, function ()
    {
        this.remainValue--;
        if(this.remainValue <= 0)
        {
            this.countertimer.stop(false);

            if(this.callback !=null)
            {
                this.callback.call(this.callbackContext);
            }
        }

        this.setText(this.remainValue);

    }, this);


    this.setText(this.remainValue);

};

Counter.prototype = Object.create(Phaser.Sprite.prototype);
Counter.prototype.constructor = Counter;


Counter.prototype.update = function()
{
};

Counter.prototype.setValue = function(value)
{
    this.remainValue = value;
    this.setText(this.remainValue);
};


Counter.prototype.start = function(maxtime)
{
    if(maxtime != null)
        this.maxCounterTime = maxtime;
    this.countertimer.start();
    this.pie.progress = (1-(this.remainValue/this.maxCounterTime));
    this.game.add.tween(this.pie).to({progress: 1}, this.remainValue*1000, Phaser.Easing.Linear.None, true, 0, 0, false);
};
Counter.prototype.stop = function()
{
    this.countertimer.stop(false);
};


Counter.prototype.setText = function(text)
{
    this.spritetext.text = text;
    this.spritetext.position.setTo((this.width - this.spritetext.width)/2,70);
}

Counter.prototype.setCallback = function(callback,callbackContext)
{
    this.callbackContext = callbackContext;
    this.callback = callback;
}