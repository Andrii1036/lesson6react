import React, { useContext } from 'react'
import style from './Done.module.css'
import { LeftBar } from '../LeftBar/LeftBar'
import { Route, Switch } from 'react-router'
export function Done({ Context }) {
    const {
        doneList,
        renderTodos,
        singleTodos
    } = useContext(Context)
    return (
        <div className={style.Done}>
            <LeftBar title='In Progres' Context={Context} todoList={doneList} url='done' />
            <Switch>
                <Route path='/done/:itemid'>
                    <div className={style.Todos}>
                        {renderTodos(singleTodos)}
                    </div>
                </Route>
                <Route>
                    <div className={style.Todos}>
                        {renderTodos(doneList)}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
export default Done;