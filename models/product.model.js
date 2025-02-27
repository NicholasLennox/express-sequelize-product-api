module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('price');
                return parseFloat(rawValue);
            },
            validate: {
                isDecimal: true,
                min: {
                    args: [0],
                    msg: 'Price must be a positive number'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0,
            validate: {
                isInt: true,
                min: {
                    args: [0],
                    msg: 'Stock must be a positive number'
                }
            }
        },
        category: {
            type: DataTypes.STRING(25)
        }
    })
    // Associations
    Product.associate = (db) => {
        // None right now
        console.log('In product associate');
    }
    // Return
    return Product
}