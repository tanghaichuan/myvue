import {
  Dep
} from './dep'

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

// 拷贝array原型
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const newArrProto = [];

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(method => {
  // 获取原生数组方法
  let original = arrayMethods[method];
  // 新方法继承原生方法，新方法调用时回调原生方法
  //def(arrayMethods, method, function mutator (...args){})
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})

let list = [1, 2];
list.__proto__ = newArrProto; // 继承newArrProto重定义的方法
console.log(newArrProto)
list.push(3);