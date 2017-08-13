//import Mue from './instance/index'
import Mue from './mue/'

var options = {
  el: '#app',
  data: {
    a: 2,
    b: "aaa",
    c: [1, 2, 3],
    level: {
      d: 20,
      e: {
        f: 'aaa'
      }
    }
  }
}

const Vm = new Mue(options);

//Vm.c.push(4);

Vm.$watch('level.d', () => console.log('level发生了改变'));
setTimeout(() => {
  Vm.level.d = 10;
}, 1000);

Vm.$watch('c', () => console.log('c发生了改变'));
setTimeout(() => {
  Vm.c.push(4);
}, 2000);