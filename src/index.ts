import './scss/styles.scss';
import { mockProductList } from './utils/constants';
import { IProduct } from './types/index';
import { Product } from './components/Product';

const mockItems = mockProductList.items as IProduct[];
const gallery = document.querySelector('.gallery') as HTMLElement;
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;

mockItems.forEach((item) => {
	const card = new Product(cardCatalogTemplate);
	const cardElement = card.render(item);
	gallery.append(cardElement);
});
