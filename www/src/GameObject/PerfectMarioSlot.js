/**
 * Created by Maxpain on 2016/8/2.
 */
PerfectMarioSlot = function (game)
{
    Phaser.Sprite.call(this, game);

    var background = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    background.width = game.width;
    background.height = game.height;
    background.tint = 0x000000;
    background.alpha = 0.5;
    this.addChild(background);
    background.inputEnabled = true;

    var screen = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    screen.width = 860;
    screen.height = 584;
    screen.tint = 0x000000;
    this.addChild(screen);
    screen.position.setTo((background.width - screen.width) / 2, (background.height - screen.height) / 2 + 90);
    //screen.inputEnabled = true;
    //screen.events.onInputDown.add(
    //    function() {
    //        this.reset();
    //        this.start();
    //        this.setPoint("8");
    //    }, this);

    var frame = new Phaser.Sprite(game, 0, 0, SheetName.PerfectMarioSlot, SpriteName.PerfectMarioSlot.BonusFrame);
    this.addChild(frame);

    frame.position.setTo((background.width - frame.width) / 2, (background.height - frame.height) / 2);

    var temp = [];
    this.pointArray = [];
    for (var i = 0; i < 3; i++)
    {
        var point = new MarioSlotPoint(game, 140 + 275 * i, 190);
        frame.addChild(point);
        temp.push(point);
    }
    for (var i = 0; i < 3; i++)
    {
        var point = new MarioSlotPoint(game, 890, 280 + 215 * i);
        frame.addChild(point);
        temp.push(point);
    }
    for (var i = 0; i < 3; i++)
    {
        var point = new MarioSlotPoint(game, 690 - 275 * i, 800);
        frame.addChild(point);
        temp.push(point);
    }
    for (var i = 0; i < 3; i++)
    {
        var point = new MarioSlotPoint(game, -20, 690 - 215 * i);
        frame.addChild(point);
        temp.push(point);
    }


    for (var i = 2; i < temp.length; i++)
    {

        this.pointArray[(i - 2)] = temp[i];
    }

    for (var i = 0; i < 2; i++)
    {
        this.pointArray[this.pointArray.length] = temp[i];
    }


    for (var i = 0; i < this.pointArray.length; i++)
    {

        this.pointArray[i].setPoint((i + 1));
    }

    this.initRollTime = 16;
    this.startCounter = 0;
    this.targetPoint = -1;
    this.nowPoint = 0;
    this.rollCounter = 0;
    this.rollTime = this.initRollTime;
    this.rollTurn = 0;
    this.gameTimer = this.game.time.create(false);
    this.gameTimer.loop(1000*0.01, function ()
    {
        this.rollPoint();
    }, this);
};

PerfectMarioSlot.prototype = Object.create(Phaser.Sprite.prototype);
PerfectMarioSlot.prototype.constructor = PerfectMarioSlot;

PerfectMarioSlot.prototype.setPoint = function (suitpoint)
{
    // window.console.trace();
    window.console.log("SlotGame",suitpoint);
    var point = suitpoint.charAt(0);
    switch (point)
    {
        case "k":
            point = 13;
            break;
        case "q":
            point = 12;
            break;
        case "j":
            point = 11;
            break;
        case "i":
            point = 10;
            break;
    }
    this.targetPoint = point;
}

PerfectMarioSlot.prototype.start = function ()
{

    this.game.time.events.repeat(500, 0, function ()
    {
        this.gameTimer.start();
    }, this);

}

PerfectMarioSlot.prototype.show = function ()
{
    this.visible = true;
}

PerfectMarioSlot.prototype.close = function ()
{
    this.visible = false;

    this.gameTimer.stop(false);
}

PerfectMarioSlot.prototype.initial = function ()
{
    this.rollTime = this.initRollTime;
    this.rollTurn = 0;
    this.rollCounter= 0;
    this.startCounter = 0;
    this.nowPoint = 0;
    for (var key in this.pointArray)
        this.pointArray[key].select(true);
    this.pointArray[0].select(true);
    this.targetPoint = -1;
}

PerfectMarioSlot.prototype.setCallback = function (callback, callbackContext)
{
    this.callback = callback;
    this.callbackContext = callbackContext;
}

