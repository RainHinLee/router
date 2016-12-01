###使用方法

-------------------------------------


* 构造函数

```
	import Router from 'router.js';

	let router = new Router();
```

* on(type,handler) : 注册事件，router会触发"hash:add","hash:remove","change"三种事件

```
	router.on('test:add',()={  //---test增加到hash触发
		console.log('test add')
	});

	router.on('test:remove',()=>{ //---test从hash中移除
		console.log('test remove')
	});

	router.addHash('test'); //---增加test到hash

	router.removeHash('test') //--从hash中移除test;

	router.containHash('test') //---hash中是否包含test

	router.clear() // ---清空hash;

```
