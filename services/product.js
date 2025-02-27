class ProductService {
    constructor(db) {
        this.db = db
        this.products = db.Product
    }

    async getAll() {
        return await this.products.findAll()
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