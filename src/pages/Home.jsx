import React, { useEffect, useState } from "react";
import { client } from "../dbconnect/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    if (!client.auth.getUser()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      Home
      <button onClick={() => client.auth.signOut()}>Logout</button>
      <TaskForm />
      <header>
        <span>
          Task Pending
        </span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>Show Task Done</button>
      </header>
      <TaskList done={showTaskDone} />
      
    </div>
  );
}

export default Home;
