module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        // id, status, totalPrice, invoiceEmail
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled'),
            defaultValue: 'pending'
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        invoiceEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invoice email must be a valid email address!'
                },
                notNull: {
                    args: true,
                    msg: 'Must supply an invoice email'
                }
            }
        }
    })
    // Associations
    Order.associate = (db) => {
        // Setup M:M with product
        db.Order.belongsToMany(db.Product, { through: 'OrderProducts' })
    }
    // Return order out
    return Order
}