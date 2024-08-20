import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

const TodoItem = ({ todo, toggle, deleteTodo }) => {
  return (
    <div
      className="w-full flex items-center px-2 py-4 gap-2 border-b cursor-pointer select-none"
      onClick={() => toggle(todo.id)}
    >
      {todo.isComplete ? (
        <CiCircleCheck className="size-5" /> // Görev tamamlandıysa tik işareti
      ) : (
        <FaRegCircle className="size-5" /> // Tamamlanmadıysa boş daire
      )}

      <p className={`flex-1 ${todo.isComplete ? "line-through" : ""}`}>
        {todo.text}
      </p>
      <FaRegTrashAlt
        className="hover:scale-110 transition-all"
        onClick={(e) => {
          e.stopPropagation(); // Sil butonuna tıklandığında toggle çalışmasın
          deleteTodo(todo.id);
        }}
      />
    </div>
  );
};

export default TodoItem;
