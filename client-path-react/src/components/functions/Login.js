const login = (id, password, name) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
}

export {login}