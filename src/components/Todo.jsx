import React, { useEffect, useRef, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const data = useRef();

  const addTodos = () => {
    const inputText = data.current.value.trim();
    if (inputText === "") {
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      text: inputText,
      isComplete: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    data.current.value = "";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodos();
    }
  };

  const toggle = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="place-self-center bg-white w-[450px] h-[500px] p-12 flex flex-col gap-5 rounded-lg">
      <h1 className="text-3xl font-bold tracking-wider flex items-center gap-2">
        <FaClipboardList /> Todo App
      </h1>
      <div className="flex items-center bg-[#EEEEEE] p-2 rounded-full">
        <input
          ref={data}
          type="text"
          className="border-none outline-none p-1 flex-1 bg-transparent placeholder:text-slate-400"
          placeholder="Yeni bir görev gir..."
          onKeyDown={handleKeyDown} // Enter tuşuna basılınca görev ekleme fonksiyonunu çağırır
        />
        <GoPlusCircle
          className="size-8 text-slate-400 cursor-pointer"
          onClick={addTodos}
        />
      </div>
      <div className="mt-5">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggle={toggle}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
