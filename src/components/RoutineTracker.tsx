
import React, { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const DEFAULT_TASKS = [
  { id: '1', name: 'Exercise', completed: false },
  { id: '2', name: 'Read a book', completed: false },
  { id: '3', name: 'Meditate', completed: false },
  { id: '4', name: 'Drink water', completed: false },
  { id: '5', name: 'Healthy meal', completed: false }
];

const RoutineTracker = () => {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [newTaskName, setNewTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTasks = loadFromLocalStorage('routineTasks', DEFAULT_TASKS);
    setTasks(savedTasks);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('routineTasks', tasks);
  }, [tasks]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const addNewTask = () => {
    if (newTaskName.trim() === '') return;
    
    const newTask = {
      id: Date.now().toString(),
      name: newTaskName.trim(),
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskName('');
  };
  
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  return (
    <section className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daily Routine</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-primary underline hover:text-primary/80 transition-colors"
        >
          {isEditing ? 'Done' : 'Edit tasks'}
        </button>
      </div>
      
      <ul className="space-y-3 mb-6">
        {tasks.map(task => (
          <li 
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/80 border border-border shadow-sm animate-fade-in"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="w-5 h-5 rounded border-border focus:ring-primary mr-3"
                disabled={isEditing}
              />
              <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                {task.name}
              </span>
            </div>
            
            {isEditing && (
              <button 
                onClick={() => removeTask(task.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {isEditing && (
        <div className="flex mb-4">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-grow p-2 rounded-l-lg border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={addNewTask}
            disabled={newTaskName.trim() === ''}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add
          </button>
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{tasks.filter(t => t.completed).length} of {tasks.length} completed</span>
        <span className="text-xs">Tasks will automatically save as you check them</span>
      </div>
    </section>
  );
};

export default RoutineTracker;
