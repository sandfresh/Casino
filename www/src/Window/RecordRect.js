/**
 * Created by Maxpain on 2016/7/19.
 */

/**
 * Created by Maxpain on 2016/6/29.
 */
RecordRect = function (game, x, y)
{
    Phaser.Sprite.call(this, game,x,y,SheetName.S7History,SpriteName.S7Record.High);
};

RecordRect.prototype = Object.create(Phaser.Sprite.prototype);
RecordRect.prototype.constructor = RecordRect;

RecordRect.prototype.update = function ()
{

};

RecordRect.prototype.setPoint = function (type)
{
    switch (type)
    {
        case S7PKBetTypeTag.None:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.High);
            break;
        case S7PKBetTypeTag.BET_S7PK_ONE_PAIR:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.OnePair);
            break;
        case S7PKBetTypeTag.BET_S7PK_TWO_PAIR:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.TwoPair);
            break;
        case S7PKBetTypeTag.BET_S7PK_TRIPPLE :
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.Triple);
            break;
        case S7PKBetTypeTag.BET_S7PK_STRAIGHT :
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.Straight);
            break;
        case S7PKBetTypeTag.BET_S7PK_FLUSH:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.Flush);
            break;
        case S7PKBetTypeTag.BET_S7PK_FULL_HOUSE:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.FullHouse);
            break;
        case S7PKBetTypeTag.BET_S7PK_FOUR_OF_A_KIND:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.FourOfAKind);
            break;
        case S7PKBetTypeTag.BET_S7PK_STRAIGHT_FLUSH:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.StraightFlush);
            break;
        case S7PKBetTypeTag.BET_S7PK_FIVE_OF_A_KIND:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.FiveOfAKind);
            break;
        case S7PKBetTypeTag.BET_S7PK_ROYAL_FLUSH:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.RoyalFlush);
            break;
        case S7PKBetTypeTag.BET_S7PK_PURE_ROYAL_FLUSH:
            this.loadTexture(SheetName.S7History,SpriteName.S7Record.PureRoyalFlush);
            break;
    }
};
