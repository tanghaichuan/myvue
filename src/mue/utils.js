/*
 * Object 判断
 */
export const isObj = function (obj) {
  return Object.prototype.toString.call(obj) == '[object Object]';
}

/*
 * Array 判断
 */
export const isArr = function (obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
}

/*
 * 重写数组方法
 */
export const arrOps = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * 解析参数路径.
 */
const bailRE = /[^\w.$]/
export function parsePath(path: string): any {
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

/**
 * 可写
 */
export function def(obj: Object, key: string, val: any, enumerable ? : boolean) {
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
export function cloneObj(obj) {
  let newobj;
  if (!isArr(obj) && !isObj(obj)) {
    return obj;
  }

  newobj = isArr(obj) ? [] : {};
  for (let i in obj) {
    newobj[i] = (isObj(obj[i]) || isArr(obj[i])) ? cloneObj(obj[i]) : obj[i];
  }

  return newobj;
}

/**
 * 数组去重
 */
export function unique(arr) {
  return Array.from(new Set(arr));
}

/**
 * 混合装饰器
 */
export function mixin(...mixins) {
  return (target, name, descriptor) => {
    mixins.forEach(obj => {
      for (let key in obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, key);
        Object.defineProperty(target.prototype, key, desc);
      }
    });
    return descriptor;
  }
}