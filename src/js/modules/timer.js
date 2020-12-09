function timer(id, deadLine) {
    //----------------------------------------
    // Таймер
    //----------------------------------------

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    };

    function zeroAddClock(elem) {
        if(elem >= 0 && elem < 10) {
            return `0${elem}`;
        } else {
            return elem
        }
    };

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = zeroAddClock(t.days);
            hours.innerHTML = zeroAddClock(t.hours);
            minutes.innerHTML = zeroAddClock(t.minutes);
            seconds.innerHTML = zeroAddClock(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    };
    
    setClock(id, deadLine);
}

export default timer;