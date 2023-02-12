import React,{useCallback, useState} from "react";
import "./App.css"
import List from "./components/List";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App(){
  
    // state 
    const [todoData, setTodoData] = useState(initialTodoData);
    const [value, setValue] = useState("");
   
    // 핸들링
    const handleClick = useCallback((id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData))
    },[todoData]);

    const removeAll_Click = ()=>{
      setTodoData([]);
      localStorage.setItem('todoData', JSON.stringify([]))
    }

    
      return(
       <div className="flex items-center justify-center  w-screen h-screen bg-blue-200">

          <div className="w-full p-6 m-4 bg-white rounded shadow-lg lg:w-3/5 lg:max-w-lg ">
  
            <div className="flex justify-between mb-3">
              <h1>할 일 목록</h1>
              <button onClick={removeAll_Click}>Delete All</button>
            </div>        
          <List todoData={todoData} setTodoData = {setTodoData} handleClick={handleClick}/>
          <Form value={value} setValue={setValue} setTodoData= {setTodoData} todoData={todoData}/>
          </div>
       </div>
      )
    
}



