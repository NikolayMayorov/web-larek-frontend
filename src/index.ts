import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct, PaymentMethod } from './types/index';
import {
	ProductBasketView,
	ProductCatalogView,
	ProductPreviewView,
} from './components/Product';
import { WebLarekAPI } from './components/WebLarekAPI';
import { CatalogModel } from './components/CatalogModel';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { BasketModel } from './components/BasketModel';
import { BasketView } from './components/BasketView';
import { OrderView } from './components/OrderView';
import { OrderModel } from './components/OrderModel';
import { ContactsView } from './components/ContactsView';
import { SuccessView } from './components/SuccessView';

//const mockItems = mockProductList.items as IProduct[];
// mockItems.forEach((item) => {
// 	const card = new Product(cardCatalogTemplate);
// 	const cardElement = card.render(item);
// 	gallery.append(cardElement);
// });

// Все шаблоны
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;

const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;

const events = new EventEmitter();
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const api = new WebLarekAPI(CDN_URL, API_URL);

//модели данных
const catalogModel = new CatalogModel();
const basketModel = new BasketModel();
const orderModel = new OrderModel();

//представления
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderView = new OrderView(
	cloneTemplate(orderTemplate),
	events,
	orderModel.paymentMethod
);
const contactsView = new ContactsView(cloneTemplate(contactsTemplate), events);
const successView = new SuccessView(cloneTemplate(successTemplate), events);

// подписываемся на событие об изменении каталога, например получение данных с сервера
catalogModel.on('catalog:changed', (data) => {
	page.catalog = (data as IProduct[]).map((item) => {
		const card = new ProductCatalogView(cardCatalogTemplate, item.id, events);
		card.buttonClickHandler = () => {
			events.emit('catalog:click', item);
		};
		const cardElement = card.render(item);

		return cardElement;
	});
});

//подписываемся на событие клика по карточке товара
events.on('catalog:click', (data) => {
	//	console.log('catalog:click', data as IProduct);
	const cardPreview = new ProductPreviewView(
		cardPreviewTemplate,
		(data as IProduct).id,
		events
	);
	cardPreview.buttonClickHandler = () => {
		basketModel.addProduct(data as IProduct);
		//!!!! закрыть окно
		modal.close();
	};
	const cardPreviewElement = cardPreview.render(data as IProduct);

	//открываем модальное окно с карточкой товара
	modal.render({ content: cardPreviewElement });
});

// блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// изменилось кол-во товаров в корзине
basketModel.on('basket:changed', (data) => {
	page.counter = (data as IProduct[]).length;
});

//удаление товара из корзины
events.on('basket:delete', (data) => {
	basketModel.removeProduct(data as { id: string });
	basketView.items = basketModel.products.map((item, index) => {
		const cardBasket = new ProductBasketView(
			cardBasketTemplate,
			item.id,
			++index,
			events
		);
		cardBasket.buttonClickHandler = () => {
			events.emit('basket:delete', { id: item.id });
		};
		const cardBasketElement = cardBasket.render(item);
		return cardBasketElement;
	});
	basketView.total = basketModel.getTotalPrice();
	if (basketModel.products.length === 0) basketView.buttonDisabled = true;
	else basketView.buttonDisabled = false;
});

//клик по кнопке корзины
events.on('basket:open', () => {
	basketView.items = basketModel.products.map((item, index) => {
		const cardBasket = new ProductBasketView(
			cardBasketTemplate,
			item.id,
			++index,
			events
		);
		cardBasket.buttonClickHandler = () => {
			events.emit('basket:delete', { id: item.id });
		};
		const cardBasketElement = cardBasket.render(item);
		return cardBasketElement;
	});
	basketView.total = basketModel.getTotalPrice();
	if (basketModel.products.length === 0) basketView.buttonDisabled = true;
	else basketView.buttonDisabled = false;
	const basketElement = basketView.render();
	modal.render({ content: basketElement });
});

//клик по кнопке "Оформить"
events.on('basket:order', () => {
	modal.close();
	modal.render({ content: orderView.render() });
});

events.on('success:close', () => {
	modal.close();
});

//клик по кнопке выбра способа оплаты
events.on('order:payment', (data) => {
	console.log('order:payment', 'index.ts');
	orderModel.paymentMethod = (data as { payment: PaymentMethod }).payment;
});

//клик по кнопке "Далее"
events.on('order:next', (data) => {
	modal.close();
	orderModel.address = (data as { address: string }).address;
	modal.render({ content: contactsView.render() });
});

//клик по кнопке "Оплатить"
events.on('contacts:pay', () => {
	const order = orderModel.createOrder(
		basketModel.getTotalPrice(),
		basketModel.products.map((item) => item.id)
	);
	api.orderProducts(order).then((data) => {
		if (data.error) {
			console.error('Ошибка при оформлении заказа:', data.error);
			return;
		}
		basketModel.clearBasket();
		successView.total = data.total;
		modal.render({ content: successView.render() });
	});
});

//изменение адреса
events.on('order:inputAddress', (data: { address: string }) => {
	if (orderModel.validateAddress(data.address)) {
		orderView.setValid(true, '');
	} else {
		orderView.setValid(false, 'Введите адрес доставки');
	}
});

//изменение контактов
events.on(
	'contacts:inputContacts',
	(data: { email: string; phone: string }) => {
		let msgError = '';
		if (!orderModel.validateEmail(data.email)) {
			msgError = 'Введите корректный email. ';
		}
		if (!orderModel.validatePhone(data.phone)) {
			msgError += 'Введите корректный телефон.';
		}
		if (msgError.length === 0) {
			contactsView.setValid(true, '');
			orderModel.email = data.email;
			orderModel.phone = data.phone;
		} else {
			contactsView.setValid(false, msgError);
		}
	}
);

// Получаем товары с сервера
api
	.getProductList()
	.then((data) => (catalogModel.products = data))
	.catch((err) => {
		console.error(err);
	});
