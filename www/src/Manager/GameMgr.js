/**
 * Created by Maxpain on 2016/7/15.
 */

GameMgr = function ()
{
    this.instance = null;

    var name = "Nanashi";
    var account = "";
    var id = "";
    var uuid = "";
    var credit = 9998;
    var hold = 0;


    Object.defineProperty(this, "credit",
        {
            get: function ()
            {
                return credit;
            },
            set: function (value)
            {
                credit = value;
                this.notifyUpdate();
            }
        });

    Object.defineProperty(this, "name",
        {
            get: function ()
            {
                return name;
            },
            set: function (value)
            {
                name = value;
                this.notifyUpdate();
            }
        });
    Object.defineProperty(this, "hold",
        {
            get: function ()
            {
                return hold;
            },
            set: function (value)
            {
                hold = value;
                this.notifyUpdate();
            }
        });
    Object.defineProperty(this, "uuid",
        {
            get: function ()
            {
                return uuid;
            },
            set: function (value)
            {
                uuid = value;
                this.notifyUpdate();
            }
        });
    Object.defineProperty(this, "account",
        {
            get: function ()
            {
                return account;
            },
            set: function (value)
            {
                account = value;
            }
        });
    Object.defineProperty(this, "id",
        {
            get: function ()
            {
                return id;
            },
            set: function (value)
            {
                id = value;
            }
        });

    this.listeners = [];  // observers
}
GameMgr.prototype.constructor = GameMgr;

GameMgr.getInstance = function ()
{
    if (!this.instance)
    {
        this.instance = new GameMgr()
    }
    return this.instance;
}

GameMgr.prototype.registerListener = function (callback, callbackContext)
{
    var listener = {};
    listener.callback = callback;
    listener.callbackContext = callbackContext;
    this.listeners.push(listener);
}

GameMgr.prototype.unregisterListener = function (listener)
{
    this.listeners = this.listeners.filter(
        function (item)
        {
            if (item.callback !== listener.callback)
            {
                return item;
            }
        }
    );
}

GameMgr.prototype.notifyUpdate = function ()
{
    for (var i = 0; i < this.listeners.length; i++)
    {
        var listener = this.listeners[i];
        listener.callback.call(listener.callbackContext);
    }
}




