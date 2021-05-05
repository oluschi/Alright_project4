import Icon from './Icon.js';

export default class TextMessage extends Icon {
	constructor({ label = 'Untitled', message = '' } = {}) {
		super();
		this.img = 'img/file.svg';
		this.label = label;
		this.contents = document.createTextNode(message);
		this.draggable = false;
	}

	render() {
		this.el = super.render();
		this.el.classList.add('txt');
		return this.el;
	}
}
