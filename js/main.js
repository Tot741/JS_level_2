/*
1. Реализовать страницу корзины:
a. Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».
2. На странице корзины:
a. Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
b. Сделать эти поля сворачиваемыми;
c. Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.

*/

let catalog = [];
let basket = [];


Array.prototype.count = function () {
    var result = 0;
    for (var i = 0; i < this.length; i++)
        if (this[i] != undefined)
            result++;
    return result;
};


function Goods(name, unit, cost, img) {
    this.name = name;
    this.unit = unit;
    this.cost = cost;
    this.img = img;
    return { 'name': this.name, 'unit': this.unit, 'cost': this.cost, 'quant': 0, 'total': 0, 'imageName': this.img };
};


function createCatalog() {
    let catalogDiv = document.getElementById('catalog');
    for (let i = 0; i < catalog.count(); i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList = "card";
        cardDiv.innerHTML = "<img class=\"card_img\" src=\"img/" + catalog[i].imageName + ".jpg\" alt=\"card\"></img><img class=\"modal\" src=\"img/" + catalog[i].imageName + "_big.jpg\" alt=\"big_card\"></img><center>Введите количество: <input style=\"padding: 10px 0;\" class=\"input\" type=\"text\" value=\"\" id=\"quantity\"></center><button class=\"buy_button\" id=\"" + catalog[i].imageName + "\">Купить</button>";
        catalogDiv.appendChild(cardDiv);
    };
};


function changeBigPicture() {
    let imgDiv = document.getElementsByClassName("card_img");
    let modalDiv = document.getElementsByClassName("modal");
    for (let i = 0; i < catalog.count(); i++) {
        imgDiv[i].addEventListener('mouseover', () => {
            modalDiv[i].style.display = "block";
        });
        imgDiv[i].addEventListener('mouseout', () => {
            modalDiv[i].style.display = "none";
        });
    };
};


function totalBasket(basket) {
    let sum = 0;
    for (let i = 0; i < basket.count(); i++) {
        sum += basket[i].total;
    };
    return sum;
};


function backBasket() {
    let basketPage = document.getElementById("basket_page");
    document.querySelector("#deliveryInput").remove();
    document.querySelector("H2").remove();
    let basketHeader = document.createElement("H2")
    basketHeader.innerHTML = "Ваша корзина";
    basketPage.appendChild(basketHeader);
    renderBasket();
}

function backDelivery() {
    let deliveryPage = document.getElementById("basket_page");
    document.querySelector("#commentInput").remove();
    document.querySelector("H2").remove();
    let deliveryHeader = document.createElement("H2")
    deliveryHeader.innerHTML = "Адрес доставки";
    deliveryPage.appendChild(deliveryHeader);
    renderBasket();
    renderDeliveryPage();
}

function nextComment() {
    let commentPage = document.getElementById("basket_page");
    document.querySelector("#deliveryInput").remove();
    document.querySelector("H2").remove();
    let commentHeader = document.createElement("H2")
    commentHeader.innerHTML = "Комментарий";
    commentPage.appendChild(commentHeader);
    let commentInput = document.createElement("div");
    commentInput.id = "commentInput";
    commentInput.innerHTML = "Оставьте свой комментарий: <input type=\"textarea\"><br><hr><button id=\"backDelivery\" onclick=\"backDelivery()\">Назад</button>";
    commentPage.appendChild(commentInput);
}


function renderDeliveryPage() {
    let deliveryPage = document.getElementById("basket_page");
    document.querySelector("#basket_table").remove();
    document.querySelector("H2").remove();
    let deliveryHeader = document.createElement("H2")
    deliveryHeader.innerHTML = "Адрес доставки";
    deliveryPage.appendChild(deliveryHeader);
    let deliveryInput = document.createElement("div")
    deliveryInput.id = "deliveryInput";
    deliveryInput.innerHTML = "Ведите ФИО: <input type=\"text\"><br> Введите адрес доставки: <input type=\"text\"><br> Выберите дату доставки: <input type=\"date\"><br><hr><button id=\"back_button\" onclick=\"backBasket()\">Назад</button>  <button id=\"next_button\" onclick=\"nextComment()\">Далее</button>";
    deliveryPage.appendChild(deliveryInput);

};


function renderBasket() {
    if (basket_page.lastElementChild.id == "basket_table")
        basket_page.removeChild(basket_page.lastElementChild);
    let basketTable = document.createElement("table");
    basketTable.id = "basket_table";
    if (basket.length == 0) {
        basketTable.innerHTML = "<tr><th>В корзине пусто</th></tr>";
        basket_page.appendChild(basketTable);
    }
    else {
        let tableContent = "<tr><th>Наименование</th><th>Кол-во</th><th>Ед.изм.</th><th>Цена</th><th>Сумма</th><th></th></tr>";
        for (let i = 0; i < basket.count(); i++) {
            tableContent = tableContent + "<tr><td>" + basket[i].name + "</td><td>" + basket[i].quant + "</td><td>" + basket[i].unit + "</td><td>" + basket[i].cost + "</td><td>" + basket[i].total + "</td><td><button class=\"del_button\">X</button></td></tr>"
        }
        tableContent = tableContent + "<tr><td colspan=\"4\" style=\"text-align:right\">В корзине " + basket.count() + " товара(ов) на сумму: </td><td style=\"text-align:left\">" + totalBasket(basket) + "</td></tr><tr><td td colspan=\"6\" style=\"text-align:right\"><Button id=\"next_basket\" onclick=\"renderDeliveryPage()\">Далее</button></td><tr>"
        basketTable.innerHTML = tableContent;
        basket_page.appendChild(basketTable);
    };
    delBasketItem();
};


function delBasketItem() {
    let delButtons = document.getElementsByClassName("del_button");
    for (let i = 0; i < basket.count(); i++) {
        delButtons[i].addEventListener("click", () => {
            basket.splice(i, 1);
            renderBasket();
        });
    };

};


function addBasket() {
    let buttons = document.getElementsByClassName("buy_button");
    let inputDiv = document.getElementsByClassName("input");
    for (let i = 0; i < catalog.count(); i++) {
        buttons[i].addEventListener("click", () => {
            if (catalog[i].imageName == buttons[i].id) {
                let quantity = inputDiv[i].value;
                if (!quantity) {
                    alert("Вы не ввели количество")

                }
                else {
                    let totalCost = quantity * catalog[i].cost;
                    catalog[i].total = totalCost;
                    catalog[i].quant = quantity;
                    basket.push(catalog[i]);
                };

                renderBasket();
            };
        });
    };
};



catalog.push(new Goods('Огурец', 'кг', 90, 'cocumb'));
catalog.push(new Goods('Помидор', 'кг', 100, 'tomato'));
catalog.push(new Goods('Редис', 'кг', 100, 'redis'));

createCatalog();
changeBigPicture();
addBasket();
renderBasket();
