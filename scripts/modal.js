
const modalCriarPost = () =>{
    const botaoCriarPubl = document.querySelector(".botaoCriarPubl")
    botaoCriarPubl.addEventListener("click", ()=>{
        const sectionModal = document.querySelector(".modal")
        sectionModal.classList.add("ativarModal")
    
        sectionModal.insertAdjacentHTML("afterbegin", `
        <div class="modalCriarPost">
        <div>
            <h2>Criando novo post</h2>
            <button class="botaoFecharModalCriar botaoPadraoPequeno botaoCinza">X</button>
        </div>
        <div>
            <label for="titulo">Título do post</label>
            <input class="inputTitulo" type="text" name="titulo" placeholder="Digite o título aqui..." required="true">
        </div>
        <div>
            <label for="conteudo">Conteúdo do post</label>
            <textarea class="textAreaConteudo" name="conteudo" id="" cols="30" rows="10" placeholder="Desenvolva o conteúdo do post aqui..." required="true"></textarea>
        </div>
        <div>
            <button class="botaoCancelar botaoPadrao botaoCinza">Cancelar</button>
            <button type="submit" class="botaoPublicar botaoPadrao botaoAzul">Publicar</button>
        </div>
        </div>
        `)
    
        document.querySelector(".botaoFecharModalCriar").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        }) 
        document.querySelector(".botaoCancelar").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        }) 
    
        const inputTitulo = document.querySelector(".inputTitulo")
        const textAreaConteudo = document.querySelector(".textAreaConteudo")
        const botaoPublicar = document.querySelector(".botaoPublicar")

        const token = buscarToken()
        
        botaoPublicar.addEventListener("click", (event)=>{
            event.preventDefault()
            const objeto ={
                title: inputTitulo.value,
                content: textAreaConteudo.value
            }
            requisicaoCriarPost(token.token, objeto)
            sectionModal.className = "modal"
            renderizarPosts(requisicaoBuscarPosts(token.token))
        })
    })
}
modalCriarPost()
 

const modalAbrirPost = (objeto) =>{
        const sectionModal = document.querySelector(".modal")
        sectionModal.classList.add("ativarModal")
        sectionModal.innerHTML=""

        sectionModal.insertAdjacentHTML("afterbegin", `
        <div class="modalPublicacao">
        <div class="cabecalho">
        <div>
            <img class="imgPerfil" src="${objeto.user.avatar}" alt="">
            <p class="nomeLi">${objeto.user.username}</p>
            <p class="dataLi"></p>
        </div>
        <button class="fecharModalPost botaoPadraoPequeno botaoCinza">X</button>
        </div>
        <h2 class="tituloPost">${objeto.title}</h2>
        <p class="textoPost">${objeto.content}</p>
        </div>
        `)
        const data = new Date
        const pData = document.querySelector(".dataLi")
        pData.innerText = data.toLocaleDateString()

        document.querySelector(".fecharModalPost").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        })
   
}








