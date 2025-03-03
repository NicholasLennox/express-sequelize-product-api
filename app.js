const express = require('express')
const app = express()
require('dotenv').config()
const { ValidationError } = require('sequelize')
const createError = require('http-errors')
const jsend = require('jsend')

// Configure
const port = process.env.PORT || 5000
const apiPrefix = '/api/v1'
app.use(express.json()) // req.body
app.use(jsend.middleware)

// Add routes
const productsRouter = require('./routes/products')
const ordersRoute = require('./routes/orders')

app.use(apiPrefix + '/products', productsRouter)
app.use(apiPrefix + '/orders', ordersRoute)

// Init db
const initializeDb = require('./configs/database')
initializeDb()

// Global error handler
app.use((err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).jsend.fail(err.errors.map(err => err.message))
    }

    if(createError.isHttpError(err)) {
        return res.status(err.statusCode).jsend.fail([err.message])
    }

    res.status(500).jsend.error(err.message)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
})