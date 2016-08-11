/**
 * Created by Maxpain on 2016/6/28.
 */


var WebWorkerMgr = (function ()
{
    var instance;

    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();