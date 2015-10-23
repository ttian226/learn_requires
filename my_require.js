/**
 * Created by wangxu on 10/21/15.
 */
var requirejs, require, define;
(function (global) {
    var req,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty;


    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasOwn(obj, prop) && obj[prop];
    }

    /**
     * 主入口
     *
     */
    req = requirejs = function (deps, callback, errback, optional) {

    };
}(this));
