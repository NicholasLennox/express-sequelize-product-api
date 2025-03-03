const { Op } = require('sequelize')

class ProductService {
    constructor(db) {
        this.db = db
        this.products = db.Product
    }

    async getAll(query) {
        const { name, price, sort, page, size } = query
        // Filters
        const nameCondition = name ? { name: { [Op.like]: `%${name}%` } } : null;
        const priceCondition = price ? { price: { [Op.lte]: price } } : null;
        const filterCondition = {[Op.and]: [nameCondition, priceCondition]};
        // Ordering
        const order = sort ? sort.split(',').map(pair => pair.split(':')) : []
        
        // Pagination
        const limit = size ? Number(size) : 10 
        const offset = page ? (page-1) * limit : 0;
        
        return await this.products.findAll({
            where: filterCondition,
            order,
            limit,
            offset
        })
    }

    async getById(id) {
        return await this.products.findOne({
            where: id
        })
    }

    async add(payload) {
        return await this.products.create({
            name: payload.name,
            price: payload.price,
            stock: payload.stock,
            category: payload.category
        })
    }
}

module.exports = ProductService