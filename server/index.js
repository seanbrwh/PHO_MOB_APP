require('dotenv').config()
const express = require('express')
const { sequelize } = require('./models')

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, Grimoire!')
})

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.info('Database synced successfully')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Database sync failed', { msg: err })
  })
