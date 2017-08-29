//tsc <tsfile> -w    to watch
var myString;
var myNum;
var myBool;
var myVar;
//Arrays can be instantiated with either
var strArr;
//or
//let strArr: Array<String>
//has to match this exact order - if we add on to the array after this we can use any type
var strNumTuple;
myString = 'Hello World';
myNum = 22;
myBool = true;
myVar = 5;
myVar = true;
strArr = ['Hello', 'World'];
strNumTuple = ['Hello', 5, 45, 'World'];
console.log(myString);
console.log(myNum);
console.log(strArr);
var myVoid = null;
var myNull = null;
var myUndefined = undefined;
console.log(myVoid);
