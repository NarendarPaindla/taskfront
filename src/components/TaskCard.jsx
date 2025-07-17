import './TaskCard.css';

function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? '✅ Completed' : '❌ Incomplete'}</p>
      <div className="task-actions">
        <button onClick={() => onToggle(task._id, !task.completed)}>
          {task.completed ? 'Undo' : 'Mark Completed'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
