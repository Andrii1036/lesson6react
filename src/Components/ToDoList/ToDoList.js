import React, { useContext } from 'react'
import style from './ToDoList.module.css'
import { LeftBar } from '../LeftBar/LeftBar'
import { Route, Switch } from 'react-router'
export function ToDoList({ Context }) {
    const {
        renderTodos,
        todos,
        singleTodos,
    } = useContext(Context)
    return (
        <div className={style.ToDoList}>
            <LeftBar title='Todo List' todoList={todos} Context={Context} url='todolist'/>
            <Switch>
                <Route path='/todolist/:itemid'>
                    <div className={style.Todos}>
                        {renderTodos(singleTodos)}
                    </div>
                </Route>
                <Route>
                    <div className={style.Todos}>
                        {renderTodos(todos)}
                    </div>
                </Route>
            </Switch>


        </div>
    )
}
export default ToDoList;