PerfectMarioSlot.prototype.rollPoint = function ()
{
    this.rollCounter++;
    if (this.rollCounter >= this.rollTime)
    {
        this.rollCounter = 0;
        for (var key in this.pointArray)
        {
            this.pointArray[key].select(false);
        }

        this.nowPoint = this.nowPoint % (this.pointArray.length);
        this.pointArray[this.nowPoint].select(true);
        if (this.rollTurn >= 4)
        {
            if(this.targetPoint != 13)
            {
                if ((this.nowPoint + 1) == this.targetPoint)
                {
                    this.gameTimer.stop(false);

                    this.game.time.events.repeat(2500, 0, function ()
                    {
                        if (this.callback != null)
                        {
                            this.callback.call(this.callbackContext);
                        }
                    }, this);
                }
            }
            else
            {
                if ((this.nowPoint + 1) == 1)
                {
                    this.pointArray[this.nowPoint].select(false);
                    this.gameTimer.stop(false);

                    this.game.time.events.repeat(1000, 0, function ()
                    {
                        if (this.callback != null)
                        {
                            this.callback.call(this.callbackContext);
                        }
                    }, this);
                }
            }
        }

        if ((this.targetPoint >= 4) &&  ((this.nowPoint+4) == this.targetPoint))
        {
            window.console.log("Match1:"+this.targetPoint);
            this.rollTurn++;
        }

        else if ( (this.targetPoint < 4) && (((this.nowPoint+4) %this.pointArray.length) == this.targetPoint))
        {
            window.console.log("Match2:"+this.targetPoint);
            this.rollTurn++;
        }
        //else if (this.targetPoint == 13 && this.nowPoint == 0)
        //{
        //    window.console.log("Match3:"+this.targetPoint);
        //    this.rollTurn++;
        //}

        //Set roll speed by the roll turns.

        if(this.startCounter < 3)
        {
            this.startCounter++;
            this.rollTime = 8;
        }
        else if (this.rollTurn < 2)
        {
            this.rollTime = 1;
        }
        else if (this.rollTurn >= 2 && this.rollTurn < 3)
        {
            this.rollTime = 2;
        }
        else if (this.rollTurn >= 3 && this.rollTurn < 4)
        {
            this.rollTime = 3;
        }
        else if (this.rollTurn >=4 && this.rollTurn < 5)
        {
            this.rollTime = 4;
        }
        else if (this.rollTurn >= 5)
        {
            this.rollTime = 6;
        }

        this.nowPoint++;
    }
}

MarioSlotPoint = function (game, x, y, point)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.PerfectMarioSlot, SpriteName.PerfectMarioSlot.BonusPoint);

    var style = {
        'font': 'bold 56px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    point = (point == null ? 0 : point);
    this.pointText = new Phaser.Text(this.game, 0, 0, point, style);
    this.pointText.stroke = "#DF01F4";
    this.pointText.strokeThickness = 10;

    this.grd = this.pointText.context.createLinearGradient(0, 0, 0, this.pointText.height);
    this.grd.addColorStop(0, '#04FCFB');
    this.grd.addColorStop(0.4, '#6CF993');
    this.grd.addColorStop(0.6, '#FFF600');
    this.grd.addColorStop(1, '#FFF600');
    this.addChild(this.pointText);
    this.pointText.position.setTo(this.width / 2, this.height / 2 + 2);
    this.pointText.anchor.setTo(0.5);

    //this.blackmask = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    //this.blackmask.width = this.width;
    //this.blackmask.height = this.height;
    //this.addChild(this.blackmask);
    //this.blackmask.tint = 0x000000;
    //this.blackmask.alpha = 0.4;

    //Create a graphic circle as the shadow area mask.
    //var maskcrop = new Phaser.Graphics(game, 0, 0);
    //this.addChild(maskcrop);
    //maskcrop.beginFill(0xffffff);
    //maskcrop.drawCircle(this.width / 2, this.height / 2, 100);
    //  this.blackmask.mask = maskcrop;
    this.blackmask = new Phaser.Sprite(this.game,0,0,SheetName.PerfectMarioSlot,SpriteName.PerfectMarioSlot.BonusPointMask);
    this.addChild(this.blackmask);


    this.select(false);
};

MarioSlotPoint.prototype = Object.create(Phaser.Sprite.prototype);
MarioSlotPoint.prototype.constructor = MarioSlotPoint;

MarioSlotPoint.prototype.select = function (value)
{
    if (value)
    {
        this.pointText.fill = this.grd;
        this.pointText.stroke = "#DF01F4";
        this.pointText.setShadow(0, 0, "#DF01F4", 10);
        this.tint = 0xffffff;
        this.blackmask.visible = false;
    }
    else
    {
        this.pointText.fill = 'white';
        this.pointText.stroke = "#E400FF";
        this.pointText.setShadow(0, 0, "#E400FF", 10);
        this.tint = 0x808080;
        this.blackmask.visible = true;
    }
}

MarioSlotPoint.prototype.setPoint = function (value)
{
    this.pointText.text = value;
}