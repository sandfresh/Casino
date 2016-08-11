/**
 * Created by Maxpain on 2016/8/2.
 */
PerfectBonusHint = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.PerfectMarioSlot, SpriteName.PerfectMarioSlot.MarqueeFrame + 0);

    this.animations.add("Run", Phaser.Animation.generateFrameNames(SpriteName.PerfectMarioSlot.MarqueeFrame, 1, 2, "", 0), 5, true);
    this.animations.add("Stop", Phaser.Animation.generateFrameNames(SpriteName.PerfectMarioSlot.MarqueeFrame, 0, 0, "", 0), 5, true);
    this.animations.play("Run", 5, true);

    var style = {
        'font': 'bold 24px Arial', 'fill': 'white',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };
    this.text = new Phaser.BitmapText(this.game, 0, 0, SpriteFont.RollText, "00",40);
    //this.text = new Phaser.Text(game, x, y, "0", style);
    this.addChild(this.text);
    //this.text.strokeThickness = 5;
    //this.text.stroke = "#FF7E00";
    //this.text.setShadow(0, 0, "#FF7E00", 10);
   // this.text.anchor.x = 0.5;



    this.setPoint(12);

}

PerfectBonusHint.prototype = Object.create(Phaser.Sprite.prototype);
PerfectBonusHint.prototype.constructor = PerfectBonusHint;

PerfectBonusHint.prototype.setPoint = function (value)
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

    var space = "";
    for (var i = 0; i < 5; i++)
        space = space + ' ';
    if (value == 13)
    {
        this.text.text = "13點無外贈"
    }
    else if (value == 12)
    {
        this.text.text = "四條勝" + space + "外 贈" + space + "80倍"
    }
    else if (value == 11)
    {
        this.text.text = "五公勝" + space + "外 贈" + space + "40倍"
    }
    else if (value == 10)
    {
        this.text.text = "10點勝" + space + "外 贈" + space + "4倍"
    }
    else if (value >= 8 && (value <= 9))
    {
        this.text.text = value + "點勝" + space + "外 贈" + space + "2倍"
    }
    else if (value <= 7)
    {
        this.text.text = value + "點勝" + space + "外 贈" + space + "1倍"
    }

    if(value != 13)
        this.animations.play("Run", 5, true);
    else
        this.animations.play("Stop", 5, true);



    this.text.position.setTo((this.width - this.text.width) / 2, (this.height - this.text.height) / 2);
}
