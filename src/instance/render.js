export function initRender(vm) {
	_compileNode(vm.$el, vm);
	
}

function _compileNode(node, vm) {
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
	if (node.hasChildNodes()) {
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
		//console.log(nodeValue)

	}, vm);

	node.nodeValue = nodeValue;
}