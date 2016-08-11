/**
 * Created by Maxpain on 2016/7/29.
 */

PerfectCardTable = function (game, x, y)
{
    Phaser.Sprite.call(this, game, x, y, SheetName.PerfectAngelMain, SpriteName.BetTable);

    this.playerPoint = new Phaser.Sprite(game, 35, 185, SheetName.PerfectAngelMain, SpriteName.AngelPointText);
    this.addChild(this.playerPoint);
    this.bankerPoint = new Phaser.Sprite(game, 1725, 185, SheetName.PerfectAngelMain, SpriteName.DevilPointText);
    this.addChild(this.bankerPoint);

    var sprite = new Phaser.Sprite(game, 420, 640, SheetName.PerfectAngelMain, SpriteName.AngelText);
    this.addChild(sprite);
    sprite = new Phaser.Sprite(game, 1305, 640, SheetName.PerfectAngelMain, SpriteName.DevilText);
    this.addChild(sprite);

    sprite = new Phaser.Sprite(game, 1305, 640, SheetName.PerfectAngelMain, SpriteName.DevilText);
    this.addChild(sprite);

    sprite = new Phaser.Sprite(game, 960, 310, SheetName.PerfectAngelMain, SpriteName.VSeparate);
    this.addChild(sprite);
    //var graphics = new Phaser.Graphics(game, 0, 0);
    //this.addChild(graphics);
    //graphics.beginFill(0x64605D);
    //var lineWidth = 5;
    //var startpoint = 330;
    //graphics.moveTo(960, startpoint);
    //graphics.lineStyle(lineWidth, 0X004425, 0.2);
    //graphics.lineTo(960, startpoint + 30 * 1);
    //graphics.lineStyle(lineWidth, 0X004425, 0.4);
    //graphics.lineTo(960, startpoint + 30 * 2);
    //graphics.lineStyle(lineWidth, 0X004425, 0.6);
    //graphics.lineTo(960, startpoint + 30 * 3);
    //graphics.lineStyle(lineWidth, 0X004425, 0.8);
    //graphics.lineTo(960, startpoint + 30 * 4);
    //graphics.lineStyle(lineWidth, 0X004425, 1);
    //graphics.lineTo(960, startpoint + 30 * 5 + 100);
    //graphics.lineStyle(lineWidth, 0X004425, 0.8);
    //graphics.lineTo(960, startpoint + 30 * 6 + 100);
    //graphics.lineStyle(lineWidth, 0X004425, 0.6);
    //graphics.lineTo(960, startpoint + 30 * 7 + 100);
    //graphics.lineStyle(lineWidth, 0X004425, 0.4);
    //graphics.lineTo(960, startpoint + 30 * 8 + 100);
    //graphics.lineStyle(lineWidth, 0X004425, 0.2);
    //graphics.lineTo(960, startpoint + 30 * 9 + 100);
    //graphics.endFill();

    this.playerSorted = false;
    this.bankerSorted = false;
    this.cardArray = [];
    this.playerCardArray = [];
    this.bankerCardArray = [];
    for (var i = 0; i < 10; i++)
    {
        var poker = new Poker(this.game, 0, 0);
        this.addChild(poker);
        poker.setScale(0.75);
        this.cardArray.push(poker);
        poker.position.setTo(160 + ((poker.getWidth() + 25) * i) + 130 * Math.floor(i / 5), 440);
        poker.setCard(PokerSuitEnum.Spade, 13);
    }

    this.playerCardArray = this.cardArray.slice(0, 5);
    this.bankerCardArray = this.cardArray.slice(5, 10);

    var style = {
        font: '48px Arial', fill: '#FFFFFF',
        align: "right",
        boundsAlignH: "right",
        boundsAlignV: "top"
    };

    this.playerValueText = new Phaser.Text(game, 150, 225, "10", style);
    this.addChild(this.playerValueText);
    this.bankerValueText = new Phaser.Text(game, 1770, 225, "11", style);
    this.addChild(this.bankerValueText);
    this.bankerValueText.tint = 0x000000;
    this.playerValueText.anchor.x = 0.5;
    this.bankerValueText.anchor.x = 0.5;

    this.resultSprites = [];
    var sprite = new Phaser.Sprite(game, 342, 190, SheetName.Messages, SpriteName.MessageHigh);
    this.addChild(sprite);
    this.resultSprites.push(sprite);
    sprite = new Phaser.Sprite(game, 1311, 190, SheetName.Messages, SpriteName.MessageHigh);
    this.addChild(sprite);
    this.resultSprites.push(sprite);
    sprite = new Phaser.Sprite(game, 250, 230, SheetName.PerfectAngelMain, SpriteName.WinPerfectAngel);
    this.addChild(sprite);
    this.resultSprites.push(sprite);
    sprite = new Phaser.Sprite(game, 1180, 230, SheetName.PerfectAngelMain, SpriteName.WinDarkDevil);
    this.addChild(sprite);
    this.resultSprites.push(sprite);

    for (var key in this.resultSprites)
        this.resultSprites[key].visible = false;
    this.tweenArray = [];
    this.playerComb = null;
    this.bankerComb = null;
};

