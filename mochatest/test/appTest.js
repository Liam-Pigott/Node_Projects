//for standard node assert lib
// const assert = require('assert')

//instead we use chai below
const assert = require('chai').assert;

/*
    can define functions from app.js separately but much cleaner to just
    use the parent app reference then specify the function to test.
*/

const app = require('../app');
const sayHello = require('../app').sayHello;
const addNumbers = require('../app').addNumbers;

/* 
    nice to have global vars to avoid repeating when we need 
    to do more than one check on a function result.
    Also maintains consistency in checks when params are used.
*/
sayHelloResult = app.sayHello();
addNumbersResult = app.addNumbers(5,12);

describe('App',function(){
    describe('sayHello',function(){
        it('sayHello should return hello',function(){
            // let result = sayHello();
            assert.equal(sayHelloResult,'hello');
        });

        it('sayHello should return type string',function(){
            // let result = sayHello();
            assert.typeOf(sayHelloResult,'string');
        });
    });

    describe('addNumbers',function(){
        it('Add numbers should be > 5',function(){
            // let result = addNumbers(5,6);
            assert.isAbove(addNumbersResult,5);
        });

        it('Add numbers return type number',function(){
            // let result = addNumbers(5,6);
            assert.typeOf(addNumbersResult,'number');
        });
    });
});