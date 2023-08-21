// import the pets array from data.js
import { find } from './data'

// init express app
import express from 'express'
const app = express()
import { query } from './db'

const PORT = 8080

// serve static index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// hello world route
app.get('/api', (req, res) => {
  res.send('Hello World!')
})

// get all pets from the database
app.get('/api/v1/pets', async (req, res) => {
  try {
    const allPets = await query('SELECT * FROM pets')
    res.status(200).json(allPets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// get pet by owner with query string
app.get('/api/v1/pets/owner', async (req, res) => {
  const ownerName = req.query.name
  try {
    const pet = await query('SELECT * FROM pets WHERE owner = $1', [ownerName])
    res.json(pet.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/v1/pets/owner', async (req, res) => {
  const owner = req.query.name
  try {
    const pet = await query('SELECT * FROM pets WHERE owner = $1', [owner])
    res.json(pet.rows)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})
// get pet by name

app.get('/api/v1/pets/:name', async (req, res) => {
  const name = req.params.name
  const pet = find(pet => pet.name === name)
  if (pet) {
    res.json(pet)
  } else {
    res.status(404).json({ error: 'Pet not found' })
  }
})

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}')
})

export default app
