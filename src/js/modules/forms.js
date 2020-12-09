import {showModal, closeModal} from './modal'; 
import {postData} from '../services/services';

function forms(formSelector, setTimeOutModal) {
    //----------------------------------------
    // Отправка форм
    //----------------------------------------

    const forms = document.querySelectorAll(formSelector); // Находим все формы

    forms.forEach(item => { // Перебираем найденные формы и навешиваем функцию - postData
        bindPostData(item);
    });

    const message = { // Объект с сообщением о статусе отправки формы
        loaded: 'img/054 spinner.svg',
        success: 'Форма отправленна успешно! В ближайшее время с вами свяжутся наши специалисты',
        error: 'Ошибка отправки! Что-то пошло не так'
    }

    function bindPostData(form) { // функция отправки формы
        form.addEventListener('submit', (e) => { // Обработчик события нужатия кнопки отправить
            e.preventDefault();  // Отмена стандартного поведения отправки форм

            const statusMessage = document.createElement('img'); // Контейнер для текста сообщения о статусе отправки

            statusMessage.src = message.loaded;
            statusMessage.style.cssText = `
                display: block;
                margin: 10px auto;
            `; // Добавляем текст сообщения о статусе отправки

            form.insertAdjacentElement('afterend', statusMessage); // записать в форму контейнер с сообщением

            const formData = new FormData(form); // Объект FormData
  
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // Копирование объекта FormData в json

            postData('http://localhost:3000/requests', json)// Получение ответа от сервера
            .then(date => {
                console.log(date);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.error);
            })
            .finally(() => {
                form.reset();
            });
        });
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');    
        showModal('[data-modalform]', setTimeOutModal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-closemodal>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('[data-modalform]');
        }, 4000);
    }
}

export default forms;