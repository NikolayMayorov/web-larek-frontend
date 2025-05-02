import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class SuccessView {
	protected _container: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _events: EventEmitter;

	constructor(container: HTMLElement, events: EventEmitter) {
		this._container = container;
		this._button = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this._container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this._container
		);
		this._events = events;

		this._button.addEventListener('click', () => {
			this._events.emit('success:close');
		});
	}

	set total(total: number) {
		this._total.textContent = 'Списано ' + total.toString() + ' синапсов';
	}

	render(): HTMLElement {
		return this._container;
	}
}
