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

```

* off(type,handler) : 移除事件监听

* addHash(hash) : 添加hash

* removeHash(hash) : 移除hash

* containHash(hash) : 是否包含hash;

* clear() : 清空hash;

* trigger(type) : 触发hash事件

```
