import { useMemo, useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'
import styles from './ExpenseSummary.module.css'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getExpenseYear(expense) {
  const iso = expense?.dateISO
  if (iso) return iso.slice(0, 4)
  if (typeof expense?.createdAt === 'number') {
    return String(new Date(expense.createdAt).getFullYear())
  }
  return null
}

function getExpenseMonth(expense) {
  const iso = expense?.dateISO
  if (iso) return iso.slice(5, 7)
  if (typeof expense?.createdAt === 'number') {
    return String(new Date(expense.createdAt).getMonth() + 1).padStart(2, '0')
  }
  return null
}

function ExpenseSummary() {
  const {
    expenses,
    categories,
    budget,
    setBudget,
  } = useExpenses()
  const [budgetInput, setBudgetInput] = useState(budget ? budget.toString() : '')
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [selectedMonth, setSelectedMonth] = useState('ALL')

  const availableYears = useMemo(
    () => [...new Set(expenses.map(getExpenseYear).filter(Boolean))].sort((a, b) => b.localeCompare(a)),
    [expenses],
  )

  const periodExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (selectedYear === 'ALL') return true
      if (getExpenseYear(expense) !== selectedYear) return false
      if (selectedMonth === 'ALL') return true
      return getExpenseMonth(expense) === selectedMonth
    })
  }, [expenses, selectedYear, selectedMonth])

  const periodTotal = useMemo(
    () => periodExpenses.reduce((sum, e) => sum + e.amount, 0),
    [periodExpenses],
  )

  const byCategory = useMemo(
    () =>
      categories.reduce((acc, category) => {
        const categoryTotal = periodExpenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0)
        if (categoryTotal > 0) acc[category] = categoryTotal
        return acc
      }, {}),
    [periodExpenses, categories],
  )

  const topCategoryEntry = useMemo(
    () => Object.entries(byCategory).sort(([, a], [, b]) => b - a)[0],
    [byCategory],
  )

  const budgetUsagePercent = budget > 0 ? (periodTotal / budget) * 100 : 0
  const budgetRemaining = budget - periodTotal
  const clampedUsage = Math.min(budgetUsagePercent, 100)
  const isOverBudget = budget > 0 && budgetRemaining < 0
  const isNearBudget = budget > 0 && budgetUsagePercent >= 80 && budgetRemaining >= 0

  const periodLabel = useMemo(() => {
    if (selectedYear === 'ALL') return 'All time'
    if (selectedMonth === 'ALL') return selectedYear
    return `${MONTH_NAMES[parseInt(selectedMonth, 10) - 1]} ${selectedYear}`
  }, [selectedYear, selectedMonth])

  function handleBudgetSubmit(event) {
    event.preventDefault()
    if (!budgetInput.trim()) {
      setBudget(0)
      return
    }
    setBudget(budgetInput)
  }

  function handleYearChange(event) {
    setSelectedYear(event.target.value)
    setSelectedMonth('ALL')
  }

  return (
    <section className={styles.summary}>
      <h3>Summary</h3>

      <div className={styles.summaryPeriod}>
        <select
          className={styles.periodSelect}
          value={selectedYear}
          onChange={handleYearChange}
          aria-label="Select year"
        >
          <option value="ALL">All years</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          className={styles.periodSelect}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          disabled={selectedYear === 'ALL'}
          aria-label="Select month"
        >
          <option value="ALL">All months</option>
          {MONTH_NAMES.map((name, i) => {
            const mm = String(i + 1).padStart(2, '0')
            return (
              <option key={mm} value={mm}>{name}</option>
            )
          })}
        </select>
      </div>

      <p className={styles.periodLabel}>{periodLabel}</p>
      <p className={styles.totalAmount}>${periodTotal.toFixed(2)}</p>
      <p>{periodExpenses.length} transactions</p>

      <form className={styles.budgetForm} onSubmit={handleBudgetSubmit}>
        <label htmlFor="budgetInput">Monthly Budget</label>
        <div className={styles.budgetControls}>
          <input
            id="budgetInput"
            type="number"
            min="0"
            step="0.01"
            value={budgetInput}
            onChange={(event) => setBudgetInput(event.target.value)}
            placeholder="Set budget"
          />
          <button type="submit">Set</button>
        </div>
      </form>

      <div className={styles.budgetStatus}>
        <p>Budget: ${budget.toFixed(2)}</p>
        <p>Used: {budgetUsagePercent.toFixed(1)}%</p>
        <p className={isOverBudget ? styles.budgetDanger : isNearBudget ? styles.budgetWarning : ''}>
          Remaining: ${budgetRemaining.toFixed(2)}
        </p>
        <div className={styles.budgetProgressTrack}>
          <div
            className={`${styles.budgetProgressFill} ${
              isOverBudget ? styles.danger : isNearBudget ? styles.warning : ''
            }`}
            style={{ width: `${clampedUsage}%` }}
          />
        </div>

        {isOverBudget && topCategoryEntry && (
          <p className={`${styles.budgetTip} ${styles.budgetDanger}`}>
            Over budget by ${Math.abs(budgetRemaining).toFixed(2)}. Biggest category is{' '}
            {topCategoryEntry[0]} (${topCategoryEntry[1].toFixed(2)}).
          </p>
        )}

        {!isOverBudget && isNearBudget && (
          <p className={`${styles.budgetTip} ${styles.budgetWarning}`}>
            You are close to the monthly limit.
          </p>
        )}
      </div>

      <div className={styles.summaryRows}>
        {Object.entries(byCategory).map(([category, amount]) => (
          <div key={category} className={styles.summaryRow}>
            <span>{category}</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        ))}
        {Object.keys(byCategory).length === 0 && (
          <p className={styles.emptyState}>No expenses in this period.</p>
        )}
      </div>
    </section>
  )
}

export default ExpenseSummary
