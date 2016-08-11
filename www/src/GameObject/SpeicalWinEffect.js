/**
 * Created by Maxpain on 2016/7/13.
 */

SpecialWinEffect = function (game, x, y)
{

    Phaser.Sprite.call(this, game, x, y);

    this.bg = new Phaser.Sprite(game, 0, 0, SpriteName.White, 0);
    this.bg.width = game.width;
    this.bg.height = game.height;
    this.bg.alpha = 0;
    this.bg.tint = "#00000";
    this.addChild(this.bg);
    this.bg.inputEnabled = true;

    this.scaleobject = new Phaser.Sprite(game, 0, 0);
    this.scaleobject.anchor.setTo(0.5);
    this.scaleobject.position.setTo(400,200);
    this.addChild(this.scaleobject);
    this.scaleobject.scale.setTo(0.6);

    this.halo = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 0, SpriteName.WinHalo);
    this.scaleobject.addChild(this.halo);
    this.halo.anchor.setTo(0.5);
    this.halo.scale.setTo(2);
    this.halo.position.setTo(game.width / 2, game.height / 2 -160);

    this.redribbon = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 0, SpriteName.WinRedRibbon);
    this.scaleobject.addChild(this.redribbon);
    this.redribbon.anchor.setTo(0.5);
    this.redribbon.position.setTo(game.width / 2, game.height / 2 -270);


    this.greenribbon = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 1, SpriteName.WinGreenRibbon);
    this.scaleobject.addChild(this.greenribbon);
    this.greenribbon.anchor.setTo(0.5);
    this.greenribbon.position.setTo(game.width / 2, game.height / 2 -270);
    this.greenribbon.visible = false;
    this.spriteArray = new Array();

    var sprite;
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 2, SpriteName.WinPair);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 1, SpriteName.WinTwoPair);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 1, SpriteName.WinTriple);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 1, SpriteName.WinStraight);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 2, SpriteName.WinFlush);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 2, SpriteName.WinFullHouse);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 2, SpriteName.WinFour);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 0, SpriteName.WinStraightFlush);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 2, SpriteName.WinFiveKind);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 1, SpriteName.WinRoyalFlush);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);
    sprite = new Phaser.Sprite(game, 0, 0, SheetName.WinEffect + 0, SpriteName.WinPureRoyalFlush);
    this.scaleobject.addChild(sprite);
    this.spriteArray.push(sprite);

    for (var i = 0; i < this.spriteArray.length; i++)
    {
        this.spriteArray[i].visible = false;
        this.spriteArray[i].anchor.setTo(0.5, 1);
        this.spriteArray[i].position.setTo(game.width / 2, game.height / 2 - 150);
    }

    this.bonusOdds = new Phaser.BitmapText(this.game, 0, 0, SpriteFont.DigitNumber+2, "x3",50);
    this.addChild(this.bonusOdds);
    this.bonusOdds.anchor.x = 0.5;
    this.bonusOdds.position.setTo(game.width/2,this.spriteArray[0].y + 65);
    this.bonusValue = new Phaser.BitmapText(this.game, 0, 0, SpriteFont.DigitNumber+2, "99,999,999",60);
    this.addChild(this.bonusValue);
    this.bonusValue.anchor.x = 0.5;
    this.bonusValue.position.setTo(game.width/2,this.spriteArray[0].y+175);
    this.bonusValue.visible = false;
    this.bonusOdds.visible = false;
};

SpecialWinEffect.prototype = Object.create(Phaser.Sprite.prototype);
SpecialWinEffect.prototype.constructor = WinEffect;

SpecialWinEffect.prototype.update = function ()
{
    if(this.halo.visible)
        this.halo.rotation += 0.02;
};


SpecialWinEffect.prototype.setWinType = function (value)
{
    for (var i = 0; i < this.spriteArray.length; i++)
    {
        this.spriteArray[i].visible = false;
    }

    this.greenribbon.visible = false;
    this.redribbon.visible = false;
    this.halo.visible = false;

    switch (value)
    {
        case S7PKBetTypeTag.BET_S7PK_ONE_PAIR:
            this.spriteArray[0].visible = true;
            this.greenribbon.visible = true;
            break;
        case S7PKBetTypeTag.BET_S7PK_TWO_PAIR:
        case WinnerNameTag.BigWin.WSBWTwoPair:
            this.spriteArray[1].visible = true;
            this.greenribbon.visible = true;
            break;
        case WinnerNameTag.S7PK.WSS7PKTripple:
        case WinnerNameTag.BigWin.WSBWTriple:
            this.spriteArray[2].visible = true;
            this.greenribbon.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWStraight:
        case WinnerNameTag.S7PK.WSS7PKSTRAIGHT:
            this.spriteArray[3].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWFlush :
        case WinnerNameTag.S7PK.WSS7PKFlush:
            this.spriteArray[4].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWFullHouse:
        case WinnerNameTag.S7PK.WSS7PKFullHouse:
            this.spriteArray[5].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWFourOfAKind:
        case WinnerNameTag.S7PK.WSS7PKFourOfAKind:
            this.spriteArray[6].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWStraightFlush:
        case WinnerNameTag.S7PK.WSS7PKStraightFlush:
            this.spriteArray[7].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.S7PK.WSS7PKFiveOfAKind:
            this.spriteArray[8].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.BigWin.WSBWRoyalFlush:
        case WinnerNameTag.S7PK.WSS7PKRoyalFlush:
            this.spriteArray[9].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
        case WinnerNameTag.S7PK.WSS7PKPureRoyalFlus:
            this.spriteArray[10].visible = true;
            this.redribbon.visible = true;
            this.halo.visible = true;
            break;
    }
};

SpecialWinEffect.prototype.setBonusOdds= function(value)
{
    this.bonusOdds.visible = true;
    this.bonusOdds.text = "x"+value;
}

SpecialWinEffect.prototype.setBonusValue= function(value)
{
    this.bonusValue.visible = true;
    this.bonusValue.text = util.numberWithCommas(value);
    this.bonusValue.position.setTo(this.game.width/2,this.bonusValue.y);
}

SpecialWinEffect.prototype.show = function()
{
    this.visible = true;
}

SpecialWinEffect.prototype.hide = function()
{
    this.bonusValue.visible = false;
    this.bonusOdds.visible = false;
    this.visible = false;
}




