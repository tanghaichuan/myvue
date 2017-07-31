// @flow

import {
	observe
} from "./observer"

export default class Mue {
	constructor(options = {}) {
		this.$options = options;
		this._data = this.$options.data;
		Object.keys(this._data).forEach(key => this._proxy(key))
		//observe();
	}
	_proxy(key) {
		console.log(key)
	}
}