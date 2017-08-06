import {
	isObj,
	isArr,
	def
} from '../utils'

import {
	Dep
} from './dep'

const arrDep = new Dep();

class Observer {
	constructor(value) {
		this.value = value;
		this.dep = new Dep();
		def(value, '__ob__', this);
		if (isObj(this.value)) {
			this.walk(value);
		} else {
			this.observeArray(value)
		}
	}
	walk(value) {
			Object.keys(value).forEach(key => this.convert(key, value[key])) // 递归遍历data下的所有属性
		}
		// 闭包
	convert(key, val) {
		defineReactive(this.value, key, val);
	}

	observeArray(value) {
		const arrayProto = Array.prototype;
		const arrayMethods = Object.create(arrayProto);
		const newArrProto = [];
		const self = this;
		[
			'push',
			'pop',
			'shift',
			'unshift',
			'splice',
			'sort',
			'reverse'
		].forEach(method => {
			let original = arrayMethods[method];
			Object.defineProperty(arrayMethods, method, {
				value() {
					// 获取变动数据
					let arg = [].slice.apply(arguments);
					let result = original.apply(this, arg);
					//console.log("数组变动");
					observe(this);
					arrDep.notify();
					return result;
				},
				writable: true,
				enumerable: false,
				configurable: true
			})
		})
		value.__proto__ = arrayMethods;
	}
}
// 对每个Object类型进行数据拦截，发生数据变动收集依赖，订阅事件
// Dep负责在查找依赖进行标识。如Watcher Render
function defineReactive(obj, key, val) {
	const dep = new Dep(); // dep封装了管理wather队列的方法，dep只能实例化一次，否则watcher会被重置

	const property = Object.getOwnPropertyDescriptor(obj, key) // 获取obj下每个属性的描述
	if (property && property.configurable === false) { // 该属性不可设置
		return
	}

	const getter = property && property.get
	const setter = property && property.set

	let childOb = observe(val); // 复杂对象

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			//const val = getter ? getter.call(obj) : val

			// Dep相对于当前key的context而言，
			if (Dep.target) { // Dep.target会在watcher实例化是指向this
				dep.addSub(Dep.target); // 特定get
				if (isArr(val)) {
					dependArray(val);
				}
			}
			return val;
		},
		set(newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal; // 改变属性值后通知依赖的watcher发生变更
			childOb = observe(newVal); // 递归为复杂类型绑定setter
			dep.notify(); // 触发watcher队列轮询,告知dep再访问一下watcher的数据，看有无变动	
		}
	})
}

export function observe(value, vm) {
	/*if (!value || !isObj(value)) {
		return
	}*/
	if (!value || typeof value !== 'object') {
		return
	}
	return new Observer(value)
}

function dependArray(val) {
	
	arrDep.addSub(Dep.target);
	for (let i = 0; i < val.length; i++) {
		let e = val[i];
		if (isArr(e)) {
			dependArray(e);
		}
	}
}