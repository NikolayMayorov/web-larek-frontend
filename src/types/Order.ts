import { IOrder } from '../types';

export class Order implements IOrder {
	payment: string;
	address: string;
	phone: string;
	email: string;
	total: number;
	items: string[];

	constructor(
		payment: string,
		email: string,
		phone: string,
		address: string,
		total: number,
		items: string[]
	) {
		this.payment = payment;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.total = total;
		this.items = items;
	}

	setPayment(payment: string): void {
		this.payment = payment;
	}

	setAddress(address: string): void {
		this.address = address;
	}

	setPhone(phone: string): void {
		this.phone = phone;
	}

	setEmail(email: string): void {
		this.email = email;
	}

	setTotal(total: number): void {
		this.total = total;
	}

	setItems(items: string[]): void {
		this.items = items;
	}

	getOrderDetails(): object {
		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email,
			total: this.total,
			items: this.items,
		};
	}
}
