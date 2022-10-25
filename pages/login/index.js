
const capturarValorInputLogin = () =>{
    const inputEmail = document.querySelector(".inputEmail")
    const inputSenha = document.querySelector(".inputSenha")
    const botaoAcessar = document.querySelector(".botaoAcessar")

    botaoAcessar.disabled = true
    botaoAcessar.className = "botaoAcessar botaoAzulDesabilitado"
    
    inputEmail.addEventListener("keypress", ()=>{
        if(inputEmail.value !== ""){
            botaoAcessar.disabled = false
            botaoAcessar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    inputSenha.addEventListener("keypress", ()=>{
        if(inputSenha.value !== ""){
            botaoAcessar.disabled = false
            botaoAcessar.className = "botaoAcessar botaoPadrao botaoAzul"
        }
    })
    botaoAcessar.addEventListener("click", (event)=>{
        event.preventDefault() 

        botaoAcessar.innerHTML =""
        const img = document.createElement("img")
        img.src = "../../src/icons/spinner.png"
        img.className = "carregar"
        botaoAcessar.appendChild(img)

        const objeto = {
            email: inputEmail.value,
            password: inputSenha.value,
        }
        const resposta = requisicaoLogin(objeto)
    })
}
capturarValorInputLogin()

const cadastrarEncaminhar = () =>{
    const botaoCadastrar = document.querySelector(".botaoCadastrar")

    botaoCadastrar.addEventListener("click", ()=>{
        window.location.assign("pages/cadastro/cadastro.html")
    })
}
cadastrarEncaminhar()
