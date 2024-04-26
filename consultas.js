const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
})

const obtenerCard = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts;")
    return rows
  } catch (error) {
    console.log(error)
  }
}

const agregarCard = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999)
    const consulta =
      "INSERT INTO posts (id, titulo, img, descripcion, likes) values ($1, $2, $3, $4, $5);";
    const values = [id, titulo, url, descripcion, 0]
    const result = await pool.query(consulta, values)
}

const modificarCard = async (id) => {
  try {
    const consulta =
      "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1";
    const values = [id]
    const result = await pool.query(consulta, values)
    return result
  } catch (error) {
    console.log(error)
  }
}

const deleteCard = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1;"
  const values = [id]
  const result = await pool.query(consulta, values)
  return result
}
module.exports = { obtenerCard, agregarCard, deleteCard, modificarCard}
