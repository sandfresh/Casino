/**
 * Created by Maxpain on 2016/7/25.
 */

//Convert enum integer to enum string
function getSuper7PKBetTypeByVavlue(value)
{
    var type;
    switch (value)
    {
        case Super7PKTypeEnum.BETS7PKTriple:
            type = BetTypeEnum.Super7PK.S7PKTriple;
            break;
        case Super7PKTypeEnum.BETS7PKTwoPair:
            type = BetTypeEnum.Super7PK.S7PKTwoPair;
            break;
        case Super7PKTypeEnum.BETS7PKOnePair:
            type = BetTypeEnum.Super7PK.S7PKOnePair;
            break;
        case Super7PKTypeEnum.BETS7PKNone:
            type = BetTypeEnum.Super7PK.S7PKNone;
            break;
        case Super7PKTypeEnum.BETS7PKStraight:
            type = BetTypeEnum.Super7PK.S7PKStraight
            break;
        case Super7PKTypeEnum.BETS7PKFlush:
            type = BetTypeEnum.Super7PK.S7PKFlush
            break;
        case Super7PKTypeEnum.BETS7PKFullHouse:
            type = BetTypeEnum.Super7PK.S7PKFullHouse;
            break;
        case Super7PKTypeEnum.BETS7PKFour:
            type = BetTypeEnum.Super7PK.S7PKFourOfAKind;
            break;
        case Super7PKTypeEnum.BETS7PKStraightFlush:
            type = BetTypeEnum.Super7PK.S7PKStraightFlush;
            break;
        case Super7PKTypeEnum.BETS7PKFive:
            type = BetTypeEnum.Super7PK.S7PKFiveOfAKind;
            break;
        case Super7PKTypeEnum.BETS7PKRoyalFlush:
            type = BetTypeEnum.Super7PK.S7PKRoyalFlush;
            break;
        case Super7PKTypeEnum.BETS7PKPureRoyalFlush:
            type = BetTypeEnum.Super7PK.S7PKPureRoyalFlush;
            break;
    }

    return type;
}
