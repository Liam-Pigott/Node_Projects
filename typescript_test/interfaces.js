/*
function showTodo(todo: {title: string, text:string}){
    console.log(todo.title + ': ' + todo.text);
}

let myTodo = {title:'Typescript', text: 'Learn typescript'}

showTodo(myTodo);

*/
//cleaner and re-useable unlike the above implementation
function showTodo(todo) {
    console.log(todo.title + ': ' + todo.text);
}
var myTodo = { title: 'Typescript', text: 'Learn typescript' };
showTodo(myTodo);
