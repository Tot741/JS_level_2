class List {
    _items = []

    constructor(CartInstance) {
        this.fetchGoods()
            .then(res => {
                return res.json()
            })
            .then(data => {
                const goods = data.data.map(item => {
                    return new GoodItem(item, CartInstance)
                })
                this._items = goods
                this.render()
            })
    }

    fetchGoods() {
        const url = 'http://https://geekshopserver.herokuapp.com/database/items.json' // 'http://127.0.0.1:3000/database/items.json'
        return fetch(url);
    }

    render() {
        this._items.forEach(Good => {
            Good.render()
        })
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
    _tempItems = []

    constructor() {
        this.render()
    }

    add(item) {
        if (this._items.length > 0) {
            this._items.forEach(Good => {
                if (Good._name === item.name) {
                    item = { name: item.name, price: item.price, quantity: (item.quantity + Good._quantity) }
                }
                else {
                    console.log(Good)
                    this._tempItems.push(Good)
                    console.log(this._tempItems)
                }

            })
            this._tempItems.push(new CartItem(item))
            this._items = this._tempItems
            this._tempItems = []
        }
        else {
            this._items.push(new CartItem(item))
        }
        console.log(this._items)
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
new List(CartInstance)
