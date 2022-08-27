import {
    Api
} from "./api.js";

const headerButton = document.querySelector("#header__button__logout")
const listaPosts = await Api.capturarPosts()
const userAutenticado = await Api.pegarDadosUser(localStorage.getItem("userId"))

class HomePage {
    static listarPosts(lista) {
        const listaMenor = document.querySelector(".main__posts")
        listaMenor.innerHTML = ""
        let osPosts = lista.forEach(post => HomePage.criarPosts(lista, post))
        return osPosts
    }

    static criarPosts(lista, post) {
        let userPost = lista[lista.indexOf(post)].user
        let contentPost = lista[lista.indexOf(post)]
        const listaMenor = document.querySelector(".main__posts")
        const postCriado = document.createElement("li")
        const imagemUserPost = document.createElement("img")
        const nomeUserPost = document.createElement("h2")
        const postContent = document.createElement("p")
        const dataPost = document.createElement("span")
        const caixaButtons = document.createElement("div")
        const buttonEditPost = document.createElement("button")
        const buttonDeletePost = document.createElement("button")
        const caixaContent = document.createElement("div")

        imagemUserPost.src = userPost.avatarUrl
        nomeUserPost.innerText = userPost.username
        postContent.innerText = contentPost.content
        dataPost.innerText = contentPost.createdAt.substr(0, 10).replaceAll("-", "/")
        buttonEditPost.innerText = "Editar"
        buttonDeletePost.innerText = "Apagar"

        buttonEditPost.className = contentPost.id
        buttonDeletePost.className = contentPost.id
        postCriado.id = userPost.id
        buttonEditPost.id = "buttonEdit"
        buttonDeletePost.id = "buttonDelete"
        postCriado.className = "post"
        caixaButtons.className = "buttons__div"
        caixaContent.className = "caixa__content"

        caixaButtons.append(buttonEditPost, buttonDeletePost)
        caixaContent.append(nomeUserPost, postContent, dataPost)
        if (userPost.id == userAutenticado.id) {
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

    static async trocarPagina() {
        let pagAtual = 1
        const btnProximaPag = document.getElementById("proximaPagina")
        const btnPagAnterior = document.getElementById("paginaAnterior")
        const pgAtual = document.getElementById("pgAtual")

        btnProximaPag.addEventListener("click", async (event) => {
            event.preventDefault()
            const novosPosts = await Api.capturarPosts(pagAtual)
            if (pagAtual >= novosPosts.totalPages) {
                pagAtual = 1
            } else {
                pagAtual++
            }
            await this.listarPosts(novosPosts.data)
            pgAtual.innerText = pagAtual
        })

        btnPagAnterior.addEventListener("click", async (event) => {
            event.preventDefault()
            const novosPosts = await Api.capturarPosts(pagAtual)
            if (pagAtual <= 1) {
                pagAtual = novosPosts.totalPages
            } else {
                pagAtual--
            }
            await this.listarPosts(novosPosts.data)
            pgAtual.innerText = pagAtual
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
            const postsAtualizados = await Api.capturarPosts(1)
            this.listarPosts(postsAtualizados.data)
            inputNovoPost.value = ""
            return postsAtualizados
        })
    }

    static buttonLogout() {
        headerButton.addEventListener("click", () => {
            const sairOuNao = window.confirm('Tem certeza que você deseja sair?')
            if (sairOuNao) {
                localStorage.removeItem('userId')
                localStorage.removeItem('userToken')
                location.assign('../../index.html')
            }
        })
    }

    static validarUser() {
        const token = localStorage.getItem('userToken')
        if (!token) {
            location.assign('../../index.html')
        }
    }

    static editAndDeletePost() {
        const mainPost = document.querySelector(".main__posts")
        mainPost.addEventListener("click", (e) => {
            const Idbutton = e.target.id
            const IdPost = e.target.className
            
            if (Idbutton == 'buttonEdit') {
                e.preventDefault()
                const editar = document.querySelector(".bgModalEdit")
                editar.style.display = "block"
                const postar = document.querySelector("#btnEditarPost")
                const naoPostar = document.querySelector("#btnNaoEditarPost")

                postar.addEventListener("click", async (e) => {
                    e.preventDefault()
                    const inputeditar = document.querySelector("#inputEditpost")
                    await Api.editarPost(IdPost, {
                        content: inputeditar.value
                    })
                    editar.style.display = "none"
                    window.location.reload()
                })

                naoPostar.addEventListener("click", async (e) => {
                    e.preventDefault()
                    editar.style.display = "none"
                })
            }

            if (Idbutton == 'buttonDelete') {
                const deletar = document.querySelector(".bgModalDelete")
                deletar.style.display = "block"
                const botaoSim = document.querySelector("#btnSim")
                botaoSim.addEventListener("click", async () => {
                    await Api.deletarPost(IdPost)
                    deletar.style.display = "none"
                    window.location.reload()
                })
                const botaoNao = document.querySelector("#btnNao")

                botaoNao.addEventListener("click", () => {
                    deletar.style.display = "none"
                })
            }
        })
    }

}

HomePage.validarUser()
HomePage.renderizarUser()
HomePage.listarPosts(listaPosts.data)
HomePage.novoPost()
HomePage.trocarPagina()
HomePage.buttonLogout()
HomePage.editAndDeletePost()