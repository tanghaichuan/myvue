import {
	isObj
} from '../utils'

import {
	Dep
} from './dep'

class Observer {
	constructor(value) {
		this.value = value;
		this.walk(value);
	}
	walk(value) {
			Object.keys(value).forEach(key => this.convert(key, value[key])) // 递归遍历data下的所有属性
		}
		// 闭包
	convert(key, val) {
		defineReactive(this.value, key, val);
	}
}
// 对每个Object类型进行数据拦截，发生数据变动收集依赖，订阅事件
// Dep负责在查找依赖进行标识。如Watcher Render
function defineReactive(obj, key, val) {
	let dep = new Dep();

	const property = Object.getOwnPropertyDescriptor(obj, key) // 获取obj下每个属性的描述
	if (property && property.configurable === false) { // 该属性不可设置
		return
	}

	const getter = property && property.__proto__.get
	const setter = property && property.set

	let childOb = observe(val); // 复杂对象


	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			//const val = getter ? getter.call(obj) : val

			// Dep相对于当前key的context而言，
			if (Dep.target) {
				//console.log(Dep.target)
				dep.addSub(Dep.target); // 特定get，添加Watcher对象
				
			}
			return val;
		},
		set(newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal; // 改变属性值后通知依赖的watcher发生变更
			childOb = observe(newVal); // 递归为复杂类型绑定setter
			dep.notify(); // 事件发布	
		}
	})
}

export function observe(value, vm) {
	if (!value || !isObj(value)) {
		return
	}
	/*if (!value || typeof value !== 'object') {
	  return
	}*/
	return new Observer(value)
}