import {
	pushTarget,
	popTarget
} from './dep'

import {
	parsePath,
	isObj,
	isArr,
	cloneObj
} from '../utils'
// 订阅器
// 访问对象时将检测对象添加入targetStack中，对象发生改变触发run()进行值对比。

export class Watcher {
	constructor(
		vm: Component,
		expOrFn: string | Function,
		cb: Function,
		options ? : Object
	) {
		this.cb = cb; // 回调函数
		this.vm = vm; // 全局context
		this.expOrFn = expOrFn; // watcher对象
		if (typeof expOrFn === 'function') {
			//计算属性
			this.getter = this.expOrFn;
		} else {
			//this.getter = parsePath(expOrFn);
			this.value = this.get(); // watcher绑定时,访问原始未变化属性
			this.newArr = cloneObj(this.value)
			console.log(this.newArr)
		}
	}
	get() {
		pushTarget(this); // 实例化watcher要改变target的context,Dep.target=this，即指向this.expOrFn的context;
		//if(typeof this.getter === 'string') return;	// 监测值变更时又访问了属性一遍？
		/*if(typeof this.getter === 'function'){
			this.getter = this.getter.call(this.vm,this.vm);
		}*/
		const segments = this.expOrFn.split('.'); // 参数路径
		let seen = segments.pop(); // 查找值
		
		let value;
		value = traverse(this.vm._data, seen).pop();// 基本上实现了对复杂对象的监测
		temp = []; // 清空用于记录递归查找的属性值
		//value = this.vm._data[this.expOrFn];
		//value = this.getter;		// getter拿到变化后的值？

		popTarget();

		this.cleanupDeps(); // 未实现
		return value;
	}
	update() {
		this.run(); // 此时数据发生变化
	}
	run() { // value发生变化，调用回调函数
		const value = this.get();
		if (value !== this.newArr) {
			this.value = value;
			this.cb.call(this.vm);
		}
	}
	cleanupDeps() {

	}
}


// 需要优化
let temp = [];
function traverse(obj, seen) {
	if (obj[seen] && !isObj(obj[seen])) {
		temp.push(obj[seen])
		return temp;
	} else {
		Object.keys(obj).forEach(key => {
			if (isObj(obj[key])) {
				traverse(obj[key], seen);
			}
		});
		return temp
	}
}
