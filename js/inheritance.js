/**
 * [ES5 提供的方法, 新对象 = Object.create(原型对象)]
 * @param  {[object]} obj [原型对象]
 * @return {[object]}     [新对象]
 * usage:
 *      var newObj = create({
            name: 'jim'
        });
        console.log(newObj);
 */
var create = function(obj) {
    if (Object.create) {
        return Object.create(obj);
    } else {
        function F() {};
        F.prototype = obj;
        return new F();
    }
};


/**
 * 1 组合继承
 * 构造函数内父类apply/call
 * prototype指向父类
 */
// 基类 人
var Person = function(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
    constructor: Person,
    say: function() {
        console.log('Hello Everyone!');
    }
};

// 学生类  继承自人
var Student = function(name, age, lesson) {
    // Person.call(this, name, age);
    Person.apply(this, arguments);
    this.lesson = lesson;
};
Student.prototype = new Person();
Student.prototype.constructor = Student;
Student.prototype.getTeacher = function() {
    console.log("Mr Zhang");
};

// 教师类  继承自人
var Teacher = function(name, age, subject) {
    // Person.call(this, name, age);
    Person.apply(this, arguments);
    this.subject = subject;
};
Teacher.prototype = new Person();
Teacher.prototype.constructor = Teacher;
Teacher.prototype.teach = function() {
    console.log('programming');
};


//使用
var wang = new Student('wang', 20, 'javascript');
var li = new Student('li', 30, 'c#');
console.log(wang.name);  //wang
console.log(wang.age);  //20
console.log(wang.lesson);   //javascript
wang.say(); //Hello Everyone!
console.log(li.name);   //li
li.say();   //Hello Everyone!
console.log(wang.say === li.say);  //true
console.log(wang.getTeacher === li.getTeacher);  //true

var zhang = new Teacher('zhang', 25, 'java');
console.log(zhang.name);  //zhang
console.log(zhang.age);  //25
console.log(zhang.subject);  //java
zhang.say();  //Hello Everyone!
console.log(zhang.say === wang.say); //true

/**
 * 组合继承案例，计算不同形状周长
 */
var Shape = function(name) {
    this.name = name;
};
Shape.prototype = {
    constructor: Shape,
    getName: function() {
        return this.name;
    },
    perimeter: function() {}
};

var Rectangle = function(length, width) {
    Shape.call(this, name);
    // this.name = name;
    this.name = '矩形';
    this.length = length;
    this.width = width;
};
Rectangle.prototype = new Shape();
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.perimeter = function() {
    return (this.length + this.width) * 2;
};

//好处
//以后新增一个计算其他形状的需求,不用修改原来的代码,只需要扩充即可.
//新增一个正方形
var Square = function(length) {
    Shape.call(this, name);
    this.name = '正方形';
    this.length = length;
};
Square.prototype = new Shape();
Square.prototype.constructor = Square;
Square.prototype.perimeter = function() {
    return this.length * 4;
};

//新增一个圆形
var Circle = function(radius) {
    Shape.call(this, name);
    this.name = '圆形';
    this.radius = radius;
};

//重写计算周长的方法
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
Circle.prototype.perimeter = function() {
    //圆的周长=2×圆周率×半径 或 圆周率×直径
    return 2 * Math.PI * this.radius;
};

//使用对象 封装
function computePerimeter(shape) {
    alert(shape.getName() + '的周长是' + shape.perimeter());
}

//组装世界
//var rectangle = new Rectangle('矩形',10,20);
//computePerimeter(rectangle);

//去掉属性name
var rectangle = new Rectangle(10, 20);
computePerimeter(rectangle);

//正方形
var square = new Square(10);
computePerimeter(square);

//圆形
var circle = new Circle(10);
computePerimeter(circle);
