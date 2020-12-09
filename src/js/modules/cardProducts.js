import {getResource} from '../services/services';

function cardProducts() {
    //----------------------------------------
    // Создание класса для карточки товара
    //----------------------------------------

    class CardProduct { //Конструктор карточки товара
        constructor(linkImg, alt, title, description, price, parentSelector, ...classes) {
            this.linkImg = linkImg;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 76;
            this.changeToUSD();
        }

        changeToUSD() { // перевод валюты: рубли в доллары
            this.price = this.price * this.transfer;
        }

        render() { // Создание карточки товара
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.linkImg} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new CardProduct(img, altimg, title, descr, price, '.menu__field .container').render(); 
        });
    });
}  

export default cardProducts;