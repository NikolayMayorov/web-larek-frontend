import { IOrderModel, PaymentMethod, IOrder } from '../types';
import { Order } from '../types/Order';

export class OrderModel implements IOrderModel {
	private _paymentMethod: PaymentMethod;
	private _address: string;
	private _email: string;
	private _phone: string;

	constructor() {
		this._paymentMethod = PaymentMethod.Card; // Default payment method
		this._address = '';
		this._email = '';
		this._phone = '';
	}

	set paymentMethod(paymentMethod: PaymentMethod) {
		this._paymentMethod = paymentMethod;
	}

	get paymentMethod(): PaymentMethod {
		return this._paymentMethod;
	}

	set address(address: string) {
		this._address = address;
	}

	get address(): string {
		return this._address;
	}

	set email(email: string) {
		this._email = email;
	}

	get email(): string {
		return this._email;
	}

	set phone(phone: string) {
		this._phone = phone;
	}

	get phone(): string {
		return this._phone;
	}

	createOrder(total: number, items: string[]): IOrder {
		const order = new Order(
			this.paymentMethod,
			this.email,
			this.phone,
			this.address,
			total,
			items
		);
		return order;
	}

	validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	validatePhone(phone: string): boolean {
		const digitsOnly = phone.replace(/\D/g, '');
		return digitsOnly.length >= 10 && digitsOnly.length <= 15;
	}

	validateAddress(address: string): boolean {
		return address.trim().length >= 10;
	}
}
