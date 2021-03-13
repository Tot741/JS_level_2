'use strict';
export default class CartItem {
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