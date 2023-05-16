import React from "react";
import {
  useDeleteTodoMutation,
  useMarkTodoMutation,
} from "../store/services/todo";

function TodoList({ item, refetch }) {
  //delete todo
  const [deleteTodo] = useDeleteTodoMutation();

  // mark todo as done
  const [markTodo] = useMarkTodoMutation();

  async function markTodoAsDone() {
    const payload = {
      _id: item?._id,
      status: !item?.status,
    };
    await markTodo(payload);
    refetch();
  }

  const handleChange = () => {
    markTodoAsDone();
  };

  async function deleteHandle() {
    await deleteTodo(item?._id);
    refetch();
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-0 sm:justify-between py-2 px-5 sm:items-center rounded-lg ${
        item?.status ? "bg-blue-400" : "bg-slate-100"
      } shadow-lg  mb-[1rem]`}
    >
      <div className="flex gap-5 items-center">
        <input
          onChange={handleChange}
          defaultChecked={item?.status}
          className="w-[1.4rem] h-[1.4rem] cursor-pointer"
          type="checkbox"
        />
        <p
          className={`capitalize ${
            item?.status && "line-through text-zinc-50"
          } text-[1rem] font-light px-5`}
        >
          {item?.title}
        </p>
      </div>
      <button
        onClick={deleteHandle}
        className="py-2 px-4 text-[1rem] text-[white] bg-[red] rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoList;
