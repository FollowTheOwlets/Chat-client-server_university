import axios from "axios";

const post = (path, data, fun) => {
    axios.post(`http://localhost:80/${path}`, data)
        .then(res => {
            fun(res.data);
        })
}

const get = (path, fun) => {
    axios.post(`http://localhost:80/${path}`)
        .then(res => {
            fun(res.data)
        })
}

const del = (path, data, fun) => {
    axios.delete(`http://localhost:80/${path}`, {
        headers: null,
        data
    })
        .then(res => {
            fun(res.data)
        })
}

const put = (path, data, fun) => {
    axios.put(`http://localhost:80/${path}`, data)
        .then(res => {
            fun(res.data)
        })
}

export {post, get, del, put};