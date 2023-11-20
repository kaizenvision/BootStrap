import { useState } from 'react'
class TodoServices{

    getAllTodos (params)  {
            const [listTodos, setResponse] = useState([]);
            fetch('http://localhost:8080/todos').then(res => res.json()).then(res => setResponse(res));
            return listTodos;
        }

     addTodo(todo){
        
     }  

    }
export default new TodoServices()