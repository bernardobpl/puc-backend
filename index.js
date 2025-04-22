const express = require("express")
const cors = require("cors")

const port = 3000
const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.send("Oi eu sou o Bernardo")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// http://localhost:3000
// a porta é uma forma de criar multiplos servidores dentro da nossa máquina

// localhost - 127.0.0.1 - nossa máquina (computador, ou celular)

// DNS - tradutor de ID's na web
// www.google.com - 142.251.36.68

// matar algum processo no terminal - ctrl + c