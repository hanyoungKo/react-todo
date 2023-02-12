import React from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import LIsts from './LIsts';

const List = React.memo(({todoData, setTodoData, handleClick}) => {

    // 핸들링
    
    const handleEnd = (result)=>{
        
        //console.log(result)
       
        if(!result.destination) return;
        
        const newTodoData = [...todoData];
        
        const [reorderItem] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0 ,reorderItem);

        setTodoData(newTodoData); 
        
        localStorage.setItem('todoData', JSON.stringify(newTodoData));

       
        
    }

   

    return (
    <div>
    <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='to-dos'>
            { (provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoData.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                    {(provided, snapshot) => (
                    <LIsts
                        key={data.id}
                        provided={provided}
                        snapshot={snapshot}
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        handleClick={handleClick}
                        />

                    )}
                </Draggable>
                ))} {provided.placeholder}
            </div>
            )}
        </Droppable>
    </DragDropContext>
    </div>

    )
});

export default List