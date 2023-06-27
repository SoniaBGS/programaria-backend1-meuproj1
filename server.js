const express = require ("express")

const app = express ()
const porta = 3333

function mostraPorta() {

    console.log ("servidor criado e rodando na porta ", porta);
}

// mostraPorta()//

  //pos escrita dede const porta a mostraPorta() linha 10, acrescentamos ao inicio do codigo 
  //const express = require ("express") e const express = express()// 


  app.listen(porta, mostraPorta)

