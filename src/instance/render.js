
export function initRender(vm) {
	// Fragment不是实质的节点
	vm.fragment = document.createDocumentFragment();
	vm.currentList = [];
	vm.currentList.push(vm.fragment);
	_compileNode(vm.$template, vm);

	// 将文档片段替换原节点
	vm.$el.parentNode.replaceChild(vm.fragment, vm.$el);
	// 更新 $el
	vm.$el=document.querySelector(vm.$data.el);
}

function _compileNode(node,vm) {
	switch (node.nodeType) {
		// 元素节点
		case 1:
			_compileElement(node, vm);
			break;
			// 属性	
		case 3:
			_compileText(node, vm);
			break;
		default:
			return;
	}
}

function _compileElement(node, vm) {
	let newNode =document.createElement(node.tagName);

	if (node.hasChildNodes()) {
		let attrs = node.attributes;
		Array.from(attrs).forEach(attrs => {
			newNode.setAttribute(attrs.name, attrs.value);
		});
	}

	let currentNode = vm.currentList[vm.currentList.length - 1].appendChild(newNode);
	if (node.hasChildNodes()) {
		vm.currentList.push(currentNode);
		Array.from(node.childNodes).forEach(node => {
			_compileNode(node, vm)
		});
	}
}

function _compileText(node, vm) {
	let nodeValue = node.nodeValue;
	if (nodeValue === '') return;

	let patt = /\{\{(.*)\}\}/g;
	let ret = nodeValue.match(patt);

	if (!ret) return;

	ret.forEach(value => {
		let property = value.replace(/[{{}}]/g, '');
		nodeValue = nodeValue.replace(value, vm.$data[property]);
	}, vm);

	vm.currentList[vm.currentList.length - 1].appendChild(document.createTextNode(nodeValue));
}