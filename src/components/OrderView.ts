import { PaymentMethod } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class OrderView {
	protected _container: HTMLElement;
	protected _events: EventEmitter;
	protected _address: HTMLInputElement;
	protected _buttonOrder: HTMLButtonElement;
	protected _buttonCard: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;
	protected _errors: HTMLElement;

	//button_alt
	constructor(
		container: HTMLElement,
		events: EventEmitter,
		payment: PaymentMethod
	) {
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

		this._errors = ensureElement<HTMLElement>('.form__errors', this._container);

		this._buttonOrder.addEventListener('click', (evt) => {
			evt.preventDefault();
			this._events.emit('order:next', { address: this._address.value });
		});

		this._buttonCash.addEventListener('click', () => {
			this._buttonCash.classList.add('button_alt');
			this._buttonCard.classList.remove('button_alt');
			this._events.emit('order:payment', {
				payment: PaymentMethod.Cash,
			});
		});

		this._buttonCard.addEventListener('click', () => {
			this._buttonCard.classList.add('button_alt');
			this._buttonCash.classList.remove('button_alt');
			this._events.emit('order:payment', {
				payment: PaymentMethod.Card,
			});
		});

		this._address.addEventListener('input', () => {
			this._events.emit('order:inputAddress', {
				address: this._address.value,
			});
		});

		if (payment === PaymentMethod.Cash) {
			this._buttonCash.classList.add('button_alt');
			this._buttonCard.classList.remove('button_alt');
		} else {
			this._buttonCard.classList.add('button_alt');
			this._buttonCash.classList.remove('button_alt');
		}
	}

	setValid(isValid: boolean, errorMsg: string): void {
		if (isValid) {
			this._buttonOrder.disabled = false;
			this._errors.innerText = '';
		} else {
			this._buttonOrder.disabled = true;
			this._errors.innerText = errorMsg;
		}
	}

	render(): HTMLElement {
		return this._container;
	}
}