PerfectCardTable.prototype = Object.create(Phaser.Sprite.prototype);
PerfectCardTable.prototype.constructor = PerfectCardTable;

PerfectCardTable.prototype.setCardSuitPoint = function (target, index, suitpoint)
{
    var point = suitpoint[0];
    var suit = suitpoint[1];

    switch (suit)
    {
        case "s":
            suit = PokerSuitEnum.Spade;
            break;
        case "c":
            suit = PokerSuitEnum.Club;
            break;
        case "d":
            suit = PokerSuitEnum.Diamond;
            break;
        case "h":
            suit = PokerSuitEnum.Heart;
            break;
    }

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

    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].setCard(suit, point);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].setCard(suit, point);
            break;
    }
}

PerfectCardTable.prototype.showCard = function (target, index, smooth, callback, callbackContext)
{
    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].showCard(smooth, callback, callbackContext);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].showCard(smooth, callback, callbackContext);
            break;
    }
}

PerfectCardTable.prototype.showHalo = function (target, index)
{
    for (var i = 0; i < this.cardArray.length; i++)
    {
        this.cardArray[i].showHalo(false);
    }
    switch (target)
    {
        case CardTargetEnum.Player:
            this.playerCardArray[index].showHalo(true);
            break;
        case CardTargetEnum.Banker:
            this.bankerCardArray[index].showHalo(true);
            break;
        case CardTargetEnum.River:
            this.extraCardArray[index].showHalo(true);
            break;
    }
};

PerfectCardTable.prototype.initial = function ()
{
    for (var key in this.tweens)
        this.tweens[key].stop();
    this.tweenArray.length = 0;
    for (var i = 0; i < this.cardArray.length; i++)
    {
        this.cardArray[i].initial();
        var x = 160 + ((this.cardArray[i].getWidth() + 25) * i) + 130 * Math.floor(i / 5);

        var y = 440;
        this.cardArray[i].position.setTo(x, y);
    }
    for (var key in this.resultSprites)
        this.resultSprites[key].visible = false;
    this.playerValueText.text = "";
    this.playerValueText.visible = false;
    this.bankerValueText.text = "";
    this.bankerValueText.visible = false;
    this.playerPoint.visible = false;
    this.bankerPoint.visible = false;

    this.playerSorted = false;
    this.bankerSorted = false;

    this.playerComb = null;
    this.bankerComb = null;

};

PerfectCardTable.prototype.showResult = function ()
{
    var total;

    if (this.playerComb == null)
        this.resultSprites[0].visible = true;
    else
    {
        total = this.getCardsPoint(this.playerCardArray);
        if (total == 0)
            this.resultSprites[2].visible = true;
        this.showTargetPoint(CardTargetEnum.Player);
    }

    if (this.bankerComb == null)
        this.resultSprites[1].visible = true;
    else
    {
        total = this.getCardsPoint(this.bankerCardArray);
        if (total == 0)
            this.resultSprites[3].visible = true;
        this.showTargetPoint(CardTargetEnum.Banker);
    }
}

PerfectCardTable.prototype.showRoundResult = function (playerComb,bankerComb)
{
    var total;

    if (playerComb == null)
        this.resultSprites[0].visible = true;
    else
    {
        total = this.getCardsPoint(this.playerCardArray);
        if (total == 0)
            this.resultSprites[2].visible = true;
        this.showTargetPoint(CardTargetEnum.Player);
    }

    if (bankerComb == null)
        this.resultSprites[1].visible = true;
    else
    {
        total = this.getCardsPoint(this.bankerCardArray);
        if (total == 0)
            this.resultSprites[3].visible = true;
        this.showTargetPoint(CardTargetEnum.Banker);
    }
}

PerfectCardTable.prototype.showTargetPoint = function (target)
{
    var total = 0;
    switch (target)
    {
        case CardTargetEnum.Player:
            total = this.getCardsPoint(this.playerCardArray);
            this.playerValueText.text = "" + (total == 0 ? 10 : total);
            this.playerValueText.visible = true;
            this.playerPoint.visible = true;
            break;
        case CardTargetEnum.Banker:
            total = this.getCardsPoint(this.bankerCardArray);
            this.bankerValueText.text = "" + (total == 0 ? 10 : total);
            this.bankerValueText.visible = true;
            this.bankerPoint.visible = true;
            break;
    }
}

