
'use strict';

export default class FeedBackForm {
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