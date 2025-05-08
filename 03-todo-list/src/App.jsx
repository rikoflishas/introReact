import { useState } from 'react'
import ToDoItem from './components/ToDoItem'
import './App.css'

function App () {
  /* 1. Cre el estado donde guardare la informacion del input */
  const [inputValue, setInputValue] = useState('')

  /* 4. Creo un nuevo estado para manejar la lista de tareas */
  const [todoList, setTodoList] = useState([])

  /* 3. Creo una función que se ejecuta cuando se hace click al boton agregar */
  /* 5. Modificar la función para que agregue la tarea a la lista */

  const handleAdd = () => {
    // console.log('Agregue: ', inputValue)
    setTodoList([...todoList, inputValue])
    setInputValue('')// limpiar el input despues de agregar la tarea
  }

  /* 6. Funcion que se ejecuta cuando se hace clic en eliminar */
  const deleteToDo = index => {
    setTodoList(todoList.filter((_, i) => i !== index))
  }

  return (
    <>
      <h1>To do List</h1>
      {/* 2. Usar un evento onChange para guardar la información del estado, apenas esta sea tecleada. La información del input la obtenemos de event.target.value */}
      <input
        type='text'
        placeholder='Escribe una tarea'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={handleAdd}>Agregar</button>
      {/* ul>li{item $}*3>button{Eliminar} */}
      <ul>
        {
        todoList.map((todo, index) => (
          <ToDoItem
            key={index}
            todoName={todo}
            handleDelete={() => deleteToDo(index)}
          />
        ))
      }
      </ul>
    </>
  )
}

export default App
/*
  <li>Item 1<button>Eliminar</button></li>
  <li>Item 2<button>Eliminar</button></li>
  <li>Item 3<button>Eliminar</button></li>
*/
