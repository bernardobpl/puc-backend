const express = require("express")
const cors = require("cors")

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

// express "use" - middleware - uma funçãoque fica no meio do caminho e roda antes de executar a função que resolve a requisição

// Protocol HTTP - métodos (tipos de requisição)
// MODELO REST - padrão de comunicação entre cliente e servidor
// GET - pegar dados
// POST - criar dados
// PUT - atualizar dados
// DELETE - deletar dados

// CRUD - create (POST), read (GET), update (PUT), delete (DELETE)

// Protocol HTTP - status da resposta
// tabela de status para consulta - https://serpwatch.io/wp-content/uploads/2022/02/HTTP-Status-Codes-Cheat-Sheet-pdf.pdf
// 200 - success
// 400 - bad request
// 404 - Not found
// 500 - system error

// validação de dados
// autenticação
// autorização


/* 
  id: number - string
  title: string
  authorId: id - number or string
  startDate: date - string
  endDate: date - string
*/

let bookings = [ // vamos simular um banco de dados colocando os nossos dados dentro de variáveis
  {
    id: 1,
    authorId: 1,

    title: "Reserva de sala",
    startDate: "2023-10-01",
    endDate: "2023-10-02",
  }
]

app.put("/bookings/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id)

  if(typeof idAsNumber === "number") {
    res.status(400).send(new Error("Id is not a number"))
  }

  const bookingIdx = bookings.findIndex((i) => i.id === idAsNumber)
  if(bookingIdx === -1){
    res.status(404).send("Booking not found")
  }

  const booking = bookings[bookingIdx]

  const updatedBooking = {
    ...booking,
    ...req.body
  }

  bookings[bookingIdx] = updatedBooking
  res.json(updatedBooking)
})

app.delete("/bookings/:id", (req, res) => {
  bookings = bookings.filter((elemento) => elemento.id !== req.params.id)
  res.status(202).json({ id: req.body.id })
})

app.post("/bookings", (req, res) => {
  const newBooking = {
    id: bookings.length+1,
    ...req.body
  }

  bookings.push(newBooking)

  res.status(201).json(newBooking) 
})

app.get("/bookings", (req, res) => {
  res.send(bookings)
})

app.get("/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id === Number(req.params.id))
  if(booking === undefined) {
    res.status(404).send("Booking not found")
  }
  res.json(booking)
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