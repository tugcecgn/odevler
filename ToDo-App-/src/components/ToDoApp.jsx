import React, { useState } from "react";
import './ToDoApp.css'

function ToDoApp(){
    const[list,setList]=useState([]);
    const[inputValue,setInputValue]=useState("");
    const [filter, setFilter] = useState("all");


    const handleListItem=(e)=>{
        if(e.key === "Enter"&& inputValue.trim() !==""){
        e.preventDefault();
        setList((prev)=>[...prev,{text: inputValue, completed:false}]); 
        setInputValue(""); 
    }
}
const toggleComplete=(index)=>{
    setList((prev)=>prev
    .map((item,i)=>i===index?
    {...item, completed:!item.completed}:item  
))
}

const deleteItem=(index)=>{
    setList((prev)=>prev.filter((_,i)=>i!==index));
}


const filteredList = list.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
});

const visibleLength= list.filter((item)=>!item.completed)

const clearCompleted = () => {
    setList((prev) => prev.filter((item) => !item.completed));
};

    return(
        <>
<section className="todoapp">
	<header className="header">
		<h1>todos</h1>
		<form>
			<input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus 
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            onKeyDown={handleListItem}
            />
		</form>
	</header>
	
	<section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>

		<ul className="todo-list">
            {filteredList.map((item,index)=>(
                 <li key={index}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                    checked={item.completed}
                    onChange={()=>toggleComplete(index)}/>
                    <label className={item.completed ? "completed":""}>{item.text}</label>
                    </div>
                    <button className="destroy"
                    onClick={()=>deleteItem(index)}
                    ></button>
			</li>
            ))}
				
		</ul>
	</section>

	<footer className="footer">
		<span className="todo-count">
			<strong>
                {visibleLength.length+" "}
                </strong>
			 items left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className={filter === "all" ? "toggle-all" : ""}
                onClick={() => setFilter("all")}>All</a>
			</li>
			<li>
				<a href="#/" className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}>Active</a>
			</li>
            
			<li>
				<a href="#/" className={filter === "completed" ? "completed" : ""}
                onClick={() => setFilter("completed")}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed"
        onClick={()=>clearCompleted()}>
			Clear completed
		</button>
	</footer>
</section>

<footer className="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
</>
    )
}
export default ToDoApp;