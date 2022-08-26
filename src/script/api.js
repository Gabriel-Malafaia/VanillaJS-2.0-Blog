export class Api {
    static baseUrl = `https://blog-m2.herokuapp.com`
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
            localStorage.setItem('Authorization: Bearer', res.token)
            localStorage.setItem('userId', res.userId)
            return res
        })
        .catch(error => console.log(error))

        return requirirLogin
    }
}