import { IProduct } from '../types';
import { createElement, ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export class BasketView {
	protected _container: HTMLElement;
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _events: EventEmitter;

	constructor(container: HTMLElement, events: EventEmitter) {
		this._container = container;
		this._list = ensureElement<HTMLElement>('.basket__list', this._container);
		this._total = ensureElement<HTMLElement>('.basket__price', this._container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this._container
		);
		this._events = events;
		this._button.addEventListener('click', () => {
			this._events.emit('basket:order');
		});
	}

	set total(total: number) {
		this._total.textContent = total.toString() + ' синапсов';
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set buttonDisabled(disabled: boolean) {
		this._button.disabled = disabled;
	}

	render(): HTMLElement {
		return this._container;
	}
}
