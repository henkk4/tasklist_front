import { useState } from "react";


import './App.css';

function App() {
  const [taskText, setTaskText] = useState("");
  const [modText, setModText] = useState("");
  const [tasks, setTasks] = useState([]);

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      text: taskText,
      checked: false,
      modify: false
    }

    setTasks(tasks.concat(task));
    setTaskText("")
  }

  const handleDelete = ( item) => {
    const newArray = tasks.filter((task) => task.text !== item.text)
    setTasks(newArray)

    console.log(item)
    
  }
  const startModify = (item) => {
    const newArray = tasks.map((task) => {
      if(task.text === item.text) {
        task.modify = true
        return task
      }
      else {
        return task
      }
    })
    setModText(item.text)
    setTasks(newArray)
  }
  const handleModify = (item) => {
    const newArray = tasks.map((task) => {
      if(task.modify) {
        task.text = modText
        task.modify = false
        return task
      }
      else {
        return task
      }
    })
    setTasks(newArray)
  }
  const handleCheck = (item) => {
    const newArray = tasks.map((task) => {
      if(task.text === item.text) {
        task.checked = !task.checked
        return task
      }
      else {
        return task
      }
    })
    setTasks(newArray)
    console.log(newArray)
  }

  const getTasks = () => {
    fetch('https://tasklistfunction111.azurewebsites.net/api/httptrigger1')
        .then(response => response.json())
        .then(data => setTasks(data));
  }


  return (
    <div className="App">
      <h1>TO-DO_LIST</h1>

      <button onClick={getTasks}>Get tasks from server</button>

      <form onSubmit={handleSubmit}>
      <label>Enter new task:
        <input 
          type="text" 
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </label>
      
      <input type="submit" />
      </form>


      <div>
        <ol>
          {tasks.map((item, i) => 
            <li key={i}>
              {item.modify ? 
                <form onSubmit={() => handleModify(item)}>
                  <input 
                    type="text"
                    value={modText}
                    onChange={(e) => setModText(e.target.value)}>
                    
                  </input>
                  <input type="submit" />
                </form>
                 :
                <p>{item.text}</p>}
              
              <button onClick={() => handleDelete(item)}>Delete</button>
              <button onClick={() => startModify(item)}>Modify</button>
              <label>
              <input 
                type="checkbox"
                value={item.checked}
                onChange={() => handleCheck(item)} />
                Done
              </label>
            </li>)}
        </ol>
        
      </div>
    </div>
  );
}

export default App;
