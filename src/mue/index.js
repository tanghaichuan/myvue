// @flow

import {
	observe
} from "./observe/observer"
import {
	Watcher
} from './observe/watcher'

export default class Mue {
	constructor(options = {}) {
		this.$options = options;
		this._data = this.$options.data;
		Object.keys(this._data).forEach(key => this._proxy(key))
		observe(this._data, this);
		this._init();
	}
	_init(){
		// initLifecycle
	}
	_proxy(key) {
		let self = this;
		Object.defineProperty(self, key, {
			configurable: true,
			enumerable: true,
			get() {
				return self._data[key];
			},
			set(val) {
				self._data[key] = val;
			}
		})
	}
	$watch(expOrFn, cb, options) {
		new Watcher(this, expOrFn, cb);
	}
}