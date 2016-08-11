/**
 * Created by Maxpain on 2016/7/13.
 */


function JSTimer(callback,callbackContext, countdown) {
    var ident , complete = false;

    var start_time = 0;
    var isstop = true;
    var fn = function()
    {
        callback.call(callbackContext);
    };

    function _time_diff(date1, date2) {
        return date2 ? date2 - date1 : new Date().getTime() - date1;
    }

    function cancel() {
        clearTimeout(ident);
    }

    function stop() {

        isstop = true;
        clearTimeout(ident);
    }

    function start() {

        start_time = new Date().getTime();
        isstop = false;
        genTimeout();
    }

    function pause() {
        clearTimeout(ident);
        var total_time_run = _time_diff(start_time);
        complete = total_time_run >= countdown;
    }

    function resume() {
        ident = complete ? -1 : setTimeout(fn, countdown - total_time_run);
    }

    function genTimeout()
    {
        ident = setTimeout(function ()
        {
            if(isstop)
                return;
            fn.call(this);
            genTimeout();
        }, countdown);
    }

    return { start:start,stop:stop, cancel: cancel, pause: pause, resume: resume };
}
