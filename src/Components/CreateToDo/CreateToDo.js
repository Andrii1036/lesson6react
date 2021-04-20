import React, { useContext, useState, } from 'react'
import style from './CreateToDo.module.css'
import { LeftBar } from '../LeftBar/LeftBar'
export function CreateToDo({ Context }) {
    const [ok, setOk] = useState(false)
    const [error, setError] = useState(false)
    const [toDoValue, setToDoValue] = useState({
        id: '',
        title: '',
        description: '',
    })
    const {
        createTodoList,
    } = useContext(Context)
    const TodoValueChange = ({ target: { value, name } }) => {
        setToDoValue({ ...toDoValue, [name]: value, id: new Date().toLocaleTimeString() })
    }
    const createTodoItem = () => {
        if (toDoValue.title && toDoValue.description) {
            setOk(true)
            setError(false)
        } else {
            setOk(false)
            setError(true)
        }
        createTodoList(toDoValue)
        setToDoValue({
            id: '',
            title: '',
            description: '',
        })
    }
    return (
        <div className={style.CreateToDo}>
            <LeftBar title='Create Todo item' Context={Context}/>
            <div className={style.MainContent}>
                {ok && <h2>Successfully</h2>}
                <h4>Title:</h4>
                <input
                    value={toDoValue.title}
                    onChange={TodoValueChange}
                    type='text'
                    name='title'
                    placeholder='Title for todo item'
                />
                <h4>Description:</h4>
                <textarea
                    value={toDoValue.description}
                    onChange={TodoValueChange}
                    cols='100'
                    rows='10'
                    name='description'
                    placeholder='Description for todo item'
                />
                <button className={error ? style.red : ''} onClick={createTodoItem}>Add to Todo List</button>
                {error&&<h3>The Title and Description fields are required</h3>}
            </div>
        </div>
    )
}
export default CreateToDo;