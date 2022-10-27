
const modalCriarPost = () =>{
    const botaoCriarPubl = document.querySelector(".botaoCriarPubl")
    botaoCriarPubl.addEventListener("click", ()=>{
        const sectionModal = document.querySelector(".modal")
        sectionModal.classList.add("ativarModal")
        sectionModal.innerHTML =""
    
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
        
        botaoPublicar.addEventListener("click", async (event)=>{
            event.preventDefault()
            const objeto ={
                title: inputTitulo.value,
                content: textAreaConteudo.value
            }
            await requisicaoCriarPost(token.token, objeto)
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
            <p class="dataLi">${renderizarData(objeto)}</p>
        </div>
        <button class="fecharModalPost botaoPadraoPequeno botaoCinza">X</button>
        </div>
        <h2 class="tituloPost">${objeto.title}</h2>
        <p class="textoPost">${objeto.content}</p>
        </div>
        `)

        document.querySelector(".fecharModalPost").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        })
}


const editarPost = (objeto) =>{
    const sectionModal = document.querySelector(".modal")
        sectionModal.classList.add("ativarModal")
        sectionModal.innerHTML=""

        sectionModal.insertAdjacentHTML("afterbegin", `
        <div class="modalEditarPost">
        <div>
            <h2>Edição</h2>
            <button class="botaoFecharEdicao botaoPadraoPequeno botaoCinza">X</button>
        </div>
        <div>
            <label for="titulo">Título do post</label>
            <input class= "inputEditarTitulo" type="text" name="titulo" placeholder="Digite o título aqui..." required="true">
        </div>
        <div>
            <label for="conteudo">Conteúdo do post</label>
            <textarea class= "inputEditarTexto" name="conteudo" id="" cols="30" rows="10" placeholder="Desenvolva o conteúdo do post aqui..." required="true"></textarea>
        </div>
        <div>
            <button class="botaoCancelarEdicao botaoPadrao botaoCinza">Cancelar</button>
            <button type="submit" class="botaoSalvaEdicao botaoPadrao botaoAzul">Salva Alterações</button>
        </div>
        </div> 
        `)

        const inputTitulo = document.querySelector(".inputEditarTitulo")
        const textAreaTexto = document.querySelector(".inputEditarTexto")

        inputTitulo.value = objeto.title
        textAreaTexto.value = objeto.content

        document.querySelector(".botaoFecharEdicao").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        })

        document.querySelector(".botaoCancelarEdicao").addEventListener("click", ()=>{
            sectionModal.className = "modal"
        })

        const token = buscarToken()
        const id = objeto.id

        document.querySelector(".botaoSalvaEdicao").addEventListener("click", async (event)=>{
            event.preventDefault()
            const objeto ={
                title: inputTitulo.value,
                content: textAreaTexto.value
            }
            await requisicaoAtualizarPost(id, token.token, objeto)
            renderizarPosts(requisicaoBuscarPosts(token.token))
            sectionModal.className = "modal"
        })
}


const removerPost = (id) =>{
    const sectionModal = document.querySelector(".modal")
    sectionModal.classList.add("ativarModal")
    sectionModal.innerHTML =""

    sectionModal.insertAdjacentHTML("afterbegin", `
    <div class="modalExcluirPost">
    <div>
        <h2>Confirmação de exclusão</h2>
        <button class="botaoFecharCancelar botaoPadraoPequeno botaoCinza">X</button>
    </div>
    <div>
        <h3>Tem certeza que deseja excluir este post?</h3>
        <p>Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
    </div>
    <div>
        <button class="botaoCancelarExcluir botaoPadrao botaoCinza">Cancelar</button>
        <button class="botaoConfirmarExcluir botaoPadrao botaoVermelho">Sim, excluir este post</button>
    </div>
    </div>
    `)

    document.querySelector(".botaoFecharCancelar").addEventListener("click", ()=>{
        sectionModal.className = "modal"
    })

    document.querySelector(".botaoCancelarExcluir").addEventListener("click", ()=>{
        sectionModal.className = "modal"
    })

    const token = buscarToken()

    document.querySelector(".botaoConfirmarExcluir").addEventListener("click", async ()=>{
        await requisicaoExcluirPost(id, token.token)
        renderizarPosts(requisicaoBuscarPosts(token.token))
        sectionModal.className = "modal"
    })
}









