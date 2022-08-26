export class Api {
    static baseUrl = `https://blog-m2.herokuapp.com`
    static token = localStorage.getItem('userToken')
    static headers = {
        "Content-Type" : "Application/json"
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
        const requirirLogin = await fetch(`${this.baseUrl}/users/login`,{
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

    static async capturarPosts() {
        const posts = await fetch(`${this.baseUrl}/posts?page=1`, {
            method: "GET",
            headers: {
                "Content-Type" : "Application/json",
                "authorization": `Bearer ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

        return posts
    }
}