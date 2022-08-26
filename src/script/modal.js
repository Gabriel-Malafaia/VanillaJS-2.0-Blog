const content = document.querySelector(".container__content")
const login = document.getElementById("container__login")
const register = document.getElementById("container__register")

login.addEventListener("click", (e) => {
    const idLocal = e.target.id
    if(idLocal == 'open-register') {
        login.style.display = 'none'
        register.style.display = 'flex'
    }
})

register.addEventListener("click", (e) => {
    const idLocal = e.target.id
    if(idLocal == 'open-login') {
        login.style.display = 'flex'
        register.style.display = 'none'
    }
})