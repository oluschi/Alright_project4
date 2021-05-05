import { createElementWithClassName, createElementWithOptions } from './utilities.js';
import makeDraggable from './makeDraggable.js';
import WinBox from './WinBox.js';

export default class Icon {
	constructor({
		img = 'img/blue_file.svg',
		label = 'Untitled',
		draggable = true,
		contents = null
	} = {}) {
		this.img = img;
		this.label = label;
		this.draggable = draggable;
		this.contents = contents;
	}

	assignWinBox() {
		document.body.addEventListener('dblclick', (event) => {
			if (event.target === this.el) {
				if (this.winbox) return;
				this.winbox = new WinBox({
					title: this.label,
					onclose: () => this.winbox = null
				});
				this.winbox.append(this.contents).render(event.clientX, event.clientY);
			}
		});
	}

	render() {
		this.el = createElementWithClassName('button', 'icon');

		const iconImg = createElementWithClassName('div', 'icon-img');
		const iconImgContainer = createElementWithClassName('div', 'icon-img-container');
		let img;
		if (this.img.split('https://').length > 1 || this.img.split('http://').length > 1) {
			img = createElementWithOptions('iframe', {
				attributes: {
					frameborder: '0',
					allowfullscreen: '',
					src: this.img
				}
			});
		} else {
			img = createElementWithOptions('img', {
				attributes: {
					src: this.img,
					alt: ''
				}
			});
		}
		const label = createElementWithOptions('span', {
			class: 'icon-label',
			content: this.label
		});

		if (this.draggable) makeDraggable(this.el);
		if (this.contents) this.assignWinBox();

		iconImgContainer.appendChild(img);
		iconImg.appendChild(iconImgContainer);
		this.el.append(iconImg, label);

		return this.el;
	}
}
