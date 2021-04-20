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
  const [inProgresId,setInprogresId]=useState([])
  const [inProgresList,setInprogresList]=useState([])
  const [doneId, setDoneId]= useState([])
  const [doneList, setDoneList]= useState([])
  
  const getSingleTodo = (id) => {
    const singleTodo = [...todos]
    const filteredSingleTodo = singleTodo.filter(todo => todo.id === id)
    setSingleTodos(filteredSingleTodo)
  }
  
  const createLeftMenu = (todoList, url) => {
        return (
      todoList.map(item => (
        <Link onClick={() => getSingleTodo(item.id)} key={item.title} to={`/${url}/item${item.id}`}><p className={inProgresId.includes(item.id)?'link yellow colorRed': doneId.includes(item.id)?'link green colorYellow':'link'}>{item.title}</p></Link>
      ))
    )
  }
  
  const renderTodos = (todoArray) => {
    const oninProgres=(id)=>{
      const newId=[...inProgresId]
      newId.push(id)
      setInprogresId(newId)
      const filteredInProgresList=todos.filter(todo=>todo.id===id)
      const newInProgresList=[...inProgresList]
      filteredInProgresList.map(item=>newInProgresList.push(item))
      setInprogresList(newInProgresList)
      setDoneList(doneList.filter(todo=>todo.id!==id))
      setDoneId(doneId.filter(todo=>todo!==id))
    }
    const onDone=(id)=>{
      const newId=[...doneId]
      newId.push(id)
      setDoneId(newId)
      const filteredDoneList=todos.filter(todo=>todo.id===id)
      const newDoneList=[...doneList]
      filteredDoneList.map(item=>newDoneList.push(item))
      setDoneList(newDoneList)
      setInprogresList(inProgresList.filter(todo=>todo.id!==id))
      setInprogresId(inProgresId.filter(todo=>todo!==id))
    }
    const deleteitem=(id)=>{
      setTodos(todos.filter(todo=>todo.id!==id))
      setInprogresList(inProgresList.filter(todo=>todo.id!==id))
      setDoneList(doneList.filter(todo=>todo.id!==id))

    }
    return (
      todoArray.map(todo => (
        <div key={todo.id} className='renderTodos'>
          <div className='button'>
            <button onClick={()=>deleteitem(todo.id)}  className='red'>Delete</button>
            {!inProgresId.includes(todo.id)&&<button onClick={()=>oninProgres(todo.id)} className='yellow'>InProgres</button>}
            {!doneId.includes(todo.id)&&<button onClick={()=>onDone(todo.id)} className='green'>Done</button>}
            
          </div>
          <div id={todo.id}  className={inProgresId.includes(todo.id)?'yellow singleTodoContent': doneId.includes(todo.id)?'singleTodoContent green':'singleTodoContent' }>
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
      singleTodos,
      inProgresList,
      doneList
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
          <Header Context={TodoContext} />
          <Switch>
            <Route path='/todolist'>
              <ToDoList Context={TodoContext} />
            </Route>
            <Route path='/createToDo'>
              <CreateToDo Context={TodoContext} />
            </Route>
            <Route path='/inProgres'>
              <InProgres Context={TodoContext} />
            </Route>
            <Route path='/done'>
              <Done Context={TodoContext}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </TodoContextProvider>
  )
}
export default App;