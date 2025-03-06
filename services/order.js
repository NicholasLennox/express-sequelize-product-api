const createError = require('http-errors')

class OrderService {
    constructor(db) {
        this.db = db;
        this.orders = db.Order
    }

    async getAll() {
        return await this.orders.findAll({
            attributes: ['id', 'invoice_email', 'total_price', 'created_at'],
            include: {
                model: this.db.Product,
                attributes: ['id', 'name'],
                as: 'products', // Need 'as' in M:M belongsToMany 
                through: {
                    attributes: []
                }
            }
        })
    }

    async add(invoiceEmail, productIds) {
        const products = await this.db.Product.findAll({
            where: { id: productIds } // SQL: where id in productIds
        })

        const uniqueProductIds = [...new Set(productIds)]

        if(uniqueProductIds.length !== products.length) {
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