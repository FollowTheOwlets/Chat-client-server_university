import {put} from "./Request";

const sendMessage = (recipients, title, text, obj_text, obj_title) => {

    for (let i = 0; i < recipients.length; i++) {
        recipients[i] = recipients[i].trim();
        if (recipients[i].length !== 7 || recipients[i][0] !== '@' || isNaN(Number(recipients[i].slice(1)))) {
            alert("Ошибка в списке получателей:  " + recipients[i]);
            return false;
        }
    }

    if (!title.trim()) {
        alert("Укажите заголовок письма.");
        obj_title.current.focus();
        return false;
    }

    if (!text.trim()) {
        alert("Добавьте текст письма.");
        obj_text.current.focus();
        return false;
    }

    const id = localStorage.getItem("id");
    const now = new Date();
    let [day, mon, year, hour, min, get] = [now.getDate() + 1, now.getMonth() + 1, now.getFullYear(), now.getHours(), now.getMinutes(), now.getTime()];
    String(day).length === 1 && (day = "0" + day);
    String(mon).length === 1 && (mon = "0" + mon);
    String(hour).length === 1 && (hour = "0" + hour);
    String(min).length === 1 && (min = "0" + min);

    const time = {day, mon, year, hour, min, get};


    recipients.forEach(recipient => {
        put(`new_message`, {id, recipient, time, title, text}, (response) => {
            if (response === "User 404") {
                alert(`Такого пользователя не найдено: ${recipient}`);
            } else {
                alert(`Письмо для ${recipient} отправлено`);
            }
        })
    })
    return true;
}
export {sendMessage}