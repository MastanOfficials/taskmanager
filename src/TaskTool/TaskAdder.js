import React from 'react';
// redux
import { onAddTask, reRender } from '../redux/action';
import { useDispatch } from 'react-redux';

const TaskAdder = ({ setShowAddTask, TaskData, setTaskData, initialState, updateTask, setUpdateTask }) => {
  const dispatch = useDispatch();

  // randomId Generator
  function generateRandom() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i)
      retVal += charset.charAt(Math.floor(Math.random() * n));
    return retVal;
  }

  // for Adding Task
  const handleAddTask = () => {
    const previousData = JSON.parse(localStorage.getItem("taskList"));
    if (updateTask !== "") {
      const updatedData = previousData.map((task) => {
        if (task.id === TaskData.id) {
          return TaskData;
        }
        return task;
      });
      localStorage.setItem("taskList", JSON.stringify(updatedData));
      dispatch(reRender());
      setUpdateTask("");
    } else {
      TaskData.id = generateRandom();
      previousData
        ? localStorage.setItem("taskList", JSON.stringify([...previousData, TaskData]))
        : localStorage.setItem("taskList", JSON.stringify([TaskData]));
      dispatch(onAddTask(TaskData));
      dispatch(reRender());
    }
    setShowAddTask(false);
    setTaskData(initialState);
  };

  // for Canceling Task
  const handleCancelTask = () => {
    setShowAddTask(false);
    setTaskData(initialState);
  };

  return (
    <div className="border bg-orange-50 p-4">
      <div>
        <h1 className="text-lg font-bold mb-4">Add New Task</h1>
      </div>
      <div className="flex flex-col mb-4">
        <div className="mb-4">
          <h4 className="font-bold">Title</h4>
          <input
            value={TaskData.title}
            onChange={({ target: { value } }) => setTaskData({ ...TaskData, title: value })}
            className="border rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <h4 className="font-bold">Date</h4>
          <input
            type="date"
            value={TaskData.date}
            onChange={({ target: { value } }) => setTaskData({ ...TaskData, date: value })}
            className="border rounded-md px-2 py-1 w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-bold">Description</h4>
        <textarea
          value={TaskData.description}
          onChange={({ target: { value } }) => setTaskData({ ...TaskData, description: value })}
          className="border rounded-md px-2 py-1 w-full h-32"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCancelTask}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel Task
        </button>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
          {updateTask !== "" ? "Update Task" : "Add Task"}
          </button>
          </div>
          </div>
          );
          };
          
          export default TaskAdder;