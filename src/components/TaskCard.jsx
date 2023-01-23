import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();
  const handleDelte = () => {
    deleteTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };
  return (
    <div>
      <h1>{task.name}</h1>
      <p>{JSON.stringify(task.done)}</p>
      <div>
        <button
          onClick={() => {
            handleDelte();
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            handleToggleDone();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
