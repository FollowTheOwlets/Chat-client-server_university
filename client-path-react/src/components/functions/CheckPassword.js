
const checkPassword = (pas, repPas) => {
    let low = 0, upper = 0, num = 0;
    for (const ch of pas) {
        if (ch.toLowerCase() === ch && isNaN(Number(ch))) {
            low++;
        }
        if (ch.toUpperCase() === ch && isNaN(Number(ch))) {
            upper++;
        }
        if (!isNaN(Number(ch))) {
            num++;
        }
    }
    if (!low) {
        alert("Пароль должен содержать хотя бы одну прописную букву.");
        return false;
    } else if (!upper) {
        alert("Пароль должен содержать хотя бы одну заглавную букву.");
        return false;
    } else if (!num) {
        alert("Пароль должен содержать хотя бы одну цифру.");
        return false;
    } else if (pas.length < 10) {
        alert("Пароль должен содержать минимум 10 символов");
        return false;
    }

    if (pas !== repPas){
        alert("Пароли не совпадают");
        return false;
    }

    return true;
};

export  {checkPassword};