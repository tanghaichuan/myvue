export function initLifecycle() {

}
export function mountComponent(el) {
	// 获取dom元素
	el = document.querySelector(el);
	// 限制根节点挂载到html和body标签上
	if (el === document.body || el === document.documentElement) {
		console.error("Do not mount mue to <html> or <body>");
		return this;
	}
	const options = this.$options;
	// console.log(this.$options);
	// 如果未实例化render函数，将template及el转化为render函数
	// vnode->AST->render
	if (!options.render) {
		// 暂时不实现template编译vdom
		let template = options.template;
		if (template) {
			console.log(template);
		}
		if ((template && template.charAt(0) !== '#') || options.el || el) {
			console.warn("vue-runtime版本不支持template编译语法树");
		} else {
			console.warn("Failed to mount");
		}
	}

	// beforemount

	let updateComponent
	// updateComponent=>_update(AST);
	// 当_render调用的时候，所以来的变量就被求值，同时收集依赖，监测数据变动，watcher实例化时render，数据发生变化，再次render
	updateComponent = () => {
		this._update(this._render())
	}

	//this._watcher = new Watcher(this, updateComponent, noop)

	// if $vnode = null => mounted
	return this;
}