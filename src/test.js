/*
 *  Object 判断
 */
const getObj = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Object]';
}

/*
 *  Array 判断
 */
const getArr = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
}

/*
 *  重写数组方法
 */
const arrOps = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

export class test {
	constructor(obj, callback) {
		if (!getObj(obj)) {
			console.error('This parameter must be an object：' + obj);
		}
		this.callback = callback;
		this.observe(obj);
	}

	observe(obj, path) {
		if (getArr(obj)) {
			this.overrideArrayProto(obj, path);
		}
		Object.keys(obj).forEach(function(key, index, keyArray) {
			var oldVal = obj[key];
			var pathArray = path && path.slice(0);
			if (pathArray) {
				pathArray.push(key);
			} else {
				pathArray = [key];
			}
			Object.defineProperty(obj, key, {
				get: function() {
					return oldVal;
				},
				set: (function(newVal) {
					if (oldVal !== newVal) {
						if (getObj(newVal) || getArr(newVal)) {
							this.observe(newVal, pathArray);
						}
						this.callback(oldVal, newVal, pathArray);
						oldVal = newVal;
					}
				}).bind(this)
			});

			if (getObj(obj[key]) || getArr(obj[key])) {
				this.observe(obj[key], pathArray);
			}

		}, this);
	}

	overrideArrayProto(array, path) {
		// 保留原Array原型
		var orignProto = Array.prototype,
			// 通过 Object.create 方法创建一个对象，该对象的原型就是Array.prototype
			overrideProto = Object.create(Array.prototype),
			self = this,
			result;
		Object.keys(arrOps).forEach(function(key, index, array) {
			var method = arrOps[index],
				oldArray = [];
			// 使用 Object.defineProperty 给 overrideProto 添加属性，属性的名称是对应的数组函数名，值是函数	
			Object.defineProperty(overrideProto, method, {
				value: function() {
					oldArray = this.slice(0);
					var arg = [].slice.apply(arguments);
					// 调用原始 原型 的数组方法
					result = orignProto[method].apply(this, arg);
					// 对新的数组进行监测
					self.observe(this, path);
					self.callback(this, oldArray, path);
					return result;
				},
				writable: true,
				enumerable: false,
				configurable: true
			});
		}, this);

		array.__proto__ = overrideProto;

	}
}