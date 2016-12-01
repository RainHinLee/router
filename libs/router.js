
export default class Router{
	
	constructor(reset=false) {
		this.callbacks = Object.create({});
		this.defaultFn = function(){};
		window.addEventListener('hashchange',this.change.bind(this),false);
	}

	on(type,callback=this.defaultFn){  //--添加事件
		let list = this.callbacks[type];

		if(list&&list.length){ //--存在事件
			this.callbacks[type].push(callback)
		}else{
			this.callbacks[type] = [callback];
		}
		return this;
	}

	off(type,callback){ //---移除事件
		let list = this.callbacks[type];
		if(list && list.length){
			if(callback){
				let index = list.findIndex(item => item==callback);
				if(index>=0){ //---存在该函数
					this.callbacks[type].splice(index,1);
				}

			}else{
				this.callback[type] = [];
			}
		};
		return this;
	}

	trigger(type){  //---触发事件
		let list = this.callbacks[type];
		let args = Array.from(arguments);
		if(list && list.length){
			list.forEach(item => item(args.slice(1)));
		}
	}

	addHash (hash){  //--增加hash
		let target = document.location.hash.slice(1);
		let isContain = this.containHash(hash);
		if(!target.length){
			document.location.hash = hash
			return
		};

		if(isContain){
			return target
		};
		document.location.hash = target+'&'+hash;
		return this
	}

	removeHash(hash){  //---移除hash
		let target = document.location.hash.slice(1);
		let str = '&'+hash;
		let isBefore = target.indexOf(hash)
		let index2 = target.indexOf(str);
		if(index2>=0){
			document.location.hash = target.replace(str,'');
		}else if(isBefore>=0){ //--在最前面
			document.location.hash = target.replace(hash,'');
		};

		return this
	}

	clear(){
		document.location.hash = '';
	}

	disposeHash(oldHash,newHash){  //---处理hash变化情况；增加hash数组，删除hash数组
		let oldHashs = oldHash.split('&');
		let newHashs = newHash.split('&');
		return {
			removes : this.diffHash(oldHashs,newHashs), //--移除的hash项
			adds : this.diffHash(newHashs,oldHashs)  //--增加的hash项
		}
	}

	diffHash(origin,target){  //---数组差值项；返回origin数组中有而target数组中无的项；
		let str = target.join('&');
		let result = [];

		origin.forEach(item => {
			if(str.indexOf(item)<0){ //--该项不再target中
				result.push(item)
			}
		});
		return result;
	}

	change(ev){  //---hashchange事件
		let oldHash = this.getHash(ev.oldURL);
		let newHash = this.getHash(ev.newURL);
		let changes = this.disposeHash(oldHash,newHash);
		let removes = changes.removes;
		let adds = changes.adds;
		this.fire(removes,'remove');  //--移除hash项
		this.fire(adds,'add') //---增加hash项
		this.trigger('change',ev,changes);
	}

	fire(hashs,type){  //---发布事件
		hashs.forEach(hash => {
			let name = hash+':'+type
			this.trigger(name,hashs);
		})
	}

	getHash(url){ //--取得链接的hash值
		let urls = url.split('#');
		let hash = urls.slice(1).join('#');
		return hash
	}

	containHash(hash){  //---当前路径是否包含hash
		let target = document.location.hash;
		return target.indexOf(hash)>=0;
	}

}