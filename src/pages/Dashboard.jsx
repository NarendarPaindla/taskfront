import { useEffect, useState } from 'react';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/tasks', form);
    setForm({ title: '', description: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggleComplete = async (id, newStatus) => {
    await API.put(`/tasks/${id}`, { completed: newStatus });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
      <form onSubmit={handleCreate} className="task-form">
        <input placeholder="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Add Task</button>
      </form>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add some above! ✨</p>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onToggle={handleToggleComplete} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
