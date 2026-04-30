import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import TaskInput from './TaskInput'

afterEach(cleanup)

describe('TaskInput', () => {
  it('renders input and button', () => {
    render(<TaskInput onAddTask={() => {}} />)
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeTruthy()
    expect(screen.getByText('Add Task')).toBeTruthy()
  })

  it('calls onAddTask with trimmed text on submit', () => {
    const mockAdd = vi.fn()
    render(<TaskInput onAddTask={mockAdd} />)

    fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), {
      target: { value: '  Buy milk  ' },
    })
    fireEvent.click(screen.getByText('Add Task'))

    expect(mockAdd).toHaveBeenCalledWith('Buy milk')
  })

  it('does not call onAddTask when input is empty', () => {
    const mockAdd = vi.fn()
    render(<TaskInput onAddTask={mockAdd} />)
    fireEvent.click(screen.getByText('Add Task'))
    expect(mockAdd).not.toHaveBeenCalled()
  })
})