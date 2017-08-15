// @flow

import {
  Watcher
} from './observe/watcher'

import {
  mountComponent
} from './instance/lifecycle'

import {
  initLifecycle
} from './instance/lifecycle'
import {
  initEvents
} from './instance/events'
import {
  initRender
} from './instance/render'
import {
  initState
} from './instance/state'

export default class Mue {
  constructor(options = {}) {
    this.$_el = options.el;
    this.$options = options;
    this._data = this.$options.data;

    Object.keys(this._data).forEach(key => this._proxy(key));

    this._init();
  }

  _init() {
    initLifecycle.call(this);
    initEvents.call(this);
    initRender.call(this);
    // callHook(vm, 'beforeCreate')
    //initInjections();
    initState.call(this);
    //initProvide();
    // callHook(vm, 'created')
    this.$mount(this.$_el); // render
  }

  _render() {
    // 解析render函数
    // 解析对象 return vnode
  }

  _update(vnode) { // =>调用_render
    // 生成Ast
  }

  $watch(expOrFn, cb, options) {
    return new Watcher(this, expOrFn, cb);
  }
  // lifecycle
  $mount(el) {
    return mountComponent.call(this, el);
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