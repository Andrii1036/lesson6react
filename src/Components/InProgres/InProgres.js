import React, { useContext } from 'react'
import style from './InProgres.module.css'
import {LeftBar} from '../LeftBar/LeftBar'
import { Route, Switch } from 'react-router';
export function InProgres({Context}){
    const{
        renderTodos,
        inProgresList,
        singleTodos,
    }=useContext(Context)
    return(
        <div className={style.InProgres}>
            <LeftBar title='In Progres' Context={Context} todoList={inProgresList} url='inProgres'/>
            <Switch>
                <Route path='/inProgres/:itemid'>
                    <div className={style.Todos}>
                        {renderTodos(singleTodos)}
                    </div>
                </Route>
                <Route>
                    <div className={style.Todos}>
                        {renderTodos(inProgresList)}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
export default InProgres;