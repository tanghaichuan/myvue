import {
	observe
} from '../observe/observe'

export function initState(vm) {
	observe(vm);
}