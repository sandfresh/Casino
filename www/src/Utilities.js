/**
 * Created by Didu on 2016/7/1.
 */



var util = {                  //共用的AjaxOnError函式
        parseId: function (szInput)
        { //取得數字，若不是數字就回傳-999
            if (szInput == null || szInput == undefined || !szInput) return -999;
            var int = parseInt(szInput, 10);
            return isNaN(int) ? -999 : int;
        },
        alertArgs: function ()
        {      //測試用的函數，把傳入的值用逗號分割後alert
            var msg = '';
            for (var i = 0; i < arguments.length; i++)
            {
                msg += arguments[i] + ', ';
            }
            alert(msg.substr(0, msg.length - 2));
        },
        queryStr: function (name)
        {   //取得QuertString
            var AllVars = window.location.search.substring(1);
            var Vars = AllVars.split("&");
            for (i = 0; i < Vars.length; i++)
            {
                var Var = Vars[i].split("=");
                if (Var[0] == name) return Var[1];
            }
            return "";
        },
        pathName: function ()
        {
            return location.pathname.substring(location.pathname.lastIndexOf('/') + 1) + '/';
        },
        log: function (value)
        {
            window.console.log("%c" + value, "background: #222; color: #bada55");
        },
        numberWithCommas: function (x)
        {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
        getGuid: function ()
        {
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

            id = id.replace(/[xy]/g, function (c)
            {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })

            return id;
        },
        getTimeStamp: function ()
        {
            return Math.floor(Date.now() / 1000);
        },

        getUrlParm: function (url)
        {
            var paramsStart = url.indexOf('?');
            var params = null;

            //no params available
            if (paramsStart != -1)
            {
                var paramsString = url.substring(url.indexOf('?') + 1, url.length);

                //only '?' available
                if (paramsString != "")
                {
                    var paramsPairs = paramsString.split('&');

                    //preparing
                    params = {};
                    var empty = true;
                    var index = 0;
                    var key = "";
                    var val = "";

                    for (i = 0, len = paramsPairs.length; i < len; i++)
                    {
                        index = paramsPairs[i].indexOf('=');

                        //if assignment symbol found
                        if (index != -1)
                        {
                            key = paramsPairs[i].substring(0, index);
                            val = paramsPairs[i].substring(index + 1, paramsPairs[i].length);

                            if (key != "" && val != "")
                            {

                                //extend here for decoding, integer parsing, whatever...

                                params[key] = val;

                                if (empty)
                                {
                                    empty = false;
                                }
                            }
                        }
                    }

                    if (empty)
                    {
                        params = null;
                    }
                }
            }
            return params;
        }
        ,
        randomValue: function (min, max)
        {
           return Math.floor((Math.random() * max) + min);
        },
        isNumeric : function(str)
        {
            return /^\d+$/.test(str);
        }
    }
    ;