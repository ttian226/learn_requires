#### learn_requireJS

[参考链接](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

加载`require.js`，`data-main`标识入口文件，比如入口文件是`main.js`。值是`main`（省略后缀`js`）

```html
<script src="require.js" data-main="main"></script>
```

main.js:

```javascript
// require第一个参数为一个数组，数组的元素是模块名
// 它和文件名是一致的，比如模块名underscore对应的加载文件是underscore.js
require(['underscore'], function (_) {
    // 当underscore.js加载完成后会调用回调
    // `_`引用underscore对象
    _([1, 2, 3]).each(function (val) {
        console.log(val);
    });
});
```

同时加载多个模块

```javascript
require(['underscore', 'jquery'], function (_, $) {
    // 当前underscore.js和jquery.js都加载完后，执行这里
});
```



