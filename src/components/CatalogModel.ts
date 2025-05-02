import { ICatalogModel, IProduct } from '../types';
import { EventEmitter } from './base/events';

export class CatalogModel extends EventEmitter implements ICatalogModel {
	protected _products: IProduct[];

	constructor() {
		super();
		this._products = [];
	}

	get products(): IProduct[] {
		return this._products;
	}

	set products(data: IProduct[]) {
		this._products = data;

		//формируем событие об изменении каталога
		this.emit('catalog:changed', data);
	}

	getProduct(id: string): IProduct | undefined {
		return this._products.find((product) => product.id === id);
	}
}
