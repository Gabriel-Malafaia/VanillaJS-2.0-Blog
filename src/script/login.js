import { Api } from "./api.js"
const formularioLogin = document.querySelector(".login")

formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    const dataLogin = {
        email: formularioLogin[0].value,
        password: formularioLogin[1].value
    }
    const data = JSON.stringify(dataLogin)
    const response = await Api.logarUsuario(data)
    if(response.token) {
        location.assign('./src/pages/homePage.html')
    } else {
        alert('Usuário ou senha incorretos.')
    }
})








