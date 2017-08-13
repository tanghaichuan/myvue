// @flow

import {
  observe
} from "./observe/observer"

import {
  Watcher
} from './observe/watcher'

import {
  mountComponent
} from './instance/lifecycle'

export default class Mue {
  constructor(options = {}) {
    this.$_el = options.el;
    this.$options = options;
    this._data = this.$options.data;


    Object.keys(this._data).forEach(key => this._proxy(key));



    //initLifecycle
    this._watcher = null
    this._inactive = null
    this._directInactive = false
    this._isMounted = false
    this._isDestroyed = false
    this._isBeingDestroyed = false

    // 初始化vdom initrender



    // observe initState
    observe(this._data, this); // initstate

    // render
    this.$mount(this.$_el);


    this._init();
  }

  _init() {
    // initLifecycle

  }

  _render() {

    //return vnode
  }

  _update() {

  }

  $watch(expOrFn, cb, options) {
   return new Watcher(this, expOrFn, cb);
  }
  // lifecycle
  $mount(el) {
   return mountComponent.call(this,el);
  }
  // renderMixin
  $nextTick() {

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

}