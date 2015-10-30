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

#### require.config配置路径

目录结构如下：
* www
    - index.html
    - js/
        + app/
            * sub.js
        + lib/
            * jquery.js
            * underscore.js
        + app.js
        + require.js

```html
<script src="js/require.js" data-main="js/app"></script>
```

app.js:

```javascript
require.config({
    // 设置baseUrl
    baseUrl: 'js/lib',
    paths: {
        // 设置相对路径，它是基于baseUrl的
        // 这里app对应'js/app'路径
        app: '../app'
    }
});

// require配置的模块名都是基于baseUrl的，现在baseUrl='js/lib'
// 这里导入的模块就是'js/lib/jquery','js/lib/underscore'
// 'app/sub'前面的app就是上面paths中设置的，'app/sub'实际指向的模块路径是'js/app/sub'
require(['jquery', 'underscore', 'app/sub'], function ($, _, sub) {

});
```

#### 模块定义

1. 简单的键值对

```javascript
//Inside file my/shirt.js:
define({
    color: "black",
    size: "unisize"
});
```

2. 不依赖任何模块的函数

```javascript
//my/shirt.js now does setup work
//before returning its module definition.
define(function () {
    //Do setup work here

    return {
        color: "black",
        size: "unisize"
    }
});
```

3. 依赖其它模块的函数

* 这里my/shirt模块依赖的路径是my/cart,my/inventory，所以依赖模块可以写成'./cart'和'./inventory'。
* my/shirt模块返回了一个对象

```javascript
//my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
define(["./cart", "./inventory"], function(cart, inventory) {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                inventory.decrement(this);
                cart.add(this);
            }
        }
    }
);
```

4. 模块返回的是一个函数

```javascript
//A module definition inside foo/title.js. It uses
//my/cart and my/inventory modules from before,
//but since foo/title.js is in a different directory than
//the "my" modules, it uses the "my" in the module dependency
//name to find them. The "my" part of the name can be mapped
//to any directory, but by default, it is assumed to be a
//sibling to the "foo" directory.
define(["my/cart", "my/inventory"],
    function(cart, inventory) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
        return function(title) {
            return title ? (window.title = title) :
                   inventory.storeName + ' ' + cart.name;
        }
    }
);
```


