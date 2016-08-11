/**
 * Created by Maxpain on 2016/6/29.
 */


WebSocketNameTag =
{
    ID: "id",
    BetList: "bet_list",
    TimeStamp: "timestamp",
    GameList: "game_list",
    GameRound: "game_round",
    GameState: "game_state",
    GameType: "game_type",
    GameID: "game_id",
    CardType: "card_type",
    CardList: "card_list",
    CardShowHandCombination: "card_showhand_comb",
    CardShowHandType: "card_showhand_type",
    CardsInfo: "cards_info",
    PlayerInfo: "player_info",
    PlayerCredit: "player_credit",
    PlayerUUID: "player_uuid",
    PlayerAccount: "player_account",
    PlayerName: "player_name",
    PlayerID: "player_id",
    ResultList: "result_list",
    RecordList: "record_list",
    RemainTime: "remain_time",
    MessageType: "message_type",
    UpdateOdds: "update_odds",
    BigWinProbability: "cards_bigwin_prob",
    BonusResultList: "bonus_result_list",
    PlayerUpdateCredit: "player_update_credit",
    PlayerWinCredit: "player_win_credit",
    Result: "result",
    BetType: "bet_type",
    BetAmount: "bet_amount",
    TotalAmount: "total_amount",
    TotalBetAmount: "total_bet_amount",
    PlayerComb : "pa_player_new_comb",
    BankerComb : "pa_banker_new_comb"
}

GameTypeNameTag =
{
    Lobby: "Lobby",
    BigWin: "BigWin",
    PerfectAngel: "PerfectAngel",
    Super7PK: "Super7PK",
    Bingo: "Bingo",
}

GameStateNameTag =
{
    NonState: "NonState",

    BigWin: {
        NewRoundState: "NewRoundState",
        StartBetState: "StartBetState",
        EndBetState: "EndBetState",
        OpenState: "OpenState",
        EndRoundState: "EndRoundState",
    },
    Super7pk: {
        NewRoundState: "NewRoundState",
        FirstStartBetState: "FirstStartBetState",
        FirstEndBetState: "FirstEndBetState",
        FirstOpenState: "FirstOpenState",
        SecondStartBetState: "SecondStartBetState",
        SecondEndBetState: "SecondEndBetState",
        SecondOpenBetState: "SecondOpenBetState",
        EndRoundState: "EndRoundState",
    }
    ,
    PerfectAngel: {
        NewRoundState: "NewRoundState",
        StartBetState: "StartBetState",
        EndBetState: "EndBetState",
        OpenState: "OpenState",
        EndRoundState: "EndRoundState",
    },
}

BetNameTag =
{
    BetAmount: "bet_amount",
    SettleAmount: "settle_amount",
    BetType: "bet_type",
    WinState: "win_state"
}


BonusNameTag =
{
    BonusTripple: "BetBWBonusTripple",
    BonusTwoPair: "BetBWBonusTwoPair",
    BonusList: "bonus_list"
}

MessageNameTag =
{
    Login: "MsgLogin",
    EnterGame: "MsgPlayerEnterGame",
    OpenCard: "MsgBPOpenCard",
    EndRound: "MsgBPEndRound",
    BankerPlayerState: "MsgBPState",
    PlayerBet: "MsgPlayerBet",
    MsgKeepLive: "MsgKeepLive",
    KickOut: "MsgKickOut",
    UpdateInfo: "MsgPlayerUpdateGameInfo",
    ExiGame: "MsgPlayerExitGame",

}

RecordNameTag =
{
    BankerPair: "banker_pair",
    PlayerPair: "player_pair",
    Point: "point",
    Winner: "winner",
}

CardTypeNameTag =
{
    Banker: "Banker",
    Player: "Player",
    River: "River",
    Extra: "Extra",

    PlayerList: "player_card_list",
    BankerList: "banker_card_list",
    RiverList: "river_card_list",
    ExtraList: "extra_card_list",
}


WinnerNameTag =
{
    //WSPlayer: "BetBWPlayer",
    //WSBanker: "BetBWBanker",
    //WSDraw: "BetBWTie",
    WSNone: "None",
    WSLost: "WSLost",
    WSWin: "WSWin",
    BigWin: {
        WSPlayer: "BetBWPlayer",
        WSBanker: "BetBWBanker",
        WSDraw: "BetBWTie",
        WSBWRoyalFlush: "WSBWRoyalFlush",
        WSBWStraightFlush: "WSBWStraightFlush",
        WSBWFourOfAKind: "WSBWFourOfAKind",
        WSBWFullHouse: "WSBWFullHouse",
        WSBWFlush: "WSBWFlush",
        WSBWStraight: "WSBWStraight",
        WSBWTriple : "WSBWTripple",
        WSBWTwoPair : "WSBWTwoPair",
        WSBWNormalWin: "WSBWNormalWin"
    },
    S7PK: {
        WSS7PKPureRoyalFlus: "WSS7PKPureRoyalFlus",
        WSS7PKRoyalFlush: "WSS7PKRoyalFlush",
        WSS7PKStraightFlush: "WSS7PKStraightFlush",
        WSS7PKTripple: "WSS7PKTripple",
        WSS7PKFiveOfAKind: "WSS7PKFiveOfAKind",
        WSS7PKFullHouse: "WSS7PKFullHouse",
        WSS7PKFlush: "WSS7PKFlush",
        WSS7PKSTRAIGHT: "WSS7PKStraight",
        WSS7PKFourOfAKind: "WSS7PKFourOfAKind"
    },
    PerfectAngel: {
        BetPAAngel :"BetPAAngel" ,
        BetPAEvil : "BetPAEvil",
        WSPAOnePointWin: "WSPAOnePointWin",
        WSPATwoPointWin: "WSPATwoPointWin",
        WSPANormalWin: "WSPANormalWin",
        WSPAFiveWaWaWin: "WSPAFiveWaWaWin",
        WSPAFourOfAKindWin: "WSPAFourOfAKindWin",

    }
}



S7PKBetTypeTag =
{
    BET_S7PK_MAIN: "BetS7PKMain",
    BET_S7PK_PURE_ROYAL_FLUSH: "BetS7PKPureRoyalFlush",
    BET_S7PK_ROYAL_FLUSH: "BetS7PKRoyalFlush",
    BET_S7PK_FIVE_OF_A_KIND: "BetS7PKFiveOfAKind",
    BET_S7PK_STRAIGHT_FLUSH: "BetS7PKStraightFlush",
    BET_S7PK_FOUR_OF_A_KIND: "BetS7PKFourOfAKind",
    BET_S7PK_FULL_HOUSE: "BetS7PKFullHouse",
    BET_S7PK_FLUSH: "BetS7PKFlush",
    BET_S7PK_STRAIGHT: "BetS7PKStraight",
    BET_S7PK_TRIPPLE: "BetS7PKTripple",
    BET_S7PK_TWO_PAIR: "BetS7PKTwoPair",
    BET_S7PK_ONE_PAIR: "BetS7PKOnePair",
    BET_S7PK_NONE: "BetS7PKNone",
}

