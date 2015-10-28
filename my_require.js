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
        jsSuffixRegExp = /\.js$/,
        defContextName = '_',
        contexts = {};

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    // 遍历数组
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i++) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
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

    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            // 遍历source属性
            eachProp(source, function (value, prop) {
                // 如果force=true或target没有相同的属性prop时
                if (force || !hasProp(target, prop)) {
                    // 当value是一个对象时
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    if (typeof define !== 'undefined') {
        // 如果define已经通过其它的AMD加载器定义了，则无法覆盖
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            // 不能覆盖已经存在的requirejs实例
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    function newContext(contextName) {
        var context, Module,
            config = {
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            undefEvents = {},
            registry = {},
            defined = {},
            urlFetched = {},
            defQueue = [];

        function makeModuleMap() {

        }

        function onError() {

        }

        Module = function (map) {

        };

        Module.prototype = {

        };

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            // 第一次req({})时，这里的cfg为空对象
            configure: function (cfg) {
                // 确保baseUrl以`/`结尾
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                var shim = config.shim,
                    // objs里的属性值存放的都是对象
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                // 把cfg合并到config
                eachProp(cfg, function (value, prop) {
                    // objs[prop]存在时，value是一个对象
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        // 把value对象合并到config[prop]中
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                if (cfg.bundles) {

                }

                if (cfg.shim) {

                }

                if (cfg.packages) {

                }

                eachProp(registry, function (mod, id) {

                });

                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },
            makeRequire: function (relMap, options) {
                // 在第一次被调用时（即req({})时）初始化makeRequire内部上下文
                options = options || {};

                function localRequire(deps, callback, errback) {
                    if (typeof deps === 'string') {

                    }
                }

                // 给localRequire合并属性
                mixin(localRequire, {
                    isBrowser: isBrowser,
                    toUrl: function () {},
                    defined: function () {},
                    specified: function () {}
                });

                if (!relMap) {
                    localRequire.undef = function () {};
                }
                return localRequire;
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * 主入口
     *
     */
    req = requirejs = function (deps, callback, errback, optional) {
        var context, config,
            contextName = defContextName;

        if (!isArray(deps) && typeof deps !== 'string') {
            config = deps;
            if (isArray(callback)) {

            } else {
                deps = [];
            }
        }

        if (config && config.context) {

        }

        // 只有当req({})执行时,context=false
        context = getOwn(contexts, contextName);
        if (!context) {
            // 这里只在req({})时执行一次
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        //return context.require(deps, callback, errback);
    };

    req.config = function (config) {
        return req(config);
    };

    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    req.version = version;

    req.jsExtRegExp = /^\/|:|\?|\.js$/;

    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    req({});

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

    //req(cfg);

}(this));
