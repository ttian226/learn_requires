/**
 * Created by wangxu on 10/21/15.
 */
var requirejs, require, define;
(function (global) {
    var req, head, s, dataMain, mainScript, src, subPath,
        version = '2.1.20',
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        cfg = {},
        jsSuffixRegExp = /\.js$/;


    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasOwn(obj, prop) && obj[prop];
    }

    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    /**
     * 主入口
     *
     */
    req = requirejs = function (deps, callback, errback, optional) {

    };

    req.version = version;

    req.jsExtRegExp = /^\/|:|\?|\.js$/;

    s = {};

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
    }

    if (isBrowser) {
        eachReverse(scripts(), function (script) {
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                mainScript = dataMain;
            }

            // 如果没有配置baseUrl，配置baseUrl
            if (!cfg.baseUrl) {
                src = mainScript.split('/');
                mainScript = src.pop();
                subPath = src.length ? src.join('/') + '/' : './';
                cfg.baseUrl = subPath;
            }

            // 去掉扩展名'.js'
            mainScript = mainScript.replace(jsSuffixRegExp, '');

            // 如果mainScript是一个路径，返回dataMain
            if (req.jsExtRegExp.test(mainScript)) {
                mainScript = dataMain;
            }

            // 初始化cfg.deps
            cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
            return true;
        });
    }

    req(cfg);

}(this));
