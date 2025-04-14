import { IProduct } from '../types';

export class Product {
	protected itemElement: HTMLElement;
	protected category: HTMLElement;
	protected title: HTMLElement;
	protected image: HTMLElement;
	protected price: HTMLElement;

	//возможно нужно добавить обработичк купить/убрать из корзины
	constructor(template: HTMLTemplateElement) {
		this.itemElement = template.content.cloneNode(true) as HTMLElement;
		this.category = this.itemElement.querySelector('.card__category');
		//TODO: добавить css класс для вида категории
		this.title = this.itemElement.querySelector('.card__title');
		this.image = this.itemElement.querySelector('.card__image');
		this.price = this.itemElement.querySelector('.card__price');
	}

	render(item: IProduct): HTMLElement {
		this.category.textContent = item.category;
		this.title.textContent = item.title;
		this.image.setAttribute('src', item.image);
		this.image.setAttribute('alt', item.title);
		this.price.textContent = item.price ? `${item.price} синапсов` : 'Бесценно';
		return this.itemElement;
	}
}
