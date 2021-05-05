import { createElementWithClassName, createElementWithOptions } from './utilities.js';
import makeDraggable from './makeDraggable.js';

export default class WinBox {
	constructor({
		title = null,
		id = null,
		width = 1024,
		height = 768,
		animate = true,
		draggable = true,
		onclose = () => null
	} = {}) {
		this.title = title;
		this.id = id;
		this.width = width;
		this.height = height;
		this.animate = animate;
		this.draggable = draggable;
		this.onclose = onclose;
	}

	append(...childNodes) {
		if (this.childContainer) {
			this.childContainer.append(...childNodes);
		} else {
			this.children = [...childNodes];
			return this;
		}
	}

	close() {
		if (!this.el) return;

		if (this.animate) {
			const inner = this.el.firstElementChild;
			inner.style.transform = 'scale(0)';
			inner.style.opacity = '0';
			inner.addEventListener('transitionend', () => {
				this.el.remove();
				this.onclose();
			});
		} else {
			this.el.remove();
			this.onclose();
		}
	}

	render(x = window.innerWidth / 2, y = window.innerHeight / 2) {
		this.el = createElementWithOptions('div', {
			class: 'winbox',
			style: {
				width: `${this.width}px`,
				height: `${this.height}px`
			}
		});
		if (this.id) this.el.id = this.id;

		const inner = createElementWithClassName('div', 'winbox-inner');
		const titlebar = createElementWithClassName('header', 'winbox-titlebar');
		const closeButton = createElementWithOptions('button', {
			class: 'winbox-titlebar-button',
			title: 'Close',
			'aria-label': 'Close'
		});
		closeButton.addEventListener('click', this.close.bind(this));
		const title = createElementWithOptions('span', {
			class: 'winbox-title',
			content: this.title
		});
		const body = createElementWithClassName('div', 'winbox-body');

		if (this.animate) {
			this.el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(0)`;
			this.el.style.opacity = '0';
		}

		if (this.draggable) makeDraggable(this.el, {
			handle: titlebar,
			useBoundingRect: true,
			mediaQuery: '(min-width: 1024px)'
		});

		if (this.children) {
			body.append(...this.children);
			this.children = null;
		}
		titlebar.appendChild(closeButton);
		if (this.title) titlebar.appendChild(title);
		inner.append(titlebar, body);
		this.el.appendChild(inner);
		document.body.appendChild(this.el);

		this.el.focus();
		this.el.style.transform = '';
		this.el.style.opacity = '';
		this.childContainer = body;

		return body;
	}
}
