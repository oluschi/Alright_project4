import Icon from './modules/Icon.js';
import MessageGetter from './modules/MessageGetter.js';
import WinBox from './modules/WinBox.js';
import { createElementWithClassName } from './modules/utilities.js';

const MISSION_STATEMENT = 'This is a site that provides aid and encouragement to those who may feel mentally and emotionally drained within today’s online platforms. Alright is a place you can share positive notes and ideas with people and feel a little less alone in this world.';
const GIFS = [
	{
		url: 'https://giphy.com/embed/dalJ0CpF7hwmN1nZXe',
		label: 'You got this!'
	}
];

document.getElementById('desktop').append(
	new Icon({
		label: 'Feeling Sad?',
		contents: (() => {
			const container = createElementWithClassName('div', 'icon-group');
			const gifIcons = GIFS.map((gif) => new Icon({
				label: gif.label,
				img: gif.url
			}).render());
			container.append(...gifIcons);
			return container;
		})()
	}).render(),
	new Icon({
		label: 'Messages',
		contents: new MessageGetter().render()
	}).render(),
	new Icon().render()
);

document.getElementById('about').addEventListener('click', () => {
	if (document.getElementById('about-window')) {
		return;
	}

	const aboutWindow = new WinBox({
		title: 'Mission Statement',
		id: 'about-window',
		width: 600,
		height: 600
	});

	aboutWindow.append(MISSION_STATEMENT).render();
});
