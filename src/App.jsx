/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Search from "./components/Search"
import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm"

import "./App.css"
import ButtonRemoveAll from "./components/ButtonRemoveAll"



function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos')
    return storedTodos ? JSON.parse(storedTodos) : []
  })

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  
  const [sort, setSort] = useState("Asc")

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const changeCategory = (id) => {
    const task = todos.find((todo) => todo.id === id)

    if(task){
      let newCategory = prompt('Digite a nova categoria (Trabalho, Estudos ou Pessoal):')
      newCategory = newCategory.toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase());

      const categoryAccepted = ['Trabalho','Pessoal', 'Estudos']

      if(categoryAccepted.includes(newCategory)){
        setTodos((prevTodos) => 
          prevTodos.map((todo) => todo.id === id ? {...todo, category: newCategory} : todo)
        )
      }else{
        alert('Por favor, digite uma categoria válida: Trabalho, Pessoal ou Estudos.')
      }
    }
  }

  const addTodo = (text, category) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false
    }]

    setTodos(newTodos)
  }

  const removeAll = () => {
    setTodos([])
  }

  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null)
    setTodos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }
  

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className="todo-list">
        <ButtonRemoveAll
         removeAll={removeAll}/>
        {todos
          .filter((todo) => {
            if (filter === 'All') {
              return true;
            } else if (filter === 'Completed') {
              return todo.isCompleted;
            } else if (filter === 'Incomplete') {
              return !todo.isCompleted;
            } else { 
              return todo.category === filter;
            }})
        .filter((todo) => todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        .sort((a,b) => sort === "Asc" 
        ? a.text.localeCompare(b.text) 
        : b.text.localeCompare(a.text)
        )
        .map((todo) =>(
          <Todo key={todo.id} 
          todo={todo} 
          removeTodo={removeTodo} 
          completeTodo={completeTodo}
          changeCategory={changeCategory}
          />
        ))}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>
  )
}

export default App
