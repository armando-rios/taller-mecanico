import express from 'express'

const PORT = 3000

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  console.log("someone pinged here!!")
  res.send("pong!")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

})
