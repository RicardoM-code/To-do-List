

const Todo = ({todo, removeTodo, completeTodo, changeCategory}) => {
  return (
    <div>
        <div className="todo" style={{textDecoration: todo.isCompleted ? "line-through" : ""}}>
            <div className="content">
                <p className="todo-text">{todo.text}</p>
                <p className="category">{todo.category}</p>
            </div>
            <div>
                <button className='complete' onClick={() => completeTodo(todo.id)}>Completar</button>
                <button onClick={() => changeCategory(todo.id)}>Mudar Categoria</button>
                <button className='remove' onClick={() => removeTodo(todo.id)}>X</button>
            </div>
        </div>
    </div>
    )
}

export default Todo