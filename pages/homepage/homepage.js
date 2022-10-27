
const buscarToken = () =>{
   return JSON.parse(localStorage.getItem("@token:login"))
}

const verirficarPermissao = async () =>{
    const token = buscarToken()
    if(!token){
        window.location.assign("/index.html")
    }else{
       const usuario = await requisicaoBuscarUsuario(token.token)
       renderizaPerfil(usuario)
    }
}
verirficarPermissao()

const cardSair = () =>{
    const imgPerfil = document.querySelector(".imgPerfilCabecalho")
    const sairConta = document.querySelector(".sairDaConta")
    const botaoSair = document.querySelector(".botaoSair")

    imgPerfil.addEventListener("click", () =>{
        sairConta.classList.add("displayFlex")
    })
    botaoSair.addEventListener("click", ()=>{
        window.location.assign("../../index.html")
        localStorage.removeItem("@token:login")
        localStorage.removeItem("@emailValidacao")
    })
}
cardSair()


const renderizaPerfil = (objeto) =>{
    const imgPerfilCabecalho = document.querySelector(".imgPerfilCabecalho")
    const emailPerfilCabecalho = document.querySelector(".sairEmail")
    
    imgPerfilCabecalho.src = objeto.avatar
    emailPerfilCabecalho.innerText = objeto.email
    localStorage.setItem("@emailValidacao", JSON.stringify(objeto.email))
    
    const token = buscarToken()
    requisicaoBuscarPosts(token.token)
}

const renderizarData = (post) =>{
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const data = new Date(post.createdAt)
    let mes = meses[data.getMonth()]

    return `${mes} de ${data.getFullYear()}`
}

const renderizarPosts = async (array) =>{
    const ul = document.querySelector(".ulPosts")
    ul.innerHTML =""

    await array.forEach(post =>{
        const li = criarLi(post)
        ul.appendChild(li)
    })
    
}

const criarLi = (post) =>{
    const li = document.createElement("li")
    const divCabecalho = document.createElement("div")
    const divCabecalhoCard = document.createElement("div")
    const img = document.createElement("img")
    const pNome = document.createElement("p")
    const pData = document.createElement("p")
    const divBotoes = document.createElement("div")
    const h2 = document.createElement("h2")
    const pTexto = document.createElement("p")
    const botaoAcessar = document.createElement("button")

    li.className = "liPost"
    divCabecalho.className = "cabecalho"
    img.className = "imgPerfil"
    img.src = post.user.avatar
    pNome.className = "nomeLi"
    pNome.innerText = post.user.username
    pData.className = "dataLi"
    pData.innerText = renderizarData(post)
    h2.className = "tituloPost"
    h2.innerText = post.title
    pTexto.setAttribute('maxLength',145);
    pTexto.className = "textoPost"
    pTexto.innerText = post.content
    botaoAcessar.className = "botaoAbrirPost botaoLinkAzul"
    botaoAcessar.innerText = "Acessar publicação"

    if(JSON.parse(localStorage.getItem("@emailValidacao")) === post.user.email){
        const botaoEditar = document.createElement("button")
        const botaoExcluir = document.createElement("button")
        botaoEditar.className = "botaoEditar botaoPadraoPequeno botaoBranco"
        botaoEditar.innerText = "Editar"
            
        botaoEditar.addEventListener("click", ()=>{
            const objeto ={
                id: post.id,
                title: post.title,
                content: post.content
            }
            editarPost(objeto)
        })
        botaoExcluir.className = "botaoExcluir botaoPadraoPequeno botaoCinza"
        botaoExcluir.innerText = "Excluir"

        botaoExcluir.addEventListener("click", ()=>{
            removerPost(post.id)
        })
        divBotoes.append(botaoEditar, botaoExcluir)
    }

    botaoAcessar.addEventListener("click", ()=>{
        modalAbrirPost(post)
    })

    li.append(divCabecalho, h2, pTexto, botaoAcessar)
    divCabecalho.append(divCabecalhoCard, divBotoes)
    divCabecalhoCard.append(img, pNome, pData)
    
    return li
}


