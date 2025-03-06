const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const jsend = require('jsend')
// Inject order service
const OrderService = require('../services/order')
const db = require('../models')
const orderService = new OrderService(db)
// Setup jsend middleware
router.use(jsend.middleware)

router.post('/', async (req,res, next) => {
    const { invoiceEmail, productIds } = req.body

    if(!Array.isArray(productIds) || productIds?.length === 0) {
        return next(createError(400, 'No products in order!'))
    }
    
    try {
        const result = await orderService.add(invoiceEmail, productIds)
        res.status(201).jsend.success(result)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const orders = await orderService.getAll()
        res.status(200).jsend.success({ statusCode: 200, result: orders })
    } catch (error) {
        next(error)
    }
})

module.exports = router