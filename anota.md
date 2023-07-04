const express = require("express") // aqui estou iniciando o express
const router = express.Router() //aqui estou configurando aprimeira parte da rota
// linha de código apagada como abaixo:
// const { v4: uuidv4 } = require("uuid"); // aqui estou iniciando o uuid

const conectaBancoDeDados = require('./bancoDeDados') // aqui iniciando o banco de dados
conectaBancoDeDados()
const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json()) //
const porta = 3333; // aqui estou criando a porta

// aqui estou criando a lista inicial de mulheres
// const mulheres = [
//  {
//    id: "1",
//   nome: "Simara Conceição",
//    imagem: "https://github.com/simaraconceicao.png",
//   minibio: "Desenvolvedora e instrtutora",
// },

//  { 
//    id: "2",
//    nome: "Iana Chan",
//    imagem: "https://bit.ly/3JCXBqP",
//   minibio: "CEO & Founder da PrograMaria",
//  },

//  {
//    id: "3",
//    nome: "Nina da Hora",
//    imagem: "https://bit.ly/3FKpFaz",
//   minibio: "Hacker antirracista",
//  },
//]; 


// GET
// acrescentou async no código
// function mostraMulher(request, response)
async function mostraMulheres(request, response){
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  } catch (erro) {
      console.log(erro)
  }

  // 2 response.json() 

// function mostraMulheres(request, response) {
//  response.json(mulheres);
}

//POST 
// acrescentou async no código
// function criaMulher(request, response) { 
  async function criaMulher(request, response) {
 // substitui: const novaMulher = { por:
    const novaMulher = new Mulher({
    // apagou a linha d codigo abaixo e acima no uuid:
    // id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao  

  })
// apagou as linhas abaixo e acresntou try; catch:
//  mulheres.push(novaMulher);
//  response.json(mulheres);
  try {
    const mulherCriada = await novaMulher.save()
    resonse.status(201).json(mulherCriada)
  } catch (erro) {
    console.log(erro)
  }
}

// PATCH
// acrescentou async no código
// function corrigeMulher (request, response) {
  async function corrigeMulher (request, response) {
      // apaga o código anterior:
  // function encontraMulher(mulher) {
  //  if (mulher.id === request.params.id) {
  //    return mulher
  //  }
  //} trouxe os códigos que estavam abaixo e acresentu o if para citação
    try {
      const mulherEncontrada = await Mulher.findOyId(request.params.id)
      if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
      }
      if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
      }
      if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
      } 
      if (request.body.citacao) {
        mulherEncontrada.citacao = request.body.citacao
      } 
      // acrescentou a constante abaixo e trouxe da parte final do PATCH a response:
      const mulheresAtualizadasNoBancoDeDados = await mulhereEncontrada.save()

      response.json(mulheres)

    } catch (erro) {
      console.log(erro)
    }
// apagou o código seguinte:
//  const mulherEncontrada = mulheres.find(encontraMulher)
// E recortou para o try, os seguintes:
// if (request.body.nome) {
//    mulherEncontrada.nome = request.body.nome
//  }
//  if (request.body.minibio) {
//    mulherEncontrada.minibio = request.body.minibio
//  }
//  if (request.body.imagem) {
//    mulherEncontrada.imagem = request.body.imagem
//  } 
// também leva o código abaixo para o código try
// response.json(mulheres)
}

// DELETE
  function deletaMulher(request, response) {
    function todasMenosEla(mulher) {
      if(mulher.id !== request.params.id) {
        return mulher
      }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
  }




app.use(router.get("/mulheres", mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post("/mulheres", criaMulher)) // configurei rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)) // configurei a rota patch/ mulheres:id
app.use(router.delete("/mulheres/:id", deletaMulher)) // configurei a rota delete

//PORTA
function mostraPorta() {
  console.log("servidor criado e rodando na porta ", porta);
}

app.listen(porta, mostraPorta); // servidor ouvindo a porta
