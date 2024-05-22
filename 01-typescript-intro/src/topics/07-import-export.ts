import { Product, taxCalculation } from "./06-function-destructuring";

const shoppingCart:Product[] = [
    {
        description: 'Samsung Galaxy S9',
        price: 500
    },
    {
        description: 'iPad',
        price: 800
    }
];      


const [total, taxTotal] = taxCalculation({tax: 1.55, products: shoppingCart});


console.log('Total', total);
console.log('Tax', taxTotal);
