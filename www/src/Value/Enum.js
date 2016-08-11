var BetTypeEnum =
{
    BigWin:
    {
        Banker: "BetBWBanker",
        Player: "BetBWPlayer",
        Draw: "BetBWTiePoint",
        BankerPair: "BetBWBankerPair",
        PlayerPair: "BetBWPlayerPair",
        Special: "BetBWSpecial",
    },
    Super7PK:
    {
        S7PKRaise : "BetS7PKRaise",
        S7PKMain : "BetS7PKMain",
        S7PKNone : "BetS7PKNone",
        S7PKOnePair : "BetS7PKOnePair",
        S7PKTwoPair : "BetS7PKTwoPair",
        S7PKTriple :"BetS7PKTripple",
        S7PKStraight :"BetS7PKStraight",
        S7PKFlush : "BetS7PKFlush",
        S7PKFullHouse : "BetS7PKFullHouse",
        S7PKFourOfAKind :"BetS7PKFourOfAKind",
        S7PKStraightFlush : "BetS7PKStraightFlush",
        S7PKFiveOfAKind :"BetS7PKFiveOfAKind",
        S7PKRoyalFlush : "BetS7PKRoyalFlush",
        S7PKPureRoyalFlush : "BetS7PKPureRoyalFlush"
    },
    PerfectAngel:
    {
        BetPAAngel :"BetPAAngel" ,
        BetPAEvil : "BetPAEvil",
        BetPABigAngel : "BetPABigAngel",
        BetPABigEvil : "BetPABigEvil",
        BetPAPerfectAngel : "BetPAPerfectAngel",
        BetPAUnbeatenEvil : "BetPAUnbeatenEvil",
        BetPATiePoint : "BetPATiePoint",
        BetPABothNone : "BetPABothNone",
    }
};

var CoinEnum =
{
    Coin0: 0,
    Coin5: 1,
    Coin10: 2,
    Coin50: 3,
    Coin100: 4,
    Coin500: 5,
    Coin1k: 6,
    Coin5k: 7,
    Coin10k: 8,
}

var PokerHandEnum =
{
    PlayerPair: 8,
    BankerPair: 9,
    AllPair: 10,
    TwoPair: 11,
    Three: 12,
    Straight: 13,
    Flush: 14,
    FullHouse: 15,
    Four: 16,
    StraightFlush: 17,
    RoyalFlush: 18,
}

var PokerSuitEnum =
{
    Club: 0,
    Diamond: 1,
    Heart: 2,
    Spade: 3,
    Joker : 9,
}

var GameMessageEnum =
{
    Insufficient: 0,
    Draw: 1,
    StopBet: 2,
    PlzBet: 3,
    High: 4,
    OpenBoard :5,
}


var BetStateEnum =
{
    Insufficient : 0,
    Betable : 1,
    Unbetable :2,
}

var CardTargetEnum =
{
    Player :0,
    Banker :1,
    River : 2,
    Extra : 3,
    None : 4,
}

var GameSceneEnum =
{
    Preloader : "preloader",
    Boot : "boot",
    Menu : "menu",
    Super7PK : "super7pk",
    BigWin : "bigwin",
    PerfectAngel : "perfectangel",
}

var BetInfoEnum =
{
    HistoryInfo : 0,
    BetInfo : 1,
}


var OddsInfoEnum =
{
    OddsReference : 0,
    OddsPercent : 1,
}


var GameModeEnum =
{
    Offline :0,
    Online : 1
}

var WebSocketStatusEnum =
{
    Disconnected : 4001
}

var Super7PKTypeEnum =
{
    BETS7PKPureRoyalFlush: 13,
    BETS7PKRoyalFlush: 12,
    BETS7PKFive: 11,
    BETS7PKStraightFlush: 10,
    BETS7PKFour: 9,
    BETS7PKFullHouse: 8,
    BETS7PKFlush: 7,
    BETS7PKStraight: 5,
    BETS7PKTriple: 4,
    BETS7PKTwoPair: 3,
    BETS7PKOnePair: 1,
    BETS7PKNone: 0
}

var GameTypeEnum =
{
    All : 0,
    Card : 1,
    Bingo : 2,
}
