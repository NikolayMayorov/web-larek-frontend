import { IProduct, IViewProduct } from '../types';
import { categoryClassMap, CategoryKey } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from './base/events';

export abstract class BaseProductView {
	protected _productElement: HTMLElement;
	protected _titleElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _id: string;
	protected _events: EventEmitter;

	abstract render(item: IProduct): HTMLElement;
	get id(): string {
		return this._id || '';
	}
	constructor(template: HTMLTemplateElement, id: string, events: EventEmitter) {
		this._id = id;
		this._productElement = template.content.cloneNode(true) as HTMLElement;
		this._titleElement = this._productElement.querySelector('.card__title');
		this._priceElement = this._productElement.querySelector('.card__price');
		this._events = events;
	}
}

export class ProductCatalogView extends BaseProductView {
	protected _imageElement: HTMLElement;
	protected _categoryElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
	protected _buttonClickHandler: () => void;

	constructor(template: HTMLTemplateElement, id: string, events: EventEmitter) {
		super(template, id, events);
		this._categoryElement =
			this._productElement.querySelector('.card__category');
		this._imageElement = this._productElement.querySelector('.card__image');

		this._buttonElement = ensureElement<HTMLButtonElement>(
			'button',
			this._productElement
		);

		this._buttonElement.addEventListener('click', () => {
			if (
				this._buttonClickHandler &&
				typeof this._buttonClickHandler === 'function'
			) {
				this._buttonClickHandler();
			}
		});
	}

	set buttonClickHandler(handler: () => void) {
		this._buttonClickHandler = handler;
	}

	render(item: IProduct): HTMLElement {
		this._categoryElement.textContent = item.category;
		this._titleElement.textContent = item.title;
		this._imageElement.setAttribute('src', item.image);
		this._imageElement.setAttribute('alt', item.title);
		this._priceElement.textContent = item.price
			? `${item.price} синапсов`
			: 'Бесценно';

		this._categoryElement.classList.add(
			categoryClassMap[item.category as CategoryKey] || 'card__category_other'
		);

		return this._productElement;
	}
}

export class ProductPreviewView extends ProductCatalogView {
	protected _descriptionElement: HTMLElement;

	constructor(template: HTMLTemplateElement, id: string, events: EventEmitter) {
		super(template, id, events);
		this._descriptionElement =
			this._productElement.querySelector('.card__text');

		if (this._buttonElement) {
			this._buttonElement.addEventListener('click', () =>
				this._events.emit('productAction', { id: this._id })
			);
		}
	}

	render(item: IProduct): HTMLElement {
		this._categoryElement.textContent = item.category;
		this._titleElement.textContent = item.title;
		this._imageElement.setAttribute('src', item.image);
		this._imageElement.setAttribute('alt', item.title);
		this._priceElement.textContent = item.price
			? `${item.price} синапсов`
			: 'Бесценно';

		this._categoryElement.classList.add(
			categoryClassMap[item.category as CategoryKey] || 'card__category_other'
		);
		this._descriptionElement.textContent = item.description;
		return this._productElement;
	}
}

export class ProductBasketView extends BaseProductView {
	//	protected _deleteElement: HTMLButtonElement;
	protected _indexElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
	protected _buttonClickHandler: () => void;

	constructor(
		template: HTMLTemplateElement,
		id: string,
		index: number,
		events: EventEmitter
	) {
		super(template, id, events);
		// this._deleteElement = this._productElement.querySelector(
		// 	'.card__button'
		// ) as HTMLButtonElement;
		this._indexElement = this._productElement.querySelector(
			'.basket__item-index'
		) as HTMLElement;
		this._indexElement.textContent = index.toString();

		// this._deleteElement.addEventListener('click', () => {
		// 	this._events.emit('basket:delete', { id: this._id });
		// });

		this._buttonElement = ensureElement<HTMLButtonElement>(
			'button',
			this._productElement
		);

		this._buttonElement.addEventListener('click', () => {
			if (
				this._buttonClickHandler &&
				typeof this._buttonClickHandler === 'function'
			) {
				this._buttonClickHandler();
			}
		});
	}

	set buttonClickHandler(handler: () => void) {
		this._buttonClickHandler = handler;
	}

	render(item: IProduct): HTMLElement {
		this._titleElement.textContent = item.title;
		this._priceElement.textContent = item.price
			? `${item.price} синапсов`
			: 'Бесценно';
		return this._productElement;
	}
}
