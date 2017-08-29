//tsc <tsfile> -w    to watch

let myString: String;
let myNum: Number;
let myBool: Boolean;
let myVar: any;

//Arrays can be instantiated with either
let strArr: String[];
//or
//let strArr: Array<String>

//has to match this exact order - if we add on to the array after this we can use any type
let strNumTuple: [String,Number];

myString = 'Hello World';
myNum = 22;
myBool = true;
myVar = 5;
myVar = true;

strArr = ['Hello', 'World'];

strNumTuple = ['Hello', 5, 45 , 'World'];

console.log(myString);
console.log(myNum);
console.log(strArr);

let myVoid: void = null;
let myNull: null = null;
let myUndefined: void = undefined;
console.log(myVoid);