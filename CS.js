class Person {
    constructor(name, age){
        this.name  = name;
        this.age = age;
    }
    showName(){
        console.log(this.name)
    }
    showAge(){
        console.log(this.age)
    }
    static add(x, y){
        return x + y
    }
}

class Student extends Person {
    constructor(name, age, career){
        super(name, age)
        this.career = career
    }
    showCareer(){
        console.log(this.career)
    }
}

let ts = new Student('z', 12, 'x')
ts.showAge()
ts.showName()
ts.showCareer()