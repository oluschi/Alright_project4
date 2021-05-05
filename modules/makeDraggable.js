import { hasAncestor } from './utilities.js';

export default function makeDraggable(dragItem, {
	container = document.body,
	handle = dragItem,
	useBoundingRect = false,
	mediaQuery = null
} = {}) {
	let active = false;
	let initialX;
	let initialY;
	let currentX;
	let currentY;
	let xOffset;
	let yOffset;
	container.addEventListener('touchstart', dragStart, false);
	container.addEventListener('touchend', dragEnd, false);
	container.addEventListener('touchmove', drag, false);
	container.addEventListener('mousedown', dragStart, false);
	container.addEventListener('mouseup', dragEnd, false);
	container.addEventListener('mousemove', drag, false);

	function dragStart(event) {
		if (mediaQuery && 'matchMedia' in window && !window.matchMedia(mediaQuery).matches) {
			active = false;
			return;
		}

		if (event.target === handle || hasAncestor(event.target, handle)) {
			active = true;
		} else {
			return;
		}

		if (useBoundingRect && (!xOffset || !yOffset)) {
			const rect = dragItem.getBoundingClientRect();
			if (event.type === 'touchstart') {
				initialX = event.touches[0].clientX - rect.left;
				initialY = event.touches[0].clientY - rect.top;
			} else {
				initialX = event.clientX - rect.left;
				initialY = event.clientY - rect.top;
			}
		} else {
			if (event.type === 'touchstart') {
				initialX = event.touches[0].clientX - (xOffset ?? 0);
				initialY = event.touches[0].clientY - (yOffset ?? 0);
			} else {
				initialX = event.clientX - (xOffset ?? 0);
				initialY = event.clientY - (yOffset ?? 0);
			}
		}
	}

	function dragEnd(event) {
		initialX = currentX;
		initialY = currentY;
		dragItem.style.transition = '';
		active = false;
	}

	function drag(event) {
		if (active) {
			event.preventDefault();

			if (event.type === 'touchmove') {
				currentX = event.touches[0].clientX - initialX;
				currentY = event.touches[0].clientY - initialY;
			} else {
				currentX = event.clientX - initialX;
				currentY = event.clientY - initialY;
			}

			xOffset = currentX;
			yOffset = currentY;

			dragItem.style.transform = `translate(${currentX}px, ${currentY}px)`;
			dragItem.style.transition = 'none';
		}
	}
}
