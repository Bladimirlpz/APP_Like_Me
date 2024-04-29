const {obtenerCard, agregarCard, deleteCard, modificarCard} = require('./consultas');
const express = require("express")
const cors = require("cors");
const app = express()

app.listen(3000, console.log("Servidor 3000 activo"))
app.use(cors())
app.use(express.json())

app.get("/posts", async (req, res) => {
  const cards = await obtenerCard()
  res.json(cards)
})

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body
    const postCard = await agregarCard(titulo, url, descripcion)
    if (titulo === "" || url === "" || descripcion === "" ){
      throw{
        code:500,
        message:"Campos vacios"
      }
    }
    res.json(postCard)    
  } catch (error) {
    res.status(error.code).json(error.message)
  }
    })

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params
  const modifyCard = await modificarCard(id)
  res.send("like agregado")
})

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const borrarCard = await deleteCard(id)
    if (borrarCard.rowCount===0){
      throw{
        code:404,
        message:`No se encontro el ID: ${id}`
      }
    }
    res.send("Registro eliminado con exito")
  } catch (error) {
    res.status(error.code).json(error.message)
  }
})