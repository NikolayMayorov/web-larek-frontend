# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

Проект имеет MVP архитектуру. Связь слоев с использованием событийно-ориентированного подхода.

## Ключевые типы данных

### События

basket:delete - удаление еденицы товара из корзины
basket:open - открытиые корзины
basket:order - нажатие кнопки Оформить заказ
basket:changed - изменение состава корзины
modal:close - закрытие модального окна
modal:open - открытие модального окна
catalog:click - клик по товару в каталоге
catalog:changed - изменение каталога, например получение данных с сервера
order:payment - выбор способа оплаты заказа
order:next - переход к шагу ввода контактных данных
contacts:pay - нажатие кнопки Оплатить
contacts:pay - нажатие кнопки Оплатить
order:inputAddress - изменение адреса
contacts:inputContacts - изменение контактов

### Интерфейс IProduct.

Определяет свойства товара.

#### Поля интерфейса:

- `id: string` - уникальный идентификатор товара
- `description: string` - подробное текстовое описание товара
- `image: string` - путь или URL к изображению товара
- `title: string` - название товара
- `category: string` - категория, к которой относится товар
- `price: number | null` - цена товара

### Перечисление PaymentMethod.

Определяет доступные способы оплаты:

- `Card` - оплата картой
- `Cash` - оплата наличными

### Класс Order.

Определяет объект заказа для отправки.
Конструктор принимает все поля класса в качестве аргументов и инициализирует их.

### Класс EventEmitter

#### Поля класса:

- `protected payment: string` - способ оплаты
- `protected email: string` - адрес электронной почты
- `protected phone: string` - номер телефона
- `protected address: string` - адрес доставки
- `protected total: number` - общая стоимость всех товаров в заказе
- `protected items: string[]` - массив идентификаторов товара

## Представления (Слой представлений)

### 1. Класс BaseProductView

Это абстрактный базовый класс, который определяет общую структуру и функциональность для всех представлений товаров.

#### Конструктор класса:

- `constructor(template: HTMLTemplateElement, id: string, events: EventEmitter)`

#### Поля класса:

- `_productElement: HTMLElement` - контейнер корневого элемента
- `_titleElement: HTMLElement` - название товара
- `_priceElement: HTMLElement` - цена товара
- `_id: string` - id товара
- `_events: EventEmitter` - брокер событий

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления

### 2. Класс ProductCatalogView

Служит для отображения товара в общем каталоге.

#### Конструктор класса:

- `constructor(template: HTMLTemplateElement, id: string, events: EventEmitter)`

#### Поля класса:

- `_imageElement: HTMLElement` - изображение товара
- `_categoryElement: HTMLElement` - категория товара

### 3. Класс ProductPreviewView

Служит для отображения товара в превью.

#### Конструктор класса:

- `constructor(template: HTMLTemplateElement, id: string, events: EventEmitter) `

#### Поля класса:

- `_descriptionElement: HTMLElement` - описание товара
- `_buttonElement` - элемент разметки кнопки В корзину
- `_buttonClickHandler: () => void` - обработчик нажатия кнопки В корзину

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления
- `buttonClickHandler(handler: () => void)` - задает обработчик кнопки В корзину

### 4. Класс ProductBasketView

Служит для отображения товара в корзине.

#### Конструктор класса:

- `constructor(template: HTMLTemplateElement, id: string, index: number, events: EventEmitter)`

#### Поля класса:

- `_deleteElement: HTMLButtonElement` - кнопка удаления из корзины
- `_indexElement: HTMLButtonElement` - порядковый номер в корзине

### 5. Класс BasketView

Служит для отображения корзины.

#### Конструктор класса:

- `constructor(container: HTMLElement, events: EventEmitter)`

#### Поля класса:

- `_productElement: HTMLElement` - контейнер корневого элемента
- `_events: EventEmitter` - брокер событий
- `_list: HTMLElement` - контейнер для списка товаров
- `_total: HTMLElement` - стоимость всего
- `_button: HTMLButtonElement` - кнопка Оформить

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления
- `set total(total: number)` - задает значение для стоимости всего
- `set items(items: HTMLElement[])` - задает список товаров
- `set buttonDisabled(disabled: boolean)` - определяет доступность кнопки

### 6. Класс OrderView

Служит для отображения окна заказа - выбор способа оплаты и ввод адреса доставки.

#### Конструктор класса:

- `constructor(container: HTMLElement, events: EventEmitter)`

#### Поля класса:

- `_productElement: HTMLElement` - контейнер корневого элемента
- `_events: EventEmitter` - брокер событий
- `_address: HTMLInputElement` - адрес
- `_buttonOrder: HTMLButtonElement` - кнопка Далее
- `_buttonCard: HTMLButtonElement` - кнопка выбора способа оплаты Онлайн
- `_buttonCash: HTMLButtonElement` - кнопка выбора способа оплаты При получении

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления

### 7. Класс ContactsView

Служит для отображения окна ввода контактов - ввод адреса электронной почты и номера телефона.

#### Конструктор класса:

- `constructor(container: HTMLElement, events: EventEmitter)`

#### Поля класса:

- `_productElement: HTMLElement` - контейнер корневого элемента
- `_events: EventEmitter` - брокер событий
- `_email: HTMLInputElement` - email
- `_phone: HTMLInputElement` - телефон
- `_buttonPay: HTMLButtonElement` - кнопка Оплатить

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления

### 8. SuccessView

Служит для отображения ока с информацией об успешной отправки заказа.

#### Конструктор класса:

- `constructor(container: HTMLElement, events: EventEmitter)`

#### Поля класса:

- `_productElement: HTMLElement` - контейнер корневого элемента
- `_events: EventEmitter` - брокер событий
- `_total: HTMLElement` - поле всего потрачено
- `_button: HTMLButtonElement` - кнопка За новыми покупками!

#### Методы класса:

- `render(item: IProduct): HTMLElement` - возвращает разметку представления

## Модели данных (Слой данных)

### 1. Класс CatalogModel

Определяет список всех товаров.
Доступ к товарам оуществляется через геттеры и сеттеры.

#### Поля класса:

- `protected _products: IProduct[]` - массив товаров

#### Методы класса:

- `getProduct(id: string): IProduct | undefined` - возвращает товар по id

### 2. Класс BasketModel

Определяет состояние и методы корзины.

#### Поля класса:

- `protected _products: IProduct[]` - массив товаров в корзине

#### Методы класса:

- `addProduct(product: IProduct): void` - добавляет товар в корзину
- `removeProduct(product: IProduct): void` - удаляет товар из корзины
- `getProductCount(): number` - возвращает общее количество товаров в корзине
- `getTotalPrice(): number` - возвращает общую стоимость всех товаров в корзине
- `clearBasket(): void` - очищает массив товаров в корзине

### 3. Класс OrderModel

Определяет параметры для оформления заказа.

#### Поля класса:

- `protected _paymentMethod: PaymentMethod` - способ оплаты
- `protected _address: string` - адрес доставки
- `protected _email: string` - email
- `protected _phone: string` - телефон

#### Методы класса:

- `createOrder(total: number, items: string[]): IOrder` - создает экземпляр заказа
- `validateEmail(email: string): boolean` - валидация поля email
- `validatePhone(phone: string): boolean` - валидация поля phone
- `validateAddress(address: string): boolean` - валидация поля address
