export interface Product {
    description: string;
    price: number;
}

const phone: Product= {
    description: 'Samsung Galaxy S9',
    price: 500
};

const tablet: Product = {
    description: 'iPad',
    price: 800
};

interface taxCalculationOptions {
    tax: number;
    products: Product[];
}

export function taxCalculation(options:taxCalculationOptions):[number, number] {
    const {tax, products} = options;
    let total = 0;
    products.forEach(({price}) => {
        total += price;
    });

    return [total, total * tax]; 
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

const [total, taxTotal] = taxCalculation({tax, products: shoppingCart});

//console.log(`Total: ${result[0]}, Tax: ${result[1]}`);
console.log('Total', total);
console.log('Tax', taxTotal);
