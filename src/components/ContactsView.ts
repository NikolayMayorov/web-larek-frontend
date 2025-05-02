import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class ContactsView {
	protected _container: HTMLElement;
	protected _events: EventEmitter;
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _buttonPay: HTMLButtonElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		this._container = container;
		this._events = events;
		this._email = this._container.querySelector(
			'.form__input_email'
		) as HTMLInputElement;

		this._email = ensureElement<HTMLInputElement>(
			'#form__email',
			this._container
		);

		this._phone = ensureElement<HTMLInputElement>(
			'#form__phone',
			this._container
		);

		this._buttonPay = ensureElement<HTMLButtonElement>(
			'.button',
			this._container
		);

		this._buttonPay.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._events.emit('contacts:pay', {
				email: this._email,
				phone: this._phone,
				button: this._buttonPay,
			});
		});

		this._email.addEventListener('input', () => {
			this._events.emit('contacts:inputContacts', {
				email: this._email,
				phone: this._phone,
				button: this._buttonPay,
			});
		});

		this._phone.addEventListener('input', () => {
			this._events.emit('contacts:inputContacts', {
				email: this._email,
				phone: this._phone,
				button: this._buttonPay,
			});
		});
	}

	render(): HTMLElement {
		return this._container;
	}
}
