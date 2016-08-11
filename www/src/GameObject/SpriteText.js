/**
 * Created by MaxPain on 2016/7/1.
 */

SpriteText = function (game, x, y,sheetName,spriteKeyName,text,size,spacing)
{
    Phaser.Group.call(this, game);
    this.spaceing = (spacing == null ? 0 : spacing);
    this.totalWidth = 0;
    this.spriteArray = [];

    text = text.toString();
    this.textContext = text;
    this.spritekey = spriteKeyName;
    this.sheetName = sheetName;
    for(var i =0;i<this.textContext.length;i++)
    {
        var char = this.textContext[i];
        var sprite = new Phaser.Sprite(game,0,y,sheetName,this.spritekey+char);
        sprite.position.x = sprite.width * i + (i >= 1 ?this.spaceing:0);
        this.add(sprite);
        this.spriteArray.push(sprite);
    }

    if(size != null)
        this.size = size;
    else if(this.length > 0)
    {
        this.size = this.getAt(0).width;
    }

    if(this.length > 0)
    {
        this.scaleValue = this.size/this.getAt(0).width;
        this.scale.setTo(this.scaleValue ,this.scaleValue);
    }

};

SpriteText.prototype = Object.create(Phaser.Group.prototype);
SpriteText.prototype.constructor = SpriteText;


SpriteText.prototype.update = function()
{

};

SpriteText.prototype.getWidth = function()
{
    var ret = this.size * this.children.length;
    return ret;
}

SpriteText.prototype.setSpriteText = function(value)
{
    value = value.toString();

    if(this.spriteArray.length < value.length)
    {
        for(var i = 0 ; i <(value.length -this.spriteArray.length) ;i++)
        {
            var char = value[i];
            var sprite = new Phaser.Sprite(this.game, 0, this.y,this.sheetName,this.spritekey+char);
            this.add(sprite);
            this.spriteArray.push(sprite);
        }
    }
    else if(this.spriteArray.length > value.length)
    {
        for(var i = this.spriteArray.length-1 ; i >= value.length ;i--)
        {
            this.remove(this.spriteArray[i]);
            this.spriteArray.splice(i, 1);
        }
    }

    for(var i = 0 ;i < value.length;i++)
    {
        var char = value[i];
        var sprite = this.spriteArray[i];
        sprite.loadTexture(this.sheetName,this.spritekey+char);
        sprite.position.x = sprite.width * i + (i >= 1 ?this.spaceing:0);
        sprite.position.y = this.y ;
    }
};








