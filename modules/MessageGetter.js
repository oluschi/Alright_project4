import { createElementWithClassName } from './utilities.js';
import TextMessage from './TextMessage.js';

export default class MessageGetter {
	fetch() {
		const Airtable = require("airtable");
		const base = new Airtable({	apiKey: "keygEINsXOj57TR6b" }).base("app3J7I3REkUeJGxY");

		return base("media").select({}).all();
	}

	render() {
		this.el = createElementWithClassName('div', 'icon-group');

		this.fetch().then((records) => {
			const messageIcons = records.map((r) => {
				return new TextMessage({ message: r.get('message') }).render();
			});
			this.el.append(...messageIcons);
		});

		return this.el;
	}
}
