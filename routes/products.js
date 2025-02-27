const express = require('express')
const router = express.Router()
// Inject service
const ProductService = require('../services/product')
const db = require('../models')
const { ValidationError } = require('sequelize')
const productService = new ProductService(db)

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAll()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id) // NaN

        if(!id) {
            return res.status(400).json({message: 'ID is in an invalid format'})
        }

        const product = await productService.getById(id)

        if(!product) {
            return res.status(404).json({message: `Product with ID ${id} does not exist`})
        }

        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = await productService.add(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        if(error instanceof ValidationError) {
            return res.status(400).json({message: error.errors.map(err => err.message)})
        }
        res.status(500).json({message: error.message})
    }
})


module.exports = router