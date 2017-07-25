import {
	initRender
} from './render'
import {
	initState
} from './state'

// mixin多重继承
export function initMixin(Mue) {
	Mue.prototype._init = function(options) {
		const vm = this;

		vm.$data = options;
		vm.$el = document.querySelector(options.el);
		initRender(vm);
		//console.log(vm)
		initState(vm);
	}
}