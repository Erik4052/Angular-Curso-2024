function addNumbers(a:number,b:number) {
    return a + b;
}

const addNumbers2 = (a:number,b:number):string => {
    return `${a + b}`;
}

function multiplyNumbers(a:number,b?:number, base:number = 1) {
    return a * base;
}

interface Character {
    pv:number;
    name:string;
    showPv:() => void;
}
const newCharacter:Character = {
    pv: 50,
    name: 'Strider',
    showPv() {
        console.log(`Pv: ${this.pv}`);
    },
    hp: 0,
    skills: []
}

const heal = (character:Character, amount:number) => {
    character.pv += amount;
}



const result = addNumbers(1,2);
const result2 = addNumbers2(1,2);
const result3 = multiplyNumbers(9);
heal(newCharacter, 20);
strider.showPv();
console.log(result, result2, result3);
