import styles from './App.module.css'
import { ExpenseProvider } from './context/ExpenseContext'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'

function App() {
  return (
    <ExpenseProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>{import.meta.env.VITE_APP_APP_TITLE}</h1>
        </header>

        <div className={styles.mainLayout}>
          <aside>
            <ExpenseSummary />
          </aside>

          <main>
            <AddExpenseForm />
            <ExpenseList />
          </main>
        </div>
      </div>
    </ExpenseProvider>
  )
}

export default App
