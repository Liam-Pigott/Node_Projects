/*
function showTodo(todo: {title: string, text:string}){
    console.log(todo.title + ': ' + todo.text);
}

let myTodo = {title:'Typescript', text: 'Learn typescript'}

showTodo(myTodo);

*/

interface Todo{
    title: string,
    text: string
}

//cleaner and re-useable unlike the above implementation
function showTodo(todo: Todo){
    console.log(todo.title + ': ' + todo.text);
}

let myTodo = {title:'Typescript', text: 'Learn typescript'}

showTodo(myTodo);