import React, { useContext } from 'react'
import style from './LeftBar.module.css'
export function LeftBar({ title, todoList, Context, url }) {
    const {
        createLeftMenu
    } = useContext(Context)
    return (
        <div className={style.LeftBar}>
            <h3>{title}</h3>
            {todoList && createLeftMenu(todoList,url)}
        </div>
    )
}