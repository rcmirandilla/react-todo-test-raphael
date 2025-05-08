import React, { useCallback, useEffect, useMemo, useState } from "react";

// initial commit

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setNewTask(event.target.value);
  }, []);

  const handleAddTaskButtonClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      if (newTask.trim() !== "") {
        const newTaskItem = { id: Date.now(), text: newTask, completed: false };
        setTasks((prev) => [...prev, newTaskItem]);
        setNewTask("");
      }
    },
    [newTask]
  );

  const handleCompleteChekboxChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const taskId = e.currentTarget.dataset.value ?? "";
    setTasks((prev) =>
      prev.map((item) => {
        if (String(item.id) === taskId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }, []);

  const tasksToRender = useMemo(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else if (filter === "two-words") {
      filteredTasks = tasks.filter(
        (task) => task.text.split(/\b\w+\s\w+\b/).length === 2
      );
    }
    return filteredTasks;
  }, [filter, tasks]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks.length]);

  const handleRemoveButtonClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >((e) => {
    const taskId = e.currentTarget.dataset.value ?? "";
    setTasks((prev) => prev.filter((item) => String(item.id) !== taskId));
  }, []);

  const handleRemoveAllCompletedItemsButtonClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >((e) => {
    setTasks((prev) => prev.filter((item) => !item.completed));
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button onClick={handleAddTaskButtonClick}>Add</button>
      <div>
        <button onClick={handleRemoveAllCompletedItemsButtonClick}>
          Remove All Completed Items
        </button>
      </div>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("two-words")}>2 Words</button>
      </div>

      <ul>
        {tasksToRender.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCompleteChekboxChange}
              data-value={task.id}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button data-value={task.id} onClick={handleRemoveButtonClick}>
              [x]
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
