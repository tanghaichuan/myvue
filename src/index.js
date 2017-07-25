
import Mue from './instance/index'

var data = {
	el:'#app',
	msg:'hello',
	a: 10,
	state: {
		b: "aaa",
		c: [1, 2, 3],
		level: {
			d: 20
		}
	}
}

const Vm=new Mue(data);
