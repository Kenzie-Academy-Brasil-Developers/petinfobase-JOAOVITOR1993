
const capturarValorInputs = () =>{
    const inputNome = document.querySelector(".inputNomeCadastro")
    const inputEmail = document.querySelector(".inputEmailCadastro")
    const inputFoto = document.querySelector(".inputFotoCadastro")
    const inputSenha = document.querySelector(".inputSenhaCadastro")
    const botaoCadastrar = document.querySelector(".botaoCadastrar")

    botaoCadastrar.disabled = true
    botaoCadastrar.className = "botaoAcessar botaoAzulDesabilitado"
    
    inputNome.addEventListener("keypress", ()=>{
        if(inputNome.value !== ""){
            botaoCadastrar.disabled = false
            botaoCadastrar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    inputEmail.addEventListener("keypress", ()=>{
        if(inputEmail.value !== ""){
            botaoCadastrar.disabled = false
            botaoCadastrar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    inputFoto.addEventListener("keypress", ()=>{
        if(inputFoto.value !== ""){
            botaoCadastrar.disabled = false
            botaoCadastrar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    inputSenha.addEventListener("keypress", ()=>{
        if(inputSenha.value !== ""){
            botaoCadastrar.disabled = false
            botaoCadastrar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    botaoCadastrar.addEventListener("click", (event)=>{
        event.preventDefault()
        const objeto = {
            username: inputNome.value,
            email: inputEmail.value,
            password: inputSenha.value,
            avatar: inputFoto.value
        }
        requisicaoCadastro(objeto)
    })
   
}
capturarValorInputs()

const botaoVoltarLogin = () =>{
    const botaoVoltar1 = document.querySelector(".botaoVoltar1")
    const botaoVoltar2 = document.querySelector(".botaoVoltar2")

    botaoVoltar1.addEventListener("click", ()=>{
        window.location.assign("../../index.html")
    })
    botaoVoltar2.addEventListener("click", ()=>{
        window.location.assign("../../index.html")
    })
}
botaoVoltarLogin()