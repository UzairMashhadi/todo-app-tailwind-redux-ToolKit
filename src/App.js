import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { useCreateTodoMutation, useGetTodoQuery } from "./store/services/todo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  title: yup.string().required("Title is required"),
});

function App() {

  // GET TODO
  const { data, error, isLoading, refetch } = useGetTodoQuery(1, {
    refetchOnMountOrArgChange: true,
  })

  // CREATE TODO
  const [createTodo] = useCreateTodoMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), defaultValues: { title: "" } });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      status: false
    }
    await createTodo(payload)
    refetch()
  };

  return (
    <div className="p-[1rem] sm:p-[7rem]">
      <h1 className="text-[3rem] font-bold text-center">
        Todo App ( Tailwind-ReduxToolkit )
      </h1>
      <div className="mt-[5rem] flex flex-col gap-5 items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <input
              {...register("title")}
              className="text-[1rem] p-2 rounded-lg border-2 border-[blue]"
              placeholder="Enter Title"
            />
            {errors.title && <p className="text-[red]">{errors.title?.message}</p>}
            <button
              type="submit"
              className="p-2 text-[1.4rem] text-[white] bg-[blue] rounded-lg"
            >
              Add Todo
            </button>
          </div>
        </form>
        {
          isLoading ?
            (<div className="w-full shadow-lg rounded-lg p-10">
              <h1 className="text-[1.4rem] font-semibold text-center">Loading Todos...</h1>
            </div>) :
            (data?.todos?.length === 0 && !isLoading) ?
              (<div className="w-full shadow-lg rounded-lg p-10">
                <h1 className="text-[1.4rem] font-semibold text-center">No Todos Found</h1>
              </div>) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 p-5 rounded-lg shadow-inner">
                  {data?.todos && data?.todos?.map((item) => {
                    return (
                      <TodoList
                        key={item?._id}
                        item={item}
                        refetch={refetch}
                      />
                    );
                  })}
                </div>
              )
        }
        {
          error &&
          (<div className="w-full shadow-lg rounded-lg p-10">
            <h1 className="text-[1.4rem] text-[red] font-semibold text-center">Opps! Error</h1>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;