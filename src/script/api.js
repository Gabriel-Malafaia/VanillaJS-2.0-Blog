export class Api {
    static baseUrl = `https://blog-m2.herokuapp.com`
    static token = localStorage.getItem('userToken')
    static headers = {
        "Content-Type": "Application/json"
    }

    static async cadastrarUsuario(data) {
        const requerirCadastro = await fetch(`${this.baseUrl}/users/register`, {
                method: "POST",
                headers: this.headers,
                body: data
            })
            .then(res => res.json())
            .catch(error => console.log(error))
        return await requerirCadastro
    }

    static async logarUsuario(data) {
        const requirirLogin = await fetch(`${this.baseUrl}/users/login`, {
                method: "POST",
                headers: this.headers,
                body: data
            })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('userToken', res.token)
                localStorage.setItem('userId', res.userId)
                return res
            })
            .catch(error => console.log(error))

        return requirirLogin
    }

    static async capturarPosts(pag) {
        const posts = await fetch(`${this.baseUrl}/posts?page=${pag}`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return posts
    }

    static async pegarDadosUser(id) {
        const usuario = await fetch(`${this.baseUrl}/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return usuario
    }

    static async criarNovoPost(data) {
        const novoPost = await fetch(`${this.baseUrl}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return novoPost
    }

    static async deletarPost(id) {
        const deletarPost = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                "authorization": `Bearer ${this.token}`
            }
        })
        return deletarPost
    }

    static async editarPost(id, content) {
        const editarPost = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "Application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(content)
        })
        return editarPost
    }
}