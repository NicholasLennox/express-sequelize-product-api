const createError = require('http-errors')

class OrderService {
    constructor(db) {
        this.db = db;
        this.orders = db.Order
    }

    async add(invoiceEmail, productIds) {
        const products = await this.db.Product.findAll({
            where: { id: productIds } // SQL: where id in productIds
        })

        if(productIds.length !== products.length) {
            throw createError(404, 'One or more products could not be found')
        }

        // Calculate total price
        const totalPrice = products.reduce((sum, product) => sum + product.price, 0)

        const newOrder = await this.orders.create({
            invoiceEmail,
            totalPrice
        })

        newOrder.addProducts(products)

        return newOrder;
    }
}

module.exports = OrderService