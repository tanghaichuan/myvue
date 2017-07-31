export default class Observer {
	constructor(value) {
		this.value = value;
		this.walk(value);
	}
	walk() {
		console.log(1)
	}
}
export function defineReactive(){

}

export function observe (value, vm) {
  /*if (!value || typeof value !== 'object') {
    return
  }*/
  return new Observer(value)
}