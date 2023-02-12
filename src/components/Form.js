import React from 'react'

function Form({value, setValue, setTodoData, todoData}) {

// 핸들링
const handleChange = (e)=>{
    setValue(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    }

    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]))
    setValue("");
    
  }

  return (
    <div>
         <form style={{display:"flex"}} onSubmit={handleSubmit} className="flex pt-2">
                <input type="text" name= "value" style={{flex:'10', padding: '5px'}}
                  placeholder="해야 할 일을 입력하세요"
                  value={value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shdow"
                />
                <input className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200" type="submit" value="입력" />

            </form>
    </div>
  )
}

export default Form