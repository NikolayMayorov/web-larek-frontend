import { IBasketModel, IProduct } from '../types';
import { EventEmitter } from './base/events';

export class BasketModel extends EventEmitter implements IBasketModel {
	protected _products: IProduct[];

	constructor() {
		super();
		this._products = [];
	}

	get products(): IProduct[] {
		return this._products;
	}

	set products(products: IProduct[]) {
		this._products = products;
		this.emit('basket:changed', this._products);
	}

	addProduct(product: IProduct): void {
		if (this._products.find((item) => item.id === product.id)) {
			return; // товар уже в корзине, не добавляем
		}
		this._products.push(product);
		this.emit('basket:changed', this._products);
	}

	removeProduct(data: { id: string }): void {
		this.products = this.products.filter((product) => product.id !== data.id);
		// Использует сеттер `products`, который вызывает событие `basket:changed`
	}

	getProductCount(): number {
		return this._products.length;
	}

	getTotalPrice(): number {
		return this._products.reduce(
			(total, product) => total + (product.price || 0),
			0
		);
	}

	clearBasket(): void {
		this._products = [];
		this.emit('basket:changed', this._products);
	}
}
