import {
	mue
} from './mue';

var callback = function(newVal, oldVal, path) {
	console.log(oldVal + ":" + newVal + ":" + path);
}

var data = {
	a: 10,
	state: {
		b: "aaa",
		c: [1, 2, 3],
		level: {
			d: 20
		}
	}
}

var Vm = new mue(data, callback);
data.a = 200;
data.state.c.push(4);