import React,{useState} from 'react'
import TaskTable from './TaskTool/TaskTable'
import TaskAdder from './TaskTool/TaskAdder'

const App = () => {
  const initialState = {
    id: "",
    date: "",
    title: "",
    description: "",
    status: "todo",
  };

  const [showAddTask,setShowAddTask] = useState(false);
  const [TaskData, setTaskData] = useState(initialState);
  const [updateTask,setUpdateTask] = useState("");

  return (
    <div className='flex h-screen w-100% place-content-center relative'>
      <TaskTable setShowAddTask={setShowAddTask} setTaskData={setTaskData} setUpdateTask={setUpdateTask}/>
      {
      showAddTask?
      <div className='absolute w-6/12 h-3/6'>
      <TaskAdder showAddTask={showAddTask} setShowAddTask={setShowAddTask}
       TaskData={TaskData} setTaskData={setTaskData} initialState={initialState}
       setUpdateTask={setUpdateTask} updateTask={updateTask} />
      </div>
      :
      null
      }
      
    </div>
  )
}

export default App