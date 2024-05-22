export class Person {
 //public name:string
 //public address:string

 constructor(
    public name:string,
    public lastName:string,
    private address:string = 'No address') {
        //this.name = name;
        //this.address = address;
 }

}


/* export class Hero extends Person {
    constructor(
        public alterEgo:string, 
        public age:number,
        public realName:string){
        super(realName, 'New York');
    }
} */

export class Hero {
    //public person:Person;
    constructor(
        public alterEgo:string, 
        public age:number,
        public realName:string,
        public person:Person
        ){
            //this.person = new Person(realName);
    }
}

const peter = new Person('Peter','Parker', 'New York');
const ironman = new Hero( 'Tony Stark',45, 'Tony', peter);
console.log(ironman);
