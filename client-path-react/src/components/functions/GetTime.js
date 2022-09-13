const getTime = (time) =>{
    const now = new Date();
    let messageTime;
    if (+now.getFullYear() === +time.year && +now.getDate() + 1 === +time.day && +now.getMonth() + 1 === +time.mon && +now.getHours() === +time.hour && +now.getMinutes() === +time.min) {
        messageTime = `now`;
    } else if (+now.getFullYear() === +time.year && +now.getDate() + 1 === +time.day && +now.getMonth() + 1 === +time.mon && +now.getHours() === +time.hour) {
        messageTime = `${+now.getMinutes() - +time.min} minutes ago`;
    } else if (+now.getFullYear() === +time.year && +now.getDate() + 1 === +time.day && +now.getMonth() + 1 === +time.mon && +now.getHours() - 1 === +time.hour && 60 - +now.getMinutes() + +time.min < 60) {
        messageTime = `${60 - +now.getMinutes() + +time.min} minutes ago`;
    } else if (+now.getFullYear() === +time.year && +now.getDate() + 1 === +time.day && +now.getMonth() + 1 === +time.mon) {
        messageTime = `today ${time.hour}:${time.min}`;
    } else {
        messageTime = `${time.day}.${time.mon}.${time.year}  ${time.hour}:${time.min}`
    }
    return messageTime;
}

export {getTime};