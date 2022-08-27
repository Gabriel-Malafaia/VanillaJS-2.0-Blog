import {
    Api
} from "./api.js"

class Login {
    static validarLogin() {
        const formularioLogin = document.querySelector(".login")
        formularioLogin.addEventListener("submit", async (e) => {
            e.preventDefault()
            const dataLogin = {
                email: formularioLogin[0].value,
                password: formularioLogin[1].value
            }
            const data = JSON.stringify(dataLogin)
            const response = await Api.logarUsuario(data)
            if (response.token) {
                location.assign('./src/pages/homePage.html')
            } else {
                alert('Usuário ou senha incorretos.')
            }
        })
    }

    static validarRegistro() {
        const formularioRegister = document.querySelector(".register")
        formularioRegister.addEventListener("submit", async (e) => {
            e.preventDefault()
            const objetoCadastro = {}
            for (let i = 0; i < formularioRegister.length - 1; i++) {
                const input = formularioRegister[i]
                objetoCadastro[`${input.name}`] = input.value
            }
            const data = JSON.stringify(objetoCadastro)
            const cadastrarUsuario = await Api.cadastrarUsuario(data)
            if (await cadastrarUsuario.id) {
                alert("Cadastro bem sucedido, agora faça seu login!!")
                window.location.reload()
            } else {
                alert("Cadastro incorreto, verifique seus dados.")
            }
        })
    }

    static modalLogin() {
        const login = document.getElementById("container__login")
        const register = document.getElementById("container__register")

        login.addEventListener("click", (e) => {
            const idLocal = e.target.id
            if (idLocal == 'open-register') {
                login.style.display = 'none'
                register.style.display = 'flex'
            }
        })
        register.addEventListener("click", (e) => {
            const idLocal = e.target.id
            if (idLocal == 'open-login') {
                login.style.display = 'flex'
                register.style.display = 'none'
            }
        })
    }


}

Login.validarLogin()
Login.validarRegistro()
Login.modalLogin()