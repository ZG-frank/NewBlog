class Person {
    constructor() {
        this.name = "test";
    }
    
    sayName() {
        console.log(`my name is ${this.name}`);
    }

    add(text = "Hello world") {
        const element = document.createElement("div");

        element.innerHTML = text;

        document.body.appendChild(element);
    }
}

var p = new Person();
p.sayName();
p.add();
