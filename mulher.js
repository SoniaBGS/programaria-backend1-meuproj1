const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: 'simara conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e instrtutora'
    })
}

function mostraPorta() {
    console.log ("servidor criado e rodando na porta ", porta);
}

  app.use(router.get('/mulher', mostraMulher))
  app.listen(porta, mostraPorta)

