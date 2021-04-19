// context+router

import React, { useState } from 'react'
import './App.css'
import { Header } from './Components/Header/Header'
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ToDoList } from './Components/ToDoList/ToDoList'
import { CreateToDo } from './Components/CreateToDo/CreateToDo'
import { InProgres } from './Components/InProgres/InProgres'
import { Done } from './Components/Done/Done'
import { createContext } from 'react'
const todoList = [
  { id: 1, title: 'Test title1', description: 'Test description1' },
  { id: 2, title: 'Test title2', description: 'Test description2' },
  { id: 3, title: 'Test title3', description: 'Test description3' },
  { id: 4, title: 'Test title4', description: 'Test description4' },
  { id: 5, title: 'Test title5', description: 'Test description5' },
  { id: 6, title: 'Test title6', description: 'Test description6' },
  { id: 7, title: 'Test title7', description: 'Test description7' },
  { id: 8, title: 'Test title8', description: 'Test description8' },
  { id: 9, title: 'Test title9', description: 'Test description9' },
]
const TodoContext = createContext();
const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(todoList)
  const [singleTodos, setSingleTodos] = useState([])
  const getSingleTodo = (id) => {
    const singleTodo = [...todos]
    const filteredSingleTodo = singleTodo.filter(todo => todo.id === id)
    setSingleTodos(filteredSingleTodo)
  }
  const createLeftMenu = (todoList) => {
    return (
      todoList.map(item => (
        <Link onClick={() => getSingleTodo(item.id)} key={item.title} to={`/todolist/item${item.id}`}><p className='link'>{item.title}</p></Link>
      ))
    )
  }
  const renderTodos = (todoArray) => {
    return (
      todoArray.map(todo => (
        <div className='renderTodos'>
          <div className='button'>
            <button  className='red'>Delete</button>
            <button className='yellow'>InProgres</button>
            <button className='green'>Done</button>
          </div>
          <div key={todo.id} className='singleTodoContent'>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        </div>
      ))
    )
  }
  const createTodoList = (newTodo) => {
    if (!newTodo || !newTodo.title || !newTodo.description) {
      return
    }
    setTodos([...todos, newTodo])
  }
  return (
    <TodoContext.Provider value={{
      todos,
      createTodoList,
      renderTodos,
      createLeftMenu,
      singleTodos
    }}>
      {children}
    </TodoContext.Provider>
  )
}
export function App() {
  return (
    <TodoContextProvider>
      <Router>
        <div className='Main'>
          <Header />
          <Switch>
            <Route path='/todolist'>
              <ToDoList Context={TodoContext} />
            </Route>
            <Route path='/createToDo'>
              <CreateToDo Context={TodoContext} />
            </Route>
            <Route path='/inProgres'>
              <InProgres />
            </Route>
            <Route path='/done'>
              <Done />
            </Route>
          </Switch>
        </div>
      </Router>
    </TodoContextProvider>
  )
}
export default App;