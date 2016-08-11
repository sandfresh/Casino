/**
 * Created by Maxpain on 2016/6/29.
 */
RecordPoint = function (game, x, y)
{
    Phaser.Group.call(this, game);

    this.baseBall = new Phaser.Sprite(game, x, y,SheetName.InfoWindow, SpriteName.WhiteBall);
    this.add(this.baseBall);

    this.blueSmallBall = new Phaser.Sprite(game, x, y, SheetName.InfoWindow,SpriteName.BlueSmallBall);
    this.add(this.blueSmallBall);
    this.redSmallBall = new Phaser.Sprite(game, x, y, SheetName.InfoWindow,SpriteName.RedSmallBall);
    this.add(this.redSmallBall);


    this.style = {
        'font': '14px Arial', 'fill': 'white',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };
    this.pointText = new Phaser.Text(game, x + 25, y + 25, "0", this.style);
    this.pointText.anchor.x = 0.5;
    this.pointText.anchor.y = 0.5;
    this.add(this.pointText);

    this.blueSmallBall.visible = false;
    this.redSmallBall.visible = false;
};

RecordPoint.prototype = Object.create(Phaser.Group.prototype);
RecordPoint.prototype.constructor = RecordPoint;

RecordPoint.prototype.update = function ()
{

};

RecordPoint.prototype.setPoint = function (point, playerpair, bankerpair, winner)
{
    var labelString ;

    if(playerpair)
        this.blueSmallBall.visible = true;
    if(bankerpair)
        this.redSmallBall.visible = true;

    switch (winner)
    {
        case WinnerNameTag.BigWin.WSBWStraight:
            labelString = "STR";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.BigWin.WSBWFlush:
            labelString = "FLU";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.BigWin.WSBWFullHouse:
            labelString = "FUH";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.BigWin.WSBWFourOfAKind:
            labelString = "4K";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.BigWin.WSBWStraightFlush:
            labelString = "STF";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.BigWin.WSBWRoyalFlush:
            labelString = "ROF";
            this.baseBall.tint = 0xffff00;
            break;
        case WinnerNameTag.WSNone:
            labelString = point;
            this.baseBall.tint = 0x00AB08;
            break;
        case WinnerNameTag.BigWin.WSPlayer:
            labelString = point;
            this.baseBall.tint = 0x0096FF;
            break;
        case WinnerNameTag.BigWin.WSBanker:
            labelString = point;
            this.baseBall.tint = 0xff0000;
            break;
    }
    var style1 = {
        'fontWeight': 'bold', 'font': '32px Arial', 'fill': (labelString.length > 1 ? 'black' : 'white'),
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };

    var style2 = {
        'fontWeight': 'bold', 'font': '24px Arial', 'fill': (labelString.length > 1 ? 'black' : 'white'),
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };

    var style3 = {
        'fontWeight': 'bold', 'font': '16px Arial', 'fill': (labelString.length > 1 ? 'black' : 'white'),
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };


    this.pointText.text = labelString;
    if (labelString.length > 2)
        this.pointText.setStyle(style3);
    else  if (labelString.length > 1 && labelString.length <= 2)
        this.pointText.setStyle(style2);
    else
        this.pointText.setStyle(style1);
};

RecordPoint.prototype.setPerfectPoint = function (winner,point)
{
    var labelString;

    switch (winner)
    {
        case WinnerNameTag.PerfectAngel.BetPAAngel:
            this.baseBall.tint = 0x0096FF;
            labelString = point;
            break;
        case WinnerNameTag.PerfectAngel.BetPAEvil:
            this.baseBall.tint = 0xff0000;
            labelString = point;
            break;
        case WinnerNameTag.WSNone:
            this.baseBall.tint = 0x413D3E;
            labelString = "无";
            break;
        default:
            this.baseBall.tint = 0x413D3E;
            break;
    }

    var style1 = {
        'fontWeight': 'bold', 'font': '32px Arial', 'fill': 'white',
        align: "center",
        boundsAlignH: "center",
        boundsAlignV: "top"
    };

    this.pointText.text = labelString;
    this.pointText.setStyle(style1);
}