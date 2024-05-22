export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Mia Khalifa'
};

const passenger2: Passenger = {
    name: 'Mia Khalifa',
    children: ['Mia Jr', 'Mia Jr 2']
};

const printChildren = (passenger: Passenger) => {
    console.log(passenger.children?.join(', ') || 'No tiene hijos');
}

printChildren(passenger1);