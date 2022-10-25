
const url = "http://localhost:3333"
const headers = {"Content-Type": "application/json"}

const requisicaoLogin = async (objeto) =>{
    const retorno = await fetch(`${url}/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objeto) 
    })
    .then(resp => resp.json())
    .then(resp =>{
        if(resp.token){
            localStorage.removeItem("@token:login")
            localStorage.setItem("@token:login", JSON.stringify(resp))
            window.location.assign("/pages/homepage/homepage.html")
        }
      
        const divAlerta = document.querySelector(".divAlertaSenha")
        divAlerta.innerHTML=""
        if(resp.message === "O email está incorreto"){
            divAlerta.insertAdjacentHTML("afterbegin", `
            <p class="senhaIncorreta">O email está incorreto</p>
            `)
         }
        if(resp.message === "A senha está incorreta"){
            divAlerta.insertAdjacentHTML("afterbegin", `
            <p class="senhaIncorreta">A senha está incorreta</p>
            `)
        }
    })
    .catch(err => console.log(err)) 

    return retorno
}

const requisicaoCadastro = async (objeto) =>{
    const retorno = await fetch(`${url}/users/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objeto)
    })
    .then(resp => resp.json())
    .then(resp => {
        const main = document.querySelector("main")
        main.insertAdjacentHTML("beforeend", `
        <section class="mensagemSucesso">
        <div>
            <img src="/src/icons/check.png" alt="">
            <h3>Sua conta foi criada com sucesso!</h3>
        </div>
        <p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="/index.html">Acessar página de login</a></p>
        </section>
        `)
    })
    .catch(err => console.log(err))
}

const requisicaoBuscarUsuario = async (token) =>{
    const usuario = await fetch(`${url}/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
    }
    })
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => console.log(err))

    return usuario
}

const requisicaoBuscarPosts = async (token) =>{
    const posts = await fetch(`${url}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => console.log(err))
   
    renderizarPosts(posts)
}

const requisicaoCriarPost = async (token, objeto) =>{
    const post = await fetch(`${url}/posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(objeto)
    })
    .then(resp => resp.json())
    .then(resp => resp)
    .catch(err => console.log(err))

    return post
}

