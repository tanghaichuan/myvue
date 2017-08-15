import {
    observe
} from "../observe/observer"

export function initState() {
    // 解析props
    if (this.$options.props) {
        initProps();
    }
    // 解析methods
    if (this.$options.methods) {
        initMethods();
    }
    // 解析data
    if (this.$options.data) {
        //initData()
        observe(this._data, this); // initstate
    } else {
        observe(this._data = {}, true /* asRootData */ )
    }
    // 解析computed
    if (this.$options.computed) {
        initComputed();
    }
    if (this.$options.watch) {
        initWatch();
    }
}