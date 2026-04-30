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