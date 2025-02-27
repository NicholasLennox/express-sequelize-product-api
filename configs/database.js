const db = require('../models')

async function initializeDb() {
    try {
        await db.sequelize.sync({ force: true })
        await populateDb()
    } catch (error) {
        console.error(error);
    }
}

async function populateDb() {
    try {
        await db.Product.bulkCreate([
            { name: 'Electric Drill', price: 99.90, stock: 30, category: 'Tools' },
            { name: 'Laptop Stand', price: 45, stock: 100, category: 'Office' },
            { name: 'Wireless Mouse', price: 25, stock: 200, category: 'Electronics' },
            { name: 'Gaming Keyboard', price: 80, stock: 50, category: 'Electronics' },
            { name: 'Desk Lamp', price: 20, stock: 150, category: 'Home' },
            { name: 'Ceramic Mug', price: 10, stock: 300, category: 'Kitchen' },
            { name: 'Blender', price: 60, stock: 25, category: 'Kitchen' },
            { name: 'Running Shoes', price: 120, stock: 15, category: 'Fashion' },
            { name: 'Smartphone', price: 699, stock: 5, category: 'Electronics' },
            { name: 'Water Bottle', price: 15, stock: 500, category: 'Outdoor' },
            { name: 'Yoga Mat', price: 35, stock: 40, category: 'Fitness' },
            { name: 'Headphones', price: 150, stock: 60, category: 'Electronics' },
            { name: 'Backpack', price: 55, stock: 75, category: 'Fashion' },
            { name: 'Notebook', price: 5, stock: 400, category: 'Office' },
            { name: 'Sofa', price: 500, stock: 10, category: 'Home' },
            { name: 'Coffee Table', price: 250, stock: 8, category: 'Home' },
            { name: 'Electric Kettle', price: 30, stock: 90, category: 'Kitchen' },
            { name: 'Bicycle', price: 300, stock: 12, category: 'Outdoor' },
            { name: 'Tent', price: 150, stock: 20, category: 'Outdoor' },
            { name: 'Winter Jacket', price: 200, stock: 25, category: 'Fashion' },
            { name: 'Screwdriver Set', price: 25, stock: 80, category: 'Tools' },
            { name: 'Painting Kit', price: 40, stock: 60, category: 'Hobbies' },
            { name: 'Board Game', price: 35, stock: 50, category: 'Hobbies' },
            { name: 'LED Light Bulbs', price: 10, stock: 200, category: 'Home' },
            { name: 'Waterproof Boots', price: 90, stock: 30, category: 'Fashion' }
        ])
    } catch (error) {
        console.error(error);
    }
}

module.exports = initializeDb