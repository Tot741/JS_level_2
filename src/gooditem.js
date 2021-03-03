'use strict';
import Button from './button'

export default class GoodItem {
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