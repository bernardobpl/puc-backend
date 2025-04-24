const express = require("express")
const { users } = require("./users.js")
const { rooms } = require("./rooms.js")

const router = express.Router()

let bookings = [ // vamos simular um banco de dados colocando os nossos dados dentro de variáveis
  {
    id: 1,
    authorId: 1, // refere a o id do usuario que criou
    roomId: 1, // refere a o id da sala reservada
    title: "Reserva de sala",
    startDate: "2023-10-01",
    endDate: "2023-10-02",
  }
]

router.get("/bookings", (req, res) => {
  res.send(bookings)
})

router.get("/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id === Number(req.params.id))
  if(booking === undefined) {
    res.status(404).send("Booking not found")
  }

  const author = users.find(u => u.id === booking.authorId)
  const room = rooms.find(r => r.id === booking.roomId)

  res.json({
    ...booking,
    author,
    room
  })
})

router.post("/bookings", (req, res) => {
  const newBooking = {
    id: bookings.length+1,
    ...req.body
  }

  bookings.push(newBooking)

  res.status(201).json(newBooking) 
})

router.put("/bookings/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
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

router.delete("/bookings/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
  }

  bookings = bookings.filter((elemento) => elemento.id !== idAsNumber)
  res.status(202).json({ id: req.body.id })
})

module.exports = {
  bookingsRouter: router
}