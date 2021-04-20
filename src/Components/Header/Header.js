import React, { useContext } from 'react'
import style from './Header.module.css'
import {Link} from 'react-router-dom'
export function Header({Context}){
    const{
        todos,
        inProgresList,
        doneList
    }=useContext(Context)
    console.log(todos.length.toString())
    return(
        <header className={style.Header}>
            <Link to='/createToDo'>Create ToDo</Link>
            <Link to='/todolist'>ToDo List  <span>{todos.length.toString()}</span></Link>
            <Link to='/inProgres'>Inprogres  <span>{inProgresList.length.toString()}</span></Link>
            <Link to='/done'>Done  <span>{doneList.length.toString()}</span></Link>
        </header>
    )
}
export default Header;