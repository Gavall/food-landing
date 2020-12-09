import tabs from './modules/tabs';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import cardProducts from './modules/cardProducts';
import timer from './modules/timer';
import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const setTimeOutModal = setTimeout(() => showModal('[data-modalform]', setTimeOutModal), 55000); // Вывод модального окна через ... секунды 

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-triggermodal]', '[data-modalform]', setTimeOutModal);
    forms('form', setTimeOutModal);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
    cardProducts();
    timer('.timer', '2021-01-01');
}); 