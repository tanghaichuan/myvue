import {
	unique
} from '../utils'

// 发布器
export class Dep {
	constructor() {
		this.subs = []; // 缓冲依赖池
	}
	addSub(sub) {
		this.subs.push(sub); // 依赖池添加Watcher
		this.subs = unique(this.subs);
	}
	notify() {
		this.subs.forEach(sub => sub.update()); // set触发时，更新队列中的Wathcer
	}
}

Dep.target = null;
const targetStack = [];

export function pushTarget(_target) {
	if (Dep.target) targetStack.push(Dep.target);
	Dep.target = _target;
}

export function popTarget() {
	Dep.target = targetStack.pop()
}