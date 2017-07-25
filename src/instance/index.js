import {
	initMixin
} from './init'
import {
	initState
} from './state'

function Mue(options) {
	this._init(options);
}

initMixin(Mue);

export default Mue