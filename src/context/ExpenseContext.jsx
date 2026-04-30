/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const ExpenseStateContext = createContext()
const ExpenseActionsContext = createContext()

const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Health',
  'Other',
]

const initialState = {
  expenses: [],
  filter: 'All',
  editingExpense: null,
  budget: 0,
}

function getExpenseTimestamp(expense) {
  if (typeof expense.createdAt === 'number') {
    return expense.createdAt
  }

  if (typeof expense.id === 'number') {
    return expense.id
  }

  const parsedDate = Date.parse(expense.date)
  return Number.isNaN(parsedDate) ? 0 : parsedDate
}

function escapeCsvValue(value) {
  const text = String(value ?? '')
  const escaped = text.replaceAll('"', '""')
  return `"${escaped}"`
}

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] }
    case 'LOAD':
      return { ...state, expenses: action.payload }
    case 'DELETE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      }
    case 'START_EDIT':
      return { ...state, editingExpense: action.payload }
    case 'CANCEL_EDIT':
      return { ...state, editingExpense: null }
    case 'UPDATE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        ),
        editingExpense: null,
      }
    case 'SET_BUDGET':
      return { ...state, budget: action.payload }
    case 'FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses')

    if (storedExpenses) {
      try {
        const parsedExpenses = JSON.parse(storedExpenses)
        if (Array.isArray(parsedExpenses)) {
          dispatch({ type: 'LOAD', payload: parsedExpenses })
        }
      } catch {
        localStorage.removeItem('expenses')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.expenses])

  useEffect(() => {
    const storedBudget = localStorage.getItem('expenseBudget')
    const parsedBudget = parseFloat(storedBudget || '0')

    if (!Number.isNaN(parsedBudget) && parsedBudget >= 0) {
      dispatch({ type: 'SET_BUDGET', payload: parsedBudget })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenseBudget', String(state.budget))
  }, [state.budget])

  const totalAmount = useMemo(
    () => state.expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [state.expenses],
  )

  const budgetUsagePercent = useMemo(
    () => (state.budget > 0 ? (totalAmount / state.budget) * 100 : 0),
    [totalAmount, state.budget],
  )

  const budgetRemaining = useMemo(
    () => state.budget - totalAmount,
    [state.budget, totalAmount],
  )

  const filteredExpenses = useMemo(
    () =>
      (state.filter === 'All'
        ? state.expenses
        : state.expenses.filter((expense) => expense.category === state.filter)
      )
        .slice()
        .sort((a, b) => {
          const timeDiff = getExpenseTimestamp(b) - getExpenseTimestamp(a)
          if (timeDiff !== 0) {
            return timeDiff
          }
          return b.id - a.id
        }),
    [state.expenses, state.filter],
  )

  const addExpense = useCallback((name, amount, category, dateValue, subCategory = '') => {
    const id = Date.now()
    const selectedDate = dateValue || new Date().toISOString().split('T')[0]

    dispatch({
      type: 'ADD',
      payload: {
        id,
        name,
        amount: parseFloat(amount),
        category,
        subCategory: subCategory.trim(),
        dateISO: selectedDate,
        date: new Date(selectedDate).toLocaleDateString(),
        createdAt: new Date(selectedDate).getTime(),
      },
    })
  }, [])

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id })
  }, [])

  const startEdit = useCallback((expense) => {
    dispatch({ type: 'START_EDIT', payload: expense })
  }, [])

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CANCEL_EDIT' })
  }, [])

  const updateExpense = useCallback((id, name, amount, category, dateValue, subCategory = '') => {
    const selectedDate = dateValue || new Date().toISOString().split('T')[0]

    dispatch({
      type: 'UPDATE',
      payload: {
        id,
        name,
        amount: parseFloat(amount),
        category,
        subCategory: subCategory.trim(),
        dateISO: selectedDate,
        date: new Date(selectedDate).toLocaleDateString(),
        createdAt: new Date(selectedDate).getTime(),
      },
    })
  }, [])

  const setFilter = useCallback((category) => {
    dispatch({ type: 'FILTER', payload: category })
  }, [])

  const setBudget = useCallback((amount) => {
    const parsedAmount = parseFloat(amount)
    if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
      return
    }

    dispatch({ type: 'SET_BUDGET', payload: parsedAmount })
  }, [])

  const exportExpensesCSV = useCallback((expensesToExport, scope = 'all') => {
    if (!Array.isArray(expensesToExport) || expensesToExport.length === 0) {
      return
    }

    const headers = ['id', 'name', 'amount', 'category', 'date', 'dateISO']
    const rows = expensesToExport.map((expense) =>
      [
        expense.id,
        expense.name,
        expense.amount,
        expense.category,
        expense.date,
        expense.dateISO || '',
      ]
        .map((value) => escapeCsvValue(value))
        .join(','),
    )

    const csvText = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' })
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const scopeSlug = String(scope)
      .trim()
      .toLowerCase()
      .replaceAll(/\s+/g, '-')

    link.href = objectUrl
    link.setAttribute(
      'download',
      `expenses-${scopeSlug || 'all'}-${new Date().toISOString().slice(0, 10)}.csv`,
    )
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(objectUrl)
  }, [])

  const stateValue = useMemo(
    () => ({
      expenses: state.expenses,
      filteredExpenses,
      totalAmount,
      budget: state.budget,
      budgetUsagePercent,
      budgetRemaining,
      filter: state.filter,
      editingExpense: state.editingExpense,
      categories: CATEGORIES,
    }),
    [
      state.expenses,
      filteredExpenses,
      totalAmount,
      state.budget,
      budgetUsagePercent,
      budgetRemaining,
      state.filter,
      state.editingExpense,
    ],
  )

  const actionsValue = useMemo(
    () => ({
      addExpense,
      updateExpense,
      deleteExpense,
      startEdit,
      cancelEdit,
      setFilter,
      setBudget,
      exportExpensesCSV,
    }),
    [addExpense, updateExpense, deleteExpense, startEdit, cancelEdit, setFilter, setBudget, exportExpensesCSV],
  )

  return (
    <ExpenseStateContext.Provider value={stateValue}>
      <ExpenseActionsContext.Provider value={actionsValue}>
        {children}
      </ExpenseActionsContext.Provider>
    </ExpenseStateContext.Provider>
  )
}

export function useExpenseState() {
  const context = useContext(ExpenseStateContext)
  if (!context) {
    throw new Error('useExpenseState must be used inside ExpenseProvider')
  }
  return context
}

export function useExpenseActions() {
  const context = useContext(ExpenseActionsContext)
  if (!context) {
    throw new Error('useExpenseActions must be used inside ExpenseProvider')
  }
  return context
}

export function useExpenses() {
  return { ...useExpenseState(), ...useExpenseActions() }
}
