const express = require("express")
const cors = require("cors")
const { bookingsRouter } = require("./routes/bookings.js")
const { roomsRouter } = require("./routes/rooms.js")
const { usersRouter } = require("./routes/users.js")

// const objeto = { prop1: 1, prop2: "a" }
// const { prop2 } = objeto

// http://localhost:3000/bookings/5?minhaQuery=algumValor
// req.params - req.body - req.query

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

// routers
app.use(bookingsRouter)
app.use(roomsRouter)
app.use(usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})