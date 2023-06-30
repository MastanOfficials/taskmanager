import React, { useState } from 'react';
import searchIcon from "../assets/search.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/trash.png";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { reRender } from '../redux/action';

const TaskTable = ({ setShowAddTask, setTaskData, setUpdateTask }) => {
  const [sortedTaskList, setSortedTaskList] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search
  const TaskList = useSelector(state => state);
  const dispatch = useDispatch();

  const onAddClick = () => {
    setShowAddTask(true);
  };

  const setStatus = (id, value) => {
    let updatedTaskList = [...TaskList];
    updatedTaskList.forEach((item, index) => {
      if (item.id === id) {
        updatedTaskList[index].status = value;
      }
    });
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    dispatch(reRender());
  };

  const editAction = (id) => {
    setShowAddTask(true);
    setUpdateTask(id);
    TaskList.forEach(element => {
      if (element.id === id) {
        setTaskData(element);
      }
    });
  };

  const deleteAction = (id) => {
    let Temp = TaskList;
    Temp = Temp.filter((item) => item.id !== id);
    localStorage.setItem("taskList", JSON.stringify(Temp));
    dispatch(reRender());
  };

  const sortTasksByDate = () => {
    const sortedTasks = [...TaskList].sort((a, b) => new Date(a.date) - new Date(b.date));
    setSortedTaskList(sortedTasks);
  };

  const filterTasks = (value) => {
    setFilter(value);
    if (value === 'All') {
      setSortedTaskList(null);
    } else {
      const filteredTasks = TaskList.filter(task => task.status === value);
      setSortedTaskList(filteredTasks);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredTasks = TaskList.filter(task =>
      task.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedTaskList(filteredTasks);
  };

  const taskListToRender = sortedTaskList || TaskList;

  return (
    <div className="bg-blue-100 h-5/6 w-5/6 border-2">
  <div className="flex flex-col md:flex-row border-b-2 p-4 pb-0 justify-between">
    <div className="border-b-2 border-black mb-0 pb-2">
      <h1 className="font-bold text-lg">Task Management</h1>
    </div>
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-10">
    <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-10">
  <div className="flex items-center">
    <input
      className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button>
      <img src={searchIcon} className="w-4 h-4" alt="search" />
    </button>
  </div>
</div>

      <select
        className="border rounded-md px-2 py-1"
        value={filter}
        onChange={(e) => filterTasks(e.target.value)}
      >
        <option value="All">All</option>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="testing">Testing</option>
      </select>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
        onClick={sortTasksByDate}
      >
        Sort
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
        onClick={onAddClick}
      >
        Add New Task
      </button>
    </div>
  </div>
  <div className="w-full bg-red-100">
  <div className="overflow-x-auto">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {taskListToRender.length > 0 ? (
          taskListToRender.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">
                <select
                  value={item.status}
                  onChange={({ target: { value } }) =>
                    setStatus(item.id, value)
                  }
                  className="border rounded-md px-2 py-1"
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="testing">Testing</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-x-2 justify-center">
                  <button
                    onClick={() => editAction(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                  >
                    <img src={editIcon} alt="edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAction(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="px-4 py-2 text-center">
              No tasks available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

</div>

  );
};

export default TaskTable;
