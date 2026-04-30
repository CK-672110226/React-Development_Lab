import { useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'
import styles from './AddExpenseForm.module.css'

function AddExpenseFormInner({
  addExpense,
  categories,
  editingExpense,
  updateExpense,
  cancelEdit,
}) {
  const todayISO = new Date().toISOString().split('T')[0]
  const initialDate =
    editingExpense?.dateISO ||
    (typeof editingExpense?.createdAt === 'number'
      ? new Date(editingExpense.createdAt).toISOString().split('T')[0]
      : todayISO)

  const [name, setName] = useState(editingExpense?.name || '')
  const [amount, setAmount] = useState(
    typeof editingExpense?.amount === 'number' ? editingExpense.amount.toString() : '',
  )
  const [category, setCategory] = useState(editingExpense?.category || categories[0])
  const [otherLabel, setOtherLabel] = useState(editingExpense?.subCategory || '')
  const [date, setDate] = useState(initialDate)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim()) {
      setError('Enter name')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter amount')
      return
    }

    if (!date) {
      setError('Select date')
      return
    }

    if (editingExpense) {
      updateExpense(editingExpense.id, name.trim(), amount, category, date, otherLabel)
    } else {
      addExpense(name.trim(), amount, category, date, otherLabel)
    }

    setName('')
    setAmount('')
    setOtherLabel('')
    setDate(todayISO)
    setError('')
  }

  function handleCancelEdit() {
    cancelEdit()
    setName('')
    setAmount('')
    setCategory(categories[0])
    setOtherLabel('')
    setDate(todayISO)
    setError('')
  }

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>

      {error && <p className={styles.formError}>{error}</p>}

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Expense name"
      />

      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Amount"
      />

      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        {categories.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      {category === 'Other' && (
        <input
          value={otherLabel}
          onChange={(event) => setOtherLabel(event.target.value)}
          placeholder="Specify expense type (e.g. Gift, Subscription…)"
        />
      )}

      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <button type="submit">{editingExpense ? 'Save Changes' : '+ Add'}</button>

      {editingExpense && (
        <button className={styles.cancelBtn} type="button" onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  )
}

function AddExpenseForm() {
  const { addExpense, categories, editingExpense, updateExpense, cancelEdit } = useExpenses()

  return (
    <AddExpenseFormInner
      key={editingExpense ? editingExpense.id : 'new-expense'}
      addExpense={addExpense}
      categories={categories}
      editingExpense={editingExpense}
      updateExpense={updateExpense}
      cancelEdit={cancelEdit}
    />
  )
}

export default AddExpenseForm
