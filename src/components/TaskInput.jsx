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