import { Api } from "./api.js"
const formularioRegister = document.querySelector(".register")

formularioRegister.addEventListener("submit", async (e) => {
    e.preventDefault()
    const objetoCadastro = {}            
    for(let i = 0; i < formularioRegister.length - 1; i++) {
        const input = formularioRegister[i]
        objetoCadastro[`${input.name}`] = input.value
    }
    const data = JSON.stringify(objetoCadastro)
    const cadastrarUsuario = await Api.cadastrarUsuario(data)
    console.log(await cadastrarUsuario)
    if(await cadastrarUsuario.id) {
        alert("Cadastro bem sucedido, agora faça seu login!!")
        window.location.reload()
    } else {
        alert("Cadastro incorreto, verifique seus dados.")
    }
})

