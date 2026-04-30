import { useMemo, useState } from 'react'
import { useExpenses } from '../context/ExpenseContext'
import styles from './ExpenseList.module.css'

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Health: '#10b981',
  Entertainment: '#ef4444',
  Shopping: '#8b5cf6',
  Other: '#6b7280',
}

function getMonthKey(expense) {
  if (expense?.dateISO) return expense.dateISO.slice(0, 7)
  if (typeof expense?.createdAt === 'number') {
    const d = new Date(expense.createdAt)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }
  return null
}

function formatMonthLabel(monthKey) {
  const date = new Date(`${monthKey}-01T00:00:00`)
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

function resolveMonthValue(value, currentMonthKey) {
  if (!value) return null
  if (value === 'THIS_MONTH') return currentMonthKey
  return value
}

function BarChart({ data, categories }) {
  const byCategory = useMemo(() => {
    const map = {}
    for (const cat of categories) {
      const total = data
        .filter((e) => e.category === cat)
        .reduce((s, e) => s + e.amount, 0)
      if (total > 0) map[cat] = total
    }
    return map
  }, [data, categories])

  const entries = Object.entries(byCategory).sort(([, a], [, b]) => b - a)
  if (entries.length === 0) return <p className={styles.emptyState}>No data in this scope.</p>

  const maxVal = entries[0][1]

  return (
    <div className={styles.barChart}>
      {entries.map(([cat, amt]) => (
        <div key={cat} className={styles.barRow}>
          <span className={styles.barLabel}>{cat}</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${(amt / maxVal) * 100}%`, background: COLORS[cat] || COLORS.Other }}
            />
          </div>
          <span className={styles.barAmount}>${amt.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}

function MonthOptions({ availableMonths, currentMonthKey }) {
  return (
    <>
      <option value="">All months</option>
      <option value="THIS_MONTH">This Month ({formatMonthLabel(currentMonthKey)})</option>
      {availableMonths
        .filter((m) => m !== currentMonthKey)
        .map((mk) => (
          <option key={mk} value={mk}>
            {formatMonthLabel(mk)}
          </option>
        ))}
    </>
  )
}

function ExportModal({ onClose, expenses, filteredExpenses, filter, categories, exportExpensesCSV }) {
  const currentMonthKey = new Date().toISOString().slice(0, 7)

  const availableMonths = useMemo(
    () =>
      [...new Set(expenses.map((e) => getMonthKey(e)).filter(Boolean))].sort((a, b) =>
        b.localeCompare(a),
      ),
    [expenses],
  )

  const [modalFrom, setModalFrom] = useState('')
  const [modalTo, setModalTo] = useState('')
  const [modalCategory, setModalCategory] = useState('All')

  const modalFromKey = resolveMonthValue(modalFrom, currentMonthKey)
  const modalToKey = resolveMonthValue(modalTo, currentMonthKey)

  const isInvalidRange =
    Boolean(modalFromKey) && Boolean(modalToKey) && modalFromKey > modalToKey

  const modalData = useMemo(() => {
    let data = modalCategory === 'All'
      ? filteredExpenses
      : filteredExpenses.filter((e) => e.category === modalCategory)

    if (!isInvalidRange) {
      data = data.filter((e) => {
        const mk = getMonthKey(e)
        if (!mk) return false
        if (modalFromKey && mk < modalFromKey) return false
        if (modalToKey && mk > modalToKey) return false
        return true
      })
    }
    return data
  }, [filteredExpenses, modalCategory, modalFromKey, modalToKey, isInvalidRange])

  const modalTotal = useMemo(
    () => modalData.reduce((s, e) => s + e.amount, 0),
    [modalData],
  )

  const modalScope = `view-${filter}-${modalCategory}-${
    modalFromKey || 'all'
  }-to-${modalToKey || 'all'}`

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.exportModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.exportModalHeader}>
          <h2>Expense Report — {filter}</h2>
          <button className={styles.modalCloseBtn} type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.exportModalControls}>
          <label htmlFor="modalFrom">From</label>
          <select
            id="modalFrom"
            className={styles.rangeSelect}
            value={modalFrom}
            onChange={(e) => setModalFrom(e.target.value)}
          >
            <MonthOptions availableMonths={availableMonths} currentMonthKey={currentMonthKey} />
          </select>

          <label htmlFor="modalTo">To</label>
          <select
            id="modalTo"
            className={styles.rangeSelect}
            value={modalTo}
            onChange={(e) => setModalTo(e.target.value)}
          >
            <MonthOptions availableMonths={availableMonths} currentMonthKey={currentMonthKey} />
          </select>

          <label htmlFor="modalCat">Category</label>
          <select
            id="modalCat"
            className={styles.rangeSelect}
            value={modalCategory}
            onChange={(e) => setModalCategory(e.target.value)}
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {isInvalidRange && (
          <p className={styles.rangeNote}>Start month must be before end month.</p>
        )}

        <BarChart data={modalData} categories={categories} />

        <div className={styles.exportModalList}>
          {modalData.length === 0 ? (
            <p className={styles.emptyState}>No expenses in selected scope.</p>
          ) : (
            <table className={styles.exportTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      {expense.name}
                      {expense.subCategory && (
                        <span className={styles.subCategory}> ({expense.subCategory})</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={styles.categoryDot}
                        style={{ background: COLORS[expense.category] || COLORS.Other }}
                      />{' '}
                      {expense.category}
                    </td>
                    <td>{expense.date}</td>
                    <td style={{ textAlign: 'right' }}>${expense.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <strong>Total ({modalData.length} items)</strong>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <strong>${modalTotal.toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className={styles.exportModalFooter}>
          <button
            className={styles.exportBtn}
            type="button"
            onClick={() => exportExpensesCSV(modalData, modalScope)}
            disabled={modalData.length === 0}
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  )
}

function ExpenseList() {
  const {
    filteredExpenses,
    expenses,
    deleteExpense,
    filter,
    setFilter,
    categories,
    startEdit,
    exportExpensesCSV,
  } = useExpenses()
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)
  const currentMonthKey = new Date().toISOString().slice(0, 7)

  const fromKey = resolveMonthValue(rangeFrom, currentMonthKey)
  const toKey = resolveMonthValue(rangeTo, currentMonthKey)

  const availableMonths = useMemo(
    () =>
      [...new Set(expenses.map((e) => getMonthKey(e)).filter(Boolean))].sort((a, b) =>
        b.localeCompare(a),
      ),
    [expenses],
  )

  const isInvalidRange = Boolean(fromKey) && Boolean(toKey) && fromKey > toKey
  const rangeExportData = useMemo(() => {
    if (isInvalidRange) return []
    return expenses.filter((expense) => {
      const mk = getMonthKey(expense)
      if (!mk) return false
      if (fromKey && mk < fromKey) return false
      if (toKey && mk > toKey) return false
      return true
    })
  }, [expenses, fromKey, isInvalidRange, toKey])

  const rangeScope = `all-${fromKey || 'all'}-to-${toKey || 'all'}`

  return (
    <section className={styles.expenseListSection}>
      <div className={styles.rangeActions}>
        <label htmlFor="rangeFrom">From</label>
        <select
          id="rangeFrom"
          className={styles.rangeSelect}
          value={rangeFrom}
          onChange={(event) => setRangeFrom(event.target.value)}
        >
          <MonthOptions availableMonths={availableMonths} currentMonthKey={currentMonthKey} />
        </select>

        <label htmlFor="rangeTo">To</label>
        <select
          id="rangeTo"
          className={styles.rangeSelect}
          value={rangeTo}
          onChange={(event) => setRangeTo(event.target.value)}
        >
          <MonthOptions availableMonths={availableMonths} currentMonthKey={currentMonthKey} />
        </select>

        <button
          className={styles.exportBtn}
          type="button"
          onClick={() => exportExpensesCSV(rangeExportData, rangeScope)}
          disabled={rangeExportData.length === 0 || !!isInvalidRange}
        >
          Export All CSV
        </button>
        <button
          className={`${styles.exportBtn} ${styles.secondary}`}
          type="button"
          onClick={() => setShowExportModal(true)}
          disabled={filteredExpenses.length === 0}
        >
          Export View CSV
        </button>
      </div>

      {isInvalidRange && (
        <p className={styles.rangeNote}>Start month must be before end month.</p>
      )}

      <div className={styles.tabs}>
        {['All', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`${styles.tab} ${filter === category ? styles.active : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredExpenses.length === 0 && <p className={styles.emptyState}>No expenses found.</p>}

      {filteredExpenses.map((expense) => (
        <div key={expense.id} className={styles.expenseItem}>
          <span
            className={styles.categoryDot}
            style={{ background: COLORS[expense.category] || COLORS.Other }}
          />
          <div className={styles.expenseMeta}>
            <strong className={styles.expenseName}>{expense.name}</strong>
            {expense.subCategory && (
              <span className={styles.expenseSubCategory}> — {expense.subCategory}</span>
            )}
            <p className={styles.expenseDate}>{expense.date}</p>
          </div>
          <span className={styles.expenseAmount}>${expense.amount.toFixed(2)}</span>
          <button className={styles.editBtn} type="button" onClick={() => startEdit(expense)}>
            Edit
          </button>
          <button
            className={styles.deleteBtn}
            type="button"
            onClick={() => deleteExpense(expense.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          expenses={expenses}
          filteredExpenses={filteredExpenses}
          filter={filter}
          categories={categories}
          exportExpensesCSV={exportExpensesCSV}
        />
      )}
    </section>
  )
}

export default ExpenseList
