const express = require('express')
const router = express.Router()
const jsend = require('jsend')
const createError = require('http-errors')
// Inject service
const ProductService = require('../services/product')
const db = require('../models')
const productService = new ProductService(db)
// Add jsend middleware
router.use(jsend.middleware)

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll(req.query)
        res.status(200).jsend.success(products)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id) // NaN

        if(!id) {
            return next(createError(400, 'ID is in an invalid format'))
        }

        const product = await productService.getById(id)

        if(!product) {
            return next(createError(404,`Product with ID ${id} does not exist`))
        }

        res.status(200).jsend.success([product])

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        throw new Error('something went wrong')
        const newProduct = await productService.add(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
})



module.exports = router