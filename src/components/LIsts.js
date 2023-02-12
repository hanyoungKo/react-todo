import React, { useState } from 'react'

const LIsts= React.memo(({provided, snapshot, id, title, completed, todoData, setTodoData, handleClick}) => {
    
    // state
    const [isEditing, setEditing] = useState(false);
    const [editeTitle, setEditeTitle] = useState(title);
    
    // 핸들링
    const handleCheck = (id)=>{
        let newTodoData = todoData.map((data)=>{
            if(data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData))
    }

    const handleEditeChange = (e) =>{
        setEditeTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let newTodoData = todoData.map((data)=>{
            if(data.id === id) {
                data.title = editeTitle;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
        
        setEditing(false);
       
    }

    if(isEditing){
        return (
            <div
            className={`
                 bg-gray-100 items-center w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
            <form 
            className='flex justify-between'
            onSubmit={handleSubmit}
            >
            <div className='items-center'>
                <input
                    type="text"
                    className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
                    value={editeTitle}
                    onChange={handleEditeChange}
                    />
            </div>
            <div>
                <input  
                    className='m-2'
                    type='submit'
                    value='save'
                />
                <button
                    className='px-4 py-2 border rounded-xl'
                    onClick={() => setEditing(false)}>X</button>
            </div>
            </form>
        </div>
        )     
    }else{
        return (
            <div
                key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging
                    ? "bg-gray-400"
                    : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
    
                <div className='items-center'>
                    <input
                        type="checkbox"
                        className='m-2'
                        checked={completed}
                        onChange={() => handleCheck(id)}/>
                    <span
                        className={completed
                            ? "line-through"
                            : "undefined"}>
                        {title}
                    </span>
                </div>
                <div className='items-center'>
                    <button 
                        className='m-2'
                        onClick={()=> setEditing(true)}
                    >edite</button>
                    <button
                        className='px-4 py-2 border rounded-xl'
                        onClick={() => handleClick(id)}>X</button>
                </div>
            </div>
        )
    }

   
});

export default LIsts