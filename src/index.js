import {
	test
} from './test';

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

var Vm = new test(data, callback);
