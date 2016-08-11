/**
 * Created by Maxpain on 2016/6/28.
 */


var Client = function ()
{
    this.instance = null;
}

Client.getInstance = function ()
{
    if (!this.instance)
    {
        this.instance = new Client()
    }
    return this.instance;
}

Client.prototype.openConnection = function ()
{
    var docurl = document.URL;
    var cookie = document.cookie;
    window.console.log("url:", docurl);
    window.console.log("cookie:", cookie);
    var param = util.getUrlParm(docurl);
    var token ;
    var url;
    if(CustomConfig.DebugMode == true)
    {
        // "";//test02
        //  "";//test03
        token = "";//test08

        url = "ws://";
    }
    else
    {
        url = "ws://";
    }

    if(param != null)
    {
        if(param.hasOwnProperty("token"))
        {
            token = param["token"];
            window.console.log("token:", token);
        }

    }

    var url = url+token;

    this.ws = new WebSocket(url);
    this.connected = false;

    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
    this.ws.onclose =  this.onClose.bind(this);
};


Client.prototype.connectionOpen = function ()
{
    this.connected = true;
    window.console.log('connected\n');
};

Client.prototype.closenConnetcion = function ()
{
  //  this.ws.close();
};


Client.prototype.onMessage = function (message)
{
    var data = JSON.parse(message.data);

    if(data.hasOwnProperty(WebSocketNameTag.MessageType))
        if(data[WebSocketNameTag.GameType] == GameTypeNameTag.Lobby && (data[WebSocketNameTag.MessageType] == MessageNameTag.MsgKeepLive))
            return;
    window.console.log('data', data);
    this.callback.call(this.callbackContext, data);

    this.lastData = data;
};

Client.prototype.displayError = function (err)
{
    window.console.log('Websocketerror: ' + err);
};


Client.prototype.sendMessage = function (msg)
{
    if(this.ws != null)
     this.ws.send(msg);
}

Client.prototype.setCallBack = function (callback, callbackContext)
{
    this.callback = callback;
    this.callbackContext = callbackContext;
}


function CallBackInfo(callback, callbackContext)
{
    this.callback = callback;
    this.callbackContext = callbackContext;
}

CallBackInfo.prototype.constructor = CallBackInfo;

CallBackInfo.prototype.excute = function()
{
    this.callback.call(this.callbackContext);
};

Client.prototype.onClose = function (message)
{
    this.connected = false;
    window.console.log("onClose",message);
    var data = {};
    data.message = "socket closed";
    data.code = message.code;
    this.callback.call(this.callbackContext, data);
}