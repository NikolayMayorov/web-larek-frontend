export class Catalog {
	protected _products: HTMLElement[];
	protected _catalogElement: HTMLElement;

	constructor(catalogElement: HTMLElement) {
		this._catalogElement = catalogElement;
		this._products = [];
	}

	setProducts(products: HTMLElement[]) {
		this._products = products;
	}

	render() {
		this._products.forEach((item) => {
			this._catalogElement.append(item);
		});
		return this._catalogElement;
	}
}
