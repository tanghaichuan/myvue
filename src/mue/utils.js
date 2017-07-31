/*
 *  Object 判断
 */
const isObj = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Object]';
}

/*
 *  Array 判断
 */
const isArr = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
}

/*
 *  重写数组方法
 */
const arrOps = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

export default class Mue {

}