const express = require("express")

const router = express.Router()

let rooms = [
  {
    id: 1,
    name: "Predio 42 - Sala 20",
    hasProjector: true,
  }
]

router.get("/rooms", (req, res) => {
  res.send(rooms)
})

router.get("/rooms/:id", (req, res) => {
  const room = rooms.find(b => b.id === Number(req.params.id))
  if(room === undefined) {
    res.status(404).send("Room not found")
  }
  res.json(room)
})

router.post("/rooms", (req, res) => {
  const newRoom = {
    id: rooms.length+1,
    ...req.body
  }

  rooms.push(newRoom)

  res.status(201).json(newRoom) 
})

router.put("/rooms/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
  }

  const roomIdx = rooms.findIndex((i) => i.id === idAsNumber)
  if(roomIdx === -1){
    res.status(404).send("Room not found")
  }

  const room = rooms[roomIdx]

  const updatedRoom = {
    ...room,
    ...req.body
  }

  rooms[roomIdx] = updatedRoom
  res.json(updatedRoom)
})

router.delete("/rooms/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
  }

  rooms = rooms.filter((elemento) => elemento.id !== idAsNumber)
  res.status(202).json({ id: req.body.id })
})

module.exports = {
  roomsRouter: router,
  rooms
}