import { IEvents } from '../components/base/events';

export enum PaymentMethod {
	Cash = 'Cash',
	Card = 'Card',
}

export interface IOrder {
	payment: string;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];

	setPayment(payment: string): void;
	setAddress(address: string): void;
	setPhone(phone: string): void;
	setEmail(email: string): void;
	setTotal(total: number): void;
	setItems(items: string[]): void;
	getOrderDetails(): object;
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICatalogModel extends IEvents {
	products: IProduct[];

	getProduct(id: string): IProduct | undefined;
	// addProduct(product: IProduct): void;
	// removeProduct(id: string): void;
}

export interface IBasketModel {
	products: IProduct[];

	addProduct(product: IProduct): void;
	removeProduct(data: { id: string }): void;
	getProductCount(): number;
	getTotalPrice(): number;
	clearBasket(): void;
}

export interface IOrderModel {
	paymentMethod: PaymentMethod;
	address: string;
	phone: string;
	email: string;

	createOrder(total: number, items: string[]): IOrder;
	validateEmail(email: string): boolean;
	validatePhone(phone: string): boolean;
	validateAddress(address: string): boolean;
}

export interface IOrderResult {
	id: string;
	error?: string;
	total?: number;
}

export interface IViewProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;

	render(item: IProduct): HTMLElement;
	//задает обработчик кнопки Купить/Убрать из корзины
	setActionHandler(handleActionProduct: (productId: string) => void): void;
}

//!!!!!!!!!!!!!
export interface IPopup {
	content: HTMLElement;
	open(): void;
	close(): void;
}

export interface IForm {
	buttonText: string;
	placeholder: string;
	setHandler(handleFormSubmit: Function): void;
	render(): HTMLFormElement;
	setValue(data: string): void;
	getValue(): string;
	clearValue(): void;
}
