import { PaymentMethod } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class OrderView {
	protected _container: HTMLElement;
	protected _address: HTMLInputElement;
	// protected _buttonsPayment: HTMLButtonElement[];
	protected _buttonOrder: HTMLButtonElement;
	protected _events: EventEmitter;
	//protected _validationAddress: Function;
	protected _buttonCard: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		this._container = container;
		this._address = ensureElement<HTMLInputElement>(
			'.form__input',
			this._container
		);
		this._buttonCard = ensureElement<HTMLButtonElement>(
			'#button_card',
			this._container
		);
		this._buttonCash = ensureElement<HTMLButtonElement>(
			'#button_cash',
			this._container
		);
		this._events = events;

		this._buttonOrder = ensureElement<HTMLButtonElement>(
			'.order__button',
			this._container
		);

		this._buttonOrder.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._events.emit('order:next', { address: this._address.value });
		});

		this._buttonCash.addEventListener('click', () => {
			this._events.emit('order:payment', {
				payment: PaymentMethod.Cash,
			});
		});

		this._buttonCard.addEventListener('click', () => {
			this._events.emit('order:payment', {
				payment: PaymentMethod.Card,
			});
		});

		this._address.addEventListener('input', () => {
			this._events.emit('order:inputAddress', {
				address: this._address,
				button: this._buttonOrder,
			});
		});
	}

	render(): HTMLElement {
		return this._container;
	}
}
