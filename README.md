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

Проект имеет MVP архитектуру

## Ключевые типы данных

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

#### Поля класса:

- `protected payment: string` - способ оплаты
- `protected email: string` - адрес электронной почты
- `protected phone: string` - номер телефона
- `protected address: string` - адрес доставки
- `protected total: number` - общая стоимость всех товаров в заказе
- `protected items: string[]` - массив идентификаторов товара

#### Методы класса:

- `setPayment(payment: string): void` - задает способ оплаты
- `setEmail(email: string): void` - задает адрес электронной почты
- `setPhone(phone: string): void` - задает номер телефона
- `setAddress(address: string): void` - задает адрес доставки
- `setTotal(total: number): void` - задает общую стоимость заказа
- `setItems(items: string[]): void` - задает массив идентификаторов товаров
- `getOrderDetails(): object` - возвращает объект с деталями заказа

## Модели данных (Слой данных)

### 1. Класс CatalogModel

Определяет список всех товаров.
Конструктор не принимает аргументы.

#### Поля класса:

- `protected products: IProduct[]` - массив товаров

#### Методы класса:

- `getProduct(id: string): IProduct | undefined` - возвращает товар по id
- `getProducts(): IProduct[]` - возвращает массив всех товаров
- `setProducts(products: IProduct[])` - задает массив товаров

### 2. Класс BasketModel

Определяет состояние и методы корзины.
Конструктор не принимает аргументы.

#### Поля класса:

- `protected products: IProduct[]` - массив товаров в корзине

#### Методы класса:

- `addProduct(product: IProduct): void` - добавляет товар в корзину
- `removeProduct(product: IProduct): void` - удаляет товар из корзины
- `getProducts(): IProduct[]` - возвращает массив товаров в корзине
- `getProductCount(): number` - возвращает общее количество товаров в корзине
- `getTotalPrice(): number` - возвращает общую стоимость всех товаров в корзине
- `clearBasket(): void` - очищает массив товаров в корзине

### 3. Класс OrderDetailModel

Определяет параметры для оформления заказа.

#### Поля класса:

- `protected paymentMethod: PaymentMethod` - способ оплаты
- `protected address: string` - адрес доставки.
- `protected email: string` - адрес электронной почты
- `protected phone: string` - номер телефона

#### Методы класса:

- `getPaymentMethod(): PaymentMethod` - возвращает способ оплаты
- `setPaymentMethod(method: PaymentMethod): void` - задает способ оплаты
- `getAddress(): string` - возвращает адрес доставки
- `setAddress(address: string): void` - задает адрес доставки
- `getEmail(): string` - возвращает адрес электронной почты
- `setEmail(email: string): void` - задает адрес электронной почты
- `getPhone(): string` - возвращает номер телефона
- `setPhone(phone: string): void` - задает номер телефона
- `validateEmail(email: string): boolean` - проверяет корректность адреса электронной почты.
- `validatePhone(phone: string): boolean` - проверяет корректность номера телефона.
- `validateAddress(address: string): boolean` - проверяет корректность адреса доставки, например длина не меньше определенного значения.

## Представления (Слой представлений)

1. Класс CatalogView
   Служит для отображения всех товаров. Выводит в контейнер карточки всех товаров.
2. Класс ProductCardView
   Служит для отображения карточки товара. Выводит в контейнер выбранный товар.
   - Класс имеет такие методы:
     addToBasket, delFromBasket - добавление и удаления товара из корзины
3. Класс BasketView
   Служит для отображения списка товаров в корзине.
   - Класс имеет такие методы:
     placeOrder - открывает форму оформления заказа
4. Класс OrderDetailView
   Служит для отображения и ввода параметров для оформления заказа.
   - Класс имеет такие методы:
     buy - оплачивание заказа (отправка заказа)

## Presenter (Слой связывания представлений и моделей)

1. Класс Presenter
   - Класс имеет такие методы:
     addProduct, removeProduct - добавление, удаление и получение товаров
     getProductCount, getTotalPrice - получения кол-ва товаров и общей стоимости товаров
   - Класс имеет такие поля:
     catalog, basket, orderDetail - модели данных каталога, корзины и параметров заказа
     catalogView, productView, basketView, orderDetailView - представления
