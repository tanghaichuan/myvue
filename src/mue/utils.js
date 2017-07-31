/*
 *  Object 判断
 */
export const isObj = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Object]';
}

/*
 *  Array 判断
 */
export const isArr = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Array]';
}

/*
 *  重写数组方法
 */
export const arrOps = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * 参数路径.
 */
const bailRE = /[^\w.$]/
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}