PerfectCardTable.prototype.sortTable = function (smooth)
{
    smooth = (smooth == null ? false : smooth);


    if (this.playerSorted == false)
        this.playerSorted = this.sortCard(this.playerCardArray, smooth, 0);
    if (this.bankerSorted == false)
        this.bankerSorted = this.sortCard(this.bankerCardArray, smooth, 1);
}

PerfectCardTable.prototype.sortCard = function (array, smooth, target)
{
    var newArray = array.slice();
    if (newArray.length >= 3)
    {
        var matchCombination = this.getCardCombination(newArray);
        var offsetX = target == 0 ? 280 : 1220;
        var offsetY = target == 450
        if (matchCombination != null)
        {
            var speed = smooth == true ? 500 : 1;
            for (var i = 0; i < 3; i++)
            {
                for (var key in newArray)
                {
                    if (newArray[key] == combinations[i])
                    {
                        var tween = this.game.add.tween(matchCombination[i]).to({
                            x: (offsetX + 160 * i),
                            y: offsetY
                        }, speed, Phaser.Easing.Linear.None, true);

                        this.tweenArray.push(tween);

                        newArray.splice(key, 1);
                    }

                }
            }

            var offsetX = target == 0 ? 360 : 1300;
            var offsetY = target == 250

            for (var i = 0; i < newArray.length; i++)
            {
                var tween = this.game.add.tween(newArray[i]).to({
                    x: offsetX + 160 * i,
                    y: offsetY
                }, speed, Phaser.Easing.Linear.None, true);

                this.tweenArray.push(tween);
            }

            return true;
        }
        return false;
    }
    else
        return false;
}

PerfectCardTable.prototype.orderCard = function (array, target, smooth)
{
    if (array == null)
        return;
    if (array.length < 3)
        return;
    if (target == CardTargetEnum.Player && this.playerSorted == true)
        return;
    if (target == CardTargetEnum.Banker && this.bankerSorted == true)
        return;

    switch (target)
    {
        case CardTargetEnum.Player:
            var originArray = this.playerCardArray;
            var bottomOffsetX = 350;
            var upperOffsetX = 430;
            this.playerSorted = true;
            break;
        case CardTargetEnum.Banker:
            var originArray = this.bankerCardArray;
            var bottomOffsetX = 1250;
            var upperOffsetX = 1340;
            this.bankerSorted = true;
            break;
    }

    var bottomOffsetY = 520;
    var upperOffsetY = 300

    var bottomPart = originArray.filter(function (item)
    {
        for (var key in array)
        {
            if (item.isCardEqual(array[key]))
                return true;
        }
    });

    if (target == CardTargetEnum.Player)
        this.playerComb = bottomPart;
    if (target == CardTargetEnum.Banker)
        this.bankerComb = bottomPart;
    var upperPart = originArray.filter(function (item)
    {
        return bottomPart.indexOf(item) == -1;
    });


    for (var i = 0; i < bottomPart.length; i++)
    {
        if (smooth == true)
        {
            var tween = this.game.add.tween(bottomPart[i]).to({
                x: (bottomOffsetX + 160 * i),
                y: bottomOffsetY
            }, 500, Phaser.Easing.Linear.None, true);
            this.tweenArray.push(tween);
        }
        else
            bottomPart[i].position.setTo(bottomOffsetX + (160 * i),bottomOffsetY);

    }

    for (var i = 0; i < upperPart.length; i++)
    {
        if(smooth)
        {
            var tween = this.game.add.tween(upperPart[i]).to({
                x: upperOffsetX + 160 * i,
                y: upperOffsetY
            }, 500, Phaser.Easing.Linear.None, true);

            this.tweenArray.push(tween);
        }
        else
            upperPart[i].position.setTo(upperOffsetX + (160 * i),upperOffsetY);
    }
}

PerfectCardTable.prototype.getCardsPoint = function (array)
{
    var total = 0;

    for (var i = 0; i < array.length; i++)
    {
        total += Number(array[i].point > 10 ? 10 : array[i].point);
    }

    total %= 10;

    return total;
}

PerfectCardTable.prototype.getCardCombination = function (array)
{
    var newarray = array.filter(function (item)
    {
        if (item.isOpen() == true)
        {
            return item;
        }
    });
    window.console.log("newarray", newarray);
    var combinations = k_combinations(newarray, 3);
    window.console.log("combinations", combinations);
    for (var j = 0; j < combinations; j++)
    {
        var combination = combinations[j];
        var total = 0;
        for (var i = 0; i < combination.length; i++)
        {
            var cardpoint = Number(combination[i].point >= 10 ? 10 : combination[i].point);
            total = Number(total + cardpoint);
        }

        if ((total % 10 == 0) && (combination.length > 0))
        {
            var point = [];
            for (var i = 0; i < combination.length; i++)
                point.push(combination[i].point);
            window.console.log("combination", point);
            return combination;
        }

    }
}


