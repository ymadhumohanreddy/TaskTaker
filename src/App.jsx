import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  const saveToLS = (params) => {
    localStorage.setItem('todos', JSON.stringify(params));
  };

  useEffect(() => {
    const todostring = localStorage.getItem('todos');
    if (todostring) {
      try {
        const todos = JSON.parse(todostring);
        settodos(todos);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
      }
    }
  }, []);

  const toggleFinished = () => {
    setshowfinished((prev) => !prev);
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    settodo(t.todo);
    const newtodos = todos.filter((item) => item.id !== id);
    settodos(newtodos);
    saveToLS(newtodos);
  };

  const handleDelete = (id) => {
    const newtodos = todos.filter((item) => item.id !== id);
    settodos(newtodos);
    saveToLS(newtodos);
  };

  const handleAdd = () => {
    if (todo.trim() !== '') {
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      settodos(updatedTodos);
      settodo('');
      saveToLS(updatedTodos);
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    settodos(newtodos);
    saveToLS(newtodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-300 min-h-[80vh] md:w-2/3">

        <div className="addTodo text-center">
          <h1 className="text-2xl font-serif font-bold text-center my-3">
            TaskTaker - One Task at a Time!
          </h1>
          <h2 className="text-lg font-semibold my-4">Add a Todo</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full md:w-1/2 rounded-md p-2 border border-gray-500"
              placeholder="Enter your task here"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length === 0}
              className="bg-gray-700 px-6 py-2 text-white rounded-md hover:bg-gray-900 disabled:bg-gray-500"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex items-center my-5">
          <input
            type="checkbox"
            checked={showfinished}
            onChange={toggleFinished}
            className="mr-2"
          />
          <label className="text-sm md:text-base">Show Finished</label>
        </div>
        <h2 className="text-lg font-semibold my-6">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-center mt-20 text-slate-400">
              No tasks to display
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos
              .filter((item) => (showfinished ? true : !item.isCompleted))
              .map((item) => (
                <div
                  key={item.id}
                  className="todo flex justify-between items-center bg-white shadow-md rounded-md p-4"
                >
                  <input
                    className="size-4 mr-4"
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div
                    className={`flex-1 ${
                      item.isCompleted ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {item.todo}
                  </div>
                  <div className="buttons flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <CiEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDeleteForever size={24} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
