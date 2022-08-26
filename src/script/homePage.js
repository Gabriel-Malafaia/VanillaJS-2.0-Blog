import { Api } from "./api.js";

const headerButton = document.querySelector("#header__button__logout")
const listaPosts = await Api.capturarPosts()
const userAutenticado = await Api.pegarDadosUser(localStorage.getItem("userId"))

class HomePage {
    static criarPosts(post) {
        let userPost = listaPosts.data[listaPosts.data.indexOf(post)].user
        let contentPost = listaPosts.data[listaPosts.data.indexOf(post)]
        
        const listaMenor = document.querySelector(".main__posts")
        const listaMaior = document.querySelector(".posts__telaMaior")
        const postCriado = document.createElement("li")
        const imagemUserPost = document.createElement("img")
        const nomeUserPost = document.createElement("h2")
        const postContent = document.createElement("p")
        const dataPost = document.createElement("span")
        const caixaButtons = document.createElement("div")
        const buttonEditPost = document.createElement("button")
        const buttonDeletePost =document.createElement("button")
        const caixaImgButtons = document.createElement("div")
        const caixaUserContent = document.createElement("div")

        imagemUserPost.src = userPost.avatarUrl
        nomeUserPost.innerText = userPost.username
        postContent.innerText = contentPost.content
        dataPost.innerText = contentPost.createdAt
        buttonEditPost.innerText = "Editar"
        buttonDeletePost.innerText = "Apagar"

        postCriado.className = "post"
        
        caixaButtons.append(buttonEditPost, buttonDeletePost)
        postCriado.append(imagemUserPost, nomeUserPost, postContent, dataPost, caixaButtons)
        listaMenor.appendChild(postCriado)

        postCriado.className = "post__maior"
        caixaImgButtons.append(imagemUserPost, caixaButtons)
        caixaUserContent.append(nomeUserPost, postContent)
        postCriado.append(caixaImgButtons, caixaUserContent, dataPost)
        listaMaior.appendChild(postCriado)
    }
    static async renderizarUser() {
        const headerProfile = document.getElementById("header__userProfile")
        const imgProfile = document.createElement("img")
        const nomeUsuario = document.createElement("h1")

        imgProfile.src = userAutenticado.avatarUrl
        nomeUsuario.innerText = userAutenticado.username

        headerProfile.innerHTML = ""
        headerProfile.append(imgProfile, nomeUsuario)
    }
}

listaPosts.data.forEach(post => HomePage.criarPosts(post))
HomePage.renderizarUser()

headerButton.addEventListener("click", () => {
    const sairOuNao = window.confirm('Tem certeza que você deseja sair?')
    if(sairOuNao) {
        localStorage.removeItem('userId')
        localStorage.removeItem('userToken')
        location.assign('../../index.html')
    } 
})