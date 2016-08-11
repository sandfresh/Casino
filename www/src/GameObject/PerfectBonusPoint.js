/**
 * Created by Maxpain on 2016/8/2.
 */

PerfectBonusPoint = function (game, x, y)
{
    Phaser.Sprite.call(this,game,x,y,SheetName.PerfectMarioSlot,SpriteName.PerfectMarioSlot.BonusPoint+1);

    var style = {
        'font': 'bold 90px Arial', 'fill': 'white',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    this.pointText = new Phaser.Text(this.game, 0, 0, "0", style);
    this.pointText.stroke = "#E400FF";
    this.pointText.strokeThickness = 10;
    this.pointText.setShadow(0, 0, "#E400FF", 6);
    this.pointText.fill = "white";
    this.addChild(this.pointText);
    this.pointText.anchor.setTo(0);
    this.pointText.position.setTo(0,(this.height-this.pointText.height)/2+20);
}

PerfectBonusPoint.prototype = Object.create(Phaser.Sprite.prototype);
PerfectBonusPoint.prototype.constructor = PerfectBonusPoint;

PerfectBonusPoint.prototype.setPoint = function(value)
{
    var point = value[0];
    switch(point)
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

    value = point;

    this.pointText.text = value;
    this.pointText.position.setTo((this.width-this.pointText.width)/2,this.pointText.y);
}