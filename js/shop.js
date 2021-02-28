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
                this._items = this._items.concat(goods)
                this.render()
            })
    }

    fetchGoods() {
        let url = `${document.location.protocol}//${document.location.host}/database/items${List.instanceCount++}.json`
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
        if (placeToRender) {
            const block = document.createElement('tr')
            block.classList.add('row')
            block.innerHTML = `<tr><td>${this._name}</td><td>${this._quantity}</td><td>${this._price}</td><td>${this._price * this._quantity}</td></tr>`
            placeToRender.appendChild(block)
        }

    }


}
class FeedBackForm {
    _ininstanceName = ''

    constructor(instanceName) {
        this._ininstanceName = instanceName
        this.render()
    }

    validator(data, type) {
        switch (type) {
            case 'name':
                const reName = /^(\p{Alpha})+$/gu
                if (reName.test(data)) {
                    console.log('Name is valid!');
                } else {
                    alert('Имя должно содержать только буквы!')
                    console.log('Name is not valid!');
                }
                break;
            case 'phone':
                const rePhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/g
                if (rePhone.test(data)) {
                    console.log('Phone is valid!');
                } else {
                    alert('Телефон должен быть в формате +7(000)000-0000')
                    console.log('Phone is not valid!');
                }
                break;
            case 'email':
                const reEmail = /^([a-z0-9\.-]+)@([a-z0-9\.-]+)\.([a-z\.]{2,6})$/g
                if (reEmail.test(data)) {
                    console.log('Email is valid!');
                } else {
                    alert('Электронная почта должна быть в формате username@domain.com')
                    console.log('Email is not valid!');
                }
                break;
        }
    }
    render() {
        const placeToRender = document.querySelector('.feedback')
        if (placeToRender) {
            const block = document.createElement('form')
            block.setAttribute('action', '#')
            block.innerHTML = `Введите имя: <input type=\"text\" onchange=\"${this._ininstanceName}.validator(this.value, \'name\')\"><br>Введите номер телефона: <input type=\"text\" onchange=\"${this._ininstanceName}.validator(this.value, \'phone\')\"><br>Введите email: <input type=\"text\" onchange=\"${this._ininstanceName}.validator(this.value, \'email\')\")>`
            placeToRender.appendChild(block)
        }
    }
}

const CartInstance = new Cart()
List.instanceCount = 0
new List(CartInstance)
const feedBack = new FeedBackForm('feedBack')
