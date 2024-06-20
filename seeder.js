import Product from './models/product.js';
import db from './db.js';

await db.connect();
await Product.deleteMany({});

const colors = ["Red", "Green", "Blue"];
const items = ["Hat", "Shoe"];

const productsArray = [];
for (let i = 0; i < 10; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const item = items[Math.floor(Math.random() * items.length)];
    const name = `${color} ${item}`;

    const price = Math.floor(Math.random() * 100) + 1;
    productsArray.push({ name, price })
}

const products = await Product.insertMany(productsArray);
console.log('Seeded products', products.length);

await db.close();