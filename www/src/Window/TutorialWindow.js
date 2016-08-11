/**
 * Created by Maxpain on 2016/6/24.
 */
TutorialWindow = function (game, gameType)
{
    this.pageIndex = 0;
    this.layer = new Phaser.Group(game);
    Phaser.Group.call(this, game);
    this.bg = new Phaser.Sprite(game, 0, 0, SpriteName.White,0);
    this.bg.width = game.width;
    this.bg.height = game.height;
    this.bg.alpha = 0.5;
    this.bg.tint = 0x000000;
    this.add(this.bg);
    this.bg.inputEnabled = true;
    this.bg.events.onInputDown.add(function()
    {
        this.closeWindow();
    }, this);


    this.tutorialbg = new Phaser.Sprite(game, 0, 0, SheetName.Tutorial,SpriteName.TutorialBg);
    this.add(this.tutorialbg);
    this.tutorialbg.position.x = ((this.bg.width - this.tutorialbg.width) / 2);
    this.tutorialbg.position.y = ((this.bg.height - this.tutorialbg.height) / 2);


    this.closeBtn = new Phaser.Button(game, 0, 0, SheetName.Tutorial, function ()
    {
        this.closeWindow();

    }, this,SpriteName.CloseButton,SpriteName.CloseButton);
    this.tutorialbg.addChild(this.closeBtn);
    this.closeBtn.position.setTo(this.tutorialbg.width - 150, 60);


    this.zoomOut = this.game.add.tween(this.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Exponential.In);
    this.zoomIn = this.game.add.tween(this.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Exponential.In);

    this.indicators = [];
    this.pageArray = [];
    var page = 1;
    var suffix = "";
    var sheetName;
    switch (gameType)
    {
        case GameTypeNameTag.BigWin:
            page = 3;
            suffix = "bigwin";
            sheetName = SheetName.Tutorial + 0;
            break;
        case GameTypeNameTag.Super7PK:
            page = 2;
            suffix = "super";
            sheetName = SheetName.Tutorial + 1;
            break;
        case GameTypeNameTag.PerfectAngel:
            page = 3;
            suffix = "perfect";
            sheetName = SheetName.Tutorial + 2;
            break;
    }
    for (var i = 0; i < page; i++)
    {
        var pageSprite = new Phaser.Sprite(game, 0, 0, sheetName,SpriteName.TutorialPage+i);
        this.addChild(pageSprite);
        pageSprite.scale.setTo(1.5);
        pageSprite.alignIn(this.tutorialbg, Phaser.CENTER);
        this.pageArray.push(pageSprite);
        pageSprite.inputEnabled = true;
        pageSprite.events.onInputDown.add(function()
        {
        }, this);
    }

    this.prevPage = new Phaser.Button(game, 0, 0, SheetName.Tutorial, function ()
    {
        if (this.pageIndex == 0)
            this.pageIndex = this.pageArray.length - 1;
        else
            this.pageIndex -= 1;
        this.selectPage(this.pageIndex);
    }, this,SpriteName.NavArrow,SpriteName.NavArrow);

    this.prevPage.position.setTo(50, this.tutorialbg.height / 2);
    this.tutorialbg.addChild(this.prevPage);
    this.prevPage.scale.x = -1;

    this.nextPage = new Phaser.Button(game, 0, 0, SheetName.Tutorial, function ()
    {
        if (this.pageIndex == (this.pageArray.length - 1))
            this.pageIndex = 0;
        else
            this.pageIndex += 1;
        this.selectPage(this.pageIndex);
    }, this,SpriteName.NavArrow,SpriteName.NavArrow);
    this.nextPage.position.setTo(this.tutorialbg.width - 50, this.tutorialbg.height / 2);
    this.tutorialbg.addChild(this.nextPage);


    for(var i = 0 ; i <page ;i++)
    {
        var indicator = new Phaser.Sprite(game,0,0,SheetName.Tutorial,SpriteName.CircleIndicator);
        this.tutorialbg.addChild(indicator);
        var startPosX  = (this.tutorialbg.width - indicator.width*page + 20 * (page - 1))/2;
        indicator.position.setTo(startPosX + (indicator.width+20)*i ,this.tutorialbg.height-90);
        this.indicators.push(indicator);
    }

    this.selectPage(0);
};

TutorialWindow.prototype = Object.create(Phaser.Group.prototype);
TutorialWindow.prototype.constructor = TutorialWindow;

TutorialWindow.prototype.openWindow = function ()
{
    this.scale.setTo(1, 1);
}

TutorialWindow.prototype.closeWindow = function ()
{
    this.scale.setTo(0, 0);
}

TutorialWindow.prototype.selectPage = function (index)
{

    this.pageIndex = index;
    for (var i = 0; i < this.pageArray.length; i++)
    {
        this.pageArray[i].visible = false;
    }
    this.pageArray[this.pageIndex].visible = true;

    if(index == (this.pageArray.length - 1))
        this.nextPage.visible = false;
    else
        this.nextPage.visible = true;

    if(index == 0)
        this.prevPage.visible = false;
    else
        this.prevPage.visible = true;


    for(var i = 0 ; i < this.indicators.length ; i++)
    {
        this.indicators[i].tint = 0x777777;
    }
    this.indicators[index].tint = 0xffffff;
}


