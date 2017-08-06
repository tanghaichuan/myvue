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
    //console.log(obj._data)
    //console.log(segments) // 访问属性路径,闭包记录现场
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj._data[segments[i]]  
    }
    return obj
  }
}


export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * 深拷贝
 */

export function cloneObj(obj){
  var str, newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
      return;
  } else if(window.JSON){
      str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str); //还原
  } else {
      for(var i in obj){
          newobj[i] = typeof obj[i] === 'object' ? 
          cloneObj(obj[i]) : obj[i]; 
      }
   }
  return newobj;
}

