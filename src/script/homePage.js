import { Api } from "./api.js";

const headerButton = document.querySelector("#header__button__logout")
const listaPosts = await Api.capturarPosts()
const userAutenticado = await Api.pegarDadosUser(localStorage.getItem("userId"))

class HomePage {
    static listarPosts (lista) {
        let osPosts = lista.forEach(post => HomePage.criarPosts(post))
        return osPosts
    }
    static criarPosts(post) {
        let userPost = listaPosts.data[listaPosts.data.indexOf(post)].user
        let contentPost = listaPosts.data[listaPosts.data.indexOf(post)]
        console.log(userPost)
        const listaMenor = document.querySelector(".main__posts")
        const postCriado = document.createElement("li")
        const imagemUserPost = document.createElement("img")
        const nomeUserPost = document.createElement("h2")
        const postContent = document.createElement("p")
        const dataPost = document.createElement("span")
        const caixaButtons = document.createElement("div")
        const buttonEditPost = document.createElement("button")
        const buttonDeletePost =document.createElement("button")
        const caixaContent = document.createElement("div")

        imagemUserPost.src = userPost.avatarUrl
        nomeUserPost.innerText = userPost.username
        postContent.innerText = contentPost.content
        dataPost.innerText = contentPost.createdAt.substr(0, 10).replaceAll("-", "/")
        buttonEditPost.innerText = "Editar"
        buttonDeletePost.innerText = "Apagar"

        postCriado.id = userPost.id
        buttonEditPost.id = "buttonEdit"
        buttonDeletePost.id = "buttonDelete"
        postCriado.className = "post"
        caixaButtons.className = "buttons__div"
        caixaContent.className = "caixa__content"
        
        caixaButtons.append(buttonEditPost, buttonDeletePost)
        caixaContent.append(nomeUserPost, postContent, dataPost)
        if (userPost.id == userAutenticado.id){
            postCriado.append(imagemUserPost, caixaContent, caixaButtons)
        } else {
            postCriado.append(imagemUserPost, caixaContent)
        }
        listaMenor.appendChild(postCriado)

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
    static trocarPagina() {
        let pagAtual = 1
        const btnProximaPag = document.getElementById("proximaPagina")
        const btnPagAnterior = document.getElementById("paginaAnterior")

        btnProximaPag.addEventListener("click", () => {
            pagAtual ++
            return Api.capturarPosts(pagAtual)
        })
        btnPagAnterior.addEventListener("click", () => {
            return pagAtual --
        })
        return pagAtual
    }
    static novoPost() {
        const inputNovoPost = document.getElementById("inputNovoPost")
        const btnAdicionarPost = document.getElementById("btnAdicionarPost")

        btnAdicionarPost.addEventListener("click", async (event) => {
            event.preventDefault()

            const data = {
                content: inputNovoPost.value
            }
            await Api.criarNovoPost(data)
            const postsAtualizados = await Api.capturarPosts()
            this.listarPosts(postsAtualizados)
            return postsAtualizados
        })
    }
}

HomePage.renderizarUser()
HomePage.listarPosts(listaPosts.data)
HomePage.novoPost()
HomePage.trocarPagina()

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
