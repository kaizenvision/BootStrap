import styles from './ListOfTodos.module.css'
import { useState, useEffect } from 'react'
import TodosServices from './TodosServices';

const ListOfTodos = () => {

    const [listTodos, setTodo] = useState([]);
    useEffect(() => {

        fetch('http://localhost:8080/todos').then(res => res.json()).then(res => setTodo(res));
    }, []);

    function deleteTodo(todoid) {

        console.log('delete button clicked...' + todoid);
        //setResponse(listTodos.po)             
        fetch(`http://localhost:8080/deletetodo/${todoid}`).then(res => res.json()).then(res => setTodo(res))
    }

    const handleOnkeyDown = (event) => {
        let description = event.target.value;
        //  console.log(description);
        if (event.key === 'Enter') {
            fetch('http://localhost:8080/addtodo', {
                method: 'POST',
                body: JSON.stringify({
                    id: 5, description: description, isCompleted: false, completionDate: new Date()
                })
                ,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(res => res.json()).then(res => setTodo(res))
        }
    }
    return (
        <>

            <div className="container text-center">
                <div className="row">
                    <div className="col">Add Todo</div>
                    <div className="col">Description</div>
                    <div className="col">Is Completed</div>
                    <div className="col">Complition Date</div>
                    <div className="col">Action</div>
                </div>

                {listTodos.map((e) =>
                    <>
                        <div className="row">
                            <div className='col'><input type='text' placeholder='add todo here' onKeyDown={handleOnkeyDown}></input></div>
                            <div className="col">{e.description}</div>
                            <div className="col">{e.completed.toString()}</div>
                            <div className="col">{e.completionDate.toString()}</div>
                            <div className='col'><button onClick={() => deleteTodo(e.id)} className={styles.button}>Delete</button></div>

                        </div>
                    </>
                )}

            </div>
        </>
    );
}
export default ListOfTodos;