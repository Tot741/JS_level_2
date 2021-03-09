'use strict';
import Button from './button'
import GoodItem from './gooditem'
import Cart from './cart'
import FeedBackForm from './feedbackform'
import './style.css'


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

const CartInstance = new Cart()
List.instanceCount = 0
new List(CartInstance)
const feedBack = new FeedBackForm('feedBack')
