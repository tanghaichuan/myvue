import {
	initMixin
} from './init'
import {
	initState
} from './state'

function Mue(options) {
	// new实例this指向本身
	if(!this instanceof Mue){
		console.error("Mue is a constructor and should be called with the `new` keyword");
	}
	this._init(options);
}

initMixin(Mue);

export default Mue