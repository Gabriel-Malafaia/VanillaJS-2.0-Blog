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
}