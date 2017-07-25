import {
	initRender
} from './render'

// mixin多重继承
export function initMixin(Mue) {
	Mue.prototype._init=function(options){
		const vm = this;

		vm.$data=options;
		vm.$el=document.querySelector(options.el);
		initRender(vm);
		//console.log(vm)
	}
}