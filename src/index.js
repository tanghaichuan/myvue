
//import Mue from './instance/index'
import Mue from './mue/'

var options = {
	el:'#app',
	data:{
		b: "aaa",
		c: [1, 2, 3],
		level: {
			d: 20
		}
	}
}

const Vm=new Mue(options);
