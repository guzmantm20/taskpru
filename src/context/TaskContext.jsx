import { createContext, useContext, useState } from "react";
import { client } from "../dbconnect/client";
export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = await client.auth.getUser();
    const { error, data } = await client
      .from("task")
      .select()
      .eq("userId", user.data.user.id)
      .eq("done", done)
      .order("id", { ascending: true });

    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = await client.auth.getUser();
      const { error, data } = await client
        .from("task")
        .insert({
          name: taskName,
          userId: user.data.user.id,
        })
        .select();
      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = await client.auth.getUser();

    const { error, data } = await client
      .from("task")
      .delete()
      .eq("userId", user.data.user.id)
      .eq("id", id);

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = async (id, updateFields) => {
    const user = await client.auth.getUser();

    const { error, data } = await client
      .from("task")
      .update(updateFields)
      .eq("userId", user.data.user.id)
      .eq("id", id);

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
