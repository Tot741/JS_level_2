class List {
    _items = []
    _fetchCount = 1
    _urlDataBase = ['https://geekshopserver.herokuapp.com/database/items.json', 'https://geekshopserver.herokuapp.com/database/items2.json', 'https://geekshopserver.herokuapp.com/database/items3.json']

    // ['http://127.0.0.1:3000/database/items.json', 'http://127.0.0.1:3000/database/items2.json', 'http://127.0.0.1:3000/database/items3.json']
    // or for deploy on Heroku
    //['https://geekshopserver.herokuapp.com/database/items.json', 'http://https://geekshopserver.herokuapp.com/database/items2.json', 'http://https://geekshopserver.herokuapp.com/database/items3.json']

    constructor(CartInstance) {
        this.fetchGoods()
            .then(res => {
                return res.json()
            })
            .then(data => {
                const goods = data.data.map(item => {
                    return new GoodItem(item, CartInstance)
                })
                this._items = this._items.concat(goods)
                this.render()
            })
    }

    fetchGoods() {

        let url = this._urlDataBase[List.instanceCount++]
        return fetch(url);
    }

    rerender() {
        this.fetchGoods.bind(this);
        new List(CartInstance);
    }

    render() {
        this._items.forEach(Good => {
            Good.render()
        })
        if (List.instanceCount < 3) {
            const nextBtn = new Button('Показать еще', this.rerender.bind(this))
            const placeToRender = document.querySelector('.next_btn')
            placeToRender.innerHTML = ''
            nextBtn.render(placeToRender)
        } else {
            const placeToRender = document.querySelector('.next_btn')
            placeToRender.innerHTML = ''
        }

    }
}

class GoodItem {
    _name = ''
    _price = 0
    _img = ''
    _CartInstance = null

    constructor({ name, price, img }, CartInstance) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstance = CartInstance

    }

    addToCart() {
        this._CartInstance.add({ name: this._name, price: this._price, quantity: 1 })
    }

    render() {
        const placeToRender = document.querySelector('.catalog')
        if (placeToRender) {
            const block = document.createElement('div')
            block.classList.add('card')
            block.innerHTML = `<h3>${this._name}</h3>
         <img class="card_img" src="${this._img}" />
         Цена за кг - ${this._price} руб`
            const btn = new Button('Добавить', this.addToCart.bind(this))
            btn.render(block)
            placeToRender.appendChild(block)
        }
    }

}

class Cart {
    _items = []

    constructor() {
        this.render()
    }

    add(item) {
        const existedItem = this._items.find(good => good._name === item.name)
        if (existedItem) {
            existedItem._quantity += item.quantity
        } else {
            this._items.push(new CartItem(item))
        }
        this.render()
    }


    render() {
        const block = document.querySelector('.table')
        if (block) {
            block.innerHTML = "<tr><th>Наименование</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr>"
        }
        this._items.forEach(Good => {
            Good.render()
        })
    }
}

class CartItem {
    _name = ''
    _price = 0
    _quantity = 1

    constructor({ name, price, quantity }) {
        this._name = name
        this._price = price
        this._quantity = quantity
    }

    render() {
        const placeToRender = document.querySelector('.table')
        const block = document.createElement('tr')
        block.classList.add('row')
        block.innerHTML = `<tr><td>${this._name}</td><td>${this._quantity}</td><td>${this._price}</td><td>${this._price * this._quantity}</td></tr>`
        placeToRender.appendChild(block)
    }


}
const CartInstance = new Cart()
List.instanceCount = 0
new List(CartInstance)
