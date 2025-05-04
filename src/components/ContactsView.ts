import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class ContactsView {
	protected _container: HTMLElement;
	protected _events: EventEmitter;
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _buttonPay: HTMLButtonElement;
	protected _errors: HTMLElement;

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

		this._errors = ensureElement<HTMLElement>('.form__errors', this._container);

		this._buttonPay.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._events.emit('contacts:pay');
		});

		this._email.addEventListener('input', () => {
			this._events.emit('contacts:inputContacts', {
				email: this._email.value,
				phone: this._phone.value ? this._phone.value : '',
			});
		});

		this._phone.addEventListener('input', () => {
			this._events.emit('contacts:inputContacts', {
				email: this._email.value ? this._email.value : '',
				phone: this._phone.value,
			});
		});
	}

	setValid(isValid: boolean, errorMsg: string): void {
		if (isValid) {
			this._errors.innerText = '';
			this._buttonPay.disabled = false;
		} else {
			this._errors.innerText = errorMsg;
			this._buttonPay.disabled = true;
		}
	}

	render(): HTMLElement {
		return this._container;
	}
}
