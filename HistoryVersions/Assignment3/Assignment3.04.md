# Assignment3.04 History

Date: 28 April 2026 (28 เมษายน 2569)

## Overview

Added full source code snapshots to the history for reference. No logic or behavior was changed from Assignment3.03.

## Reason

History files previously described changes without including the actual code. This version adds the complete code for all modified and key files so the state of the project is fully documented.

## Changes

1. HistoryVersions/Assignment3.04.md
   - Added full code snapshots for src/App.jsx, src/components/TaskInput.jsx, and src/components/TaskItem.jsx.

---

## Full Code Snapshot

### src/App.jsx

```jsx
import { useEffect, useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput'
import TaskItem from './components/TaskItem'

const initialTasks = [
  { id: 1, text: 'Complete React Session 3', completed: true },
  { id: 2, text: 'Read React docs', completed: false },
  { id: 3, text: 'Read React documentation', completed: false },
]

let nextId = 4
const storageKey = 'todo-tasks'

function getInitialTasks() {
  const storedTasks = localStorage.getItem(storageKey)

  if (!storedTasks) {
    return initialTasks
  }

  try {
    const parsedTasks = JSON.parse(storedTasks)

    if (!Array.isArray(parsedTasks)) {
      return initialTasks
    }

    nextId = parsedTasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1

    return parsedTasks
  } catch {
    return initialTasks
  }
}

function App() {
  const [tasks, setTasks] = useState(getInitialTasks)
  const [filter, setFilter] = useState('all')
  const hasTasks = tasks.length > 0
  const allTasksCompleted = hasTasks && tasks.every((task) => task.completed)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask(text) {
    setTasks((currentTasks) => [...currentTasks, { id: nextId++, text, completed: false }])
  }

  function handleToggle(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function handleDelete(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function handleEditTask(id, newText) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    )
  }

  function handleClearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed))
  }

  function handleToggleAll() {
    setTasks((currentTasks) =>
      currentTasks.map((task) => ({ ...task, completed: !allTasksCompleted })),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <main className="todo-page">
      <section className="todo-card">
        <header className="todo-header">
          <h1>To-Do List</h1>
          <p>{remainingCount} tasks remaining</p>
        </header>

        <TaskInput onAddTask={handleAddTask} />

        <label className="select-all-row">
          <input
            type="checkbox"
            checked={allTasksCompleted}
            onChange={handleToggleAll}
            disabled={!hasTasks}
          />
          <span>{allTasksCompleted ? 'Unselect all tasks' : 'Select all tasks'}</span>
        </label>

        <div className="filter-row" aria-label="Task filters">
          <button
            type="button"
            className={`filter-btn${filter === 'all' ? ' active-filter' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-btn${filter === 'active' ? ' active-filter' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-btn${filter === 'completed' ? ' active-filter' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={handleEditTask}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <li className="empty-state">No tasks match this filter.</li>
          )}
        </ul>

        <div className="todo-footer">
          <span className="task-summary">
            {tasks.length} total | {tasks.filter((task) => task.completed).length} completed
          </span>
          <button
            type="button"
            className="clear-btn"
            onClick={handleClearCompleted}
            disabled={!tasks.some((task) => task.completed)}
          >
            Clear Completed
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
```

---

### src/components/TaskInput.jsx

```jsx
import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [inputText, setInputText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = inputText.trim()

    if (trimmedText !== '') {
      onAddTask(trimmedText)
      setInputText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="What needs to be done?"
        className="task-input"
      />
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  )
}

export default TaskInput
```

---

### src/components/TaskItem.jsx

```jsx
import { useState } from 'react'

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(task.text)

  function handleStartEdit() {
    setDraftText(task.text)
    setIsEditing(true)
  }

  function handleSaveEdit(event) {
    event.preventDefault()
    const trimmedText = draftText.trim()

    if (trimmedText !== '') {
      onEdit(task.id, trimmedText)
      setIsEditing(false)
    }
  }

  function handleCancelEdit() {
    setDraftText(task.text)
    setIsEditing(false)
  }

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      {isEditing ? (
        <form className="task-edit-form" onSubmit={handleSaveEdit}>
          <input
            type="text"
            className="task-edit-input"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            autoFocus
          />
          <div className="task-actions">
            <button type="submit" className="edit-btn save-btn">
              Save
            </button>
            <button type="button" className="edit-btn cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="task-label">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span>{task.text}</span>
          </label>
          <div className="task-actions">
            <button type="button" className="edit-btn" onClick={handleStartEdit}>
              Edit
            </button>
            <button type="button" className="delete-btn" onClick={() => onDelete(task.id)}>
              ✕
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem
```

## Validation

- No code changes were made. History file only.
- All code snapshots were copied verbatim from the current source files.

## Notes

- Previous history: Assignment3.03.md documented the localStorage persistence feature.
- This file adds code snapshots without altering any application logic.
