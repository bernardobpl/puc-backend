const express = require("express")

const router = express.Router()

let users = [
  {
    id: 1,
    name: "Bernardo",
    email: "bernardobpl97@gmail.com"
  }
]

router.get("/users", (req, res) => {
  res.send(users)
})

router.get("/users/:id", (req, res) => {
  const user = users.find(b => b.id === Number(req.params.id))
  if(user === undefined) {
    res.status(404).send("User not found")
  }
  res.json(user)
})

router.post("/users", (req, res) => {
  const newUser = {
    id: users.length+1,
    ...req.body
  }

  users.push(newUser)

  res.status(201).json(newUser) 
})

router.put("/users/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
  }

  const userIdx = users.findIndex((i) => i.id === idAsNumber)
  if(userIdx === -1){
    res.status(404).send("User not found")
  }

  const user = users[userIdx]

  const updatedUser = {
    ...user,
    ...req.body
  }

  users[userIdx] = updatedUser
  res.json(updatedUser)
})

router.delete("/users/:id", (req, res) => {
  const id = req.params.id
  const idAsNumber = Number(id) // NaN

  if(Number.isNaN(idAsNumber)) {
    res.status(400).json("Id is not a number")
  }

  users = users.filter((elemento) => elemento.id !== idAsNumber)
  res.status(202).json({ id: req.body.id })
})

module.exports = {
  usersRouter: router,
  users
}