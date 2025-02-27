const express = require('express')
const app = express()
require('dotenv').config()

// Configure
const port = process.env.PORT || 5000
const apiPrefix = '/api/v1'
app.use(express.json()) // req.body

// Add routes
const productsRouter = require('./routes/products')

app.use(apiPrefix + '/products', productsRouter)

// Init db
const initializeDb = require('./configs/database')
initializeDb()

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
})