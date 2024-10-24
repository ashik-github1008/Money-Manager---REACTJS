import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactions: [],
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type, totalBalance, totalIncome, totalExpenses} =
      this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type,
    }

    let updatedBalance = totalBalance
    let updatedIncome = totalIncome
    let updatedExpenses = totalExpenses

    if (type === 'INCOME') {
      updatedIncome += newTransaction.amount
      updatedBalance += newTransaction.amount
    } else if (type === 'EXPENSES') {
      updatedExpenses += newTransaction.amount
      updatedBalance -= newTransaction.amount
    }

    this.setState(prevState => ({
      transactions: [...prevState.transactions, newTransaction],
      totalBalance: updatedBalance,
      totalIncome: updatedIncome,
      totalExpenses: updatedExpenses,
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = (id, type, amount) => {
    this.setState(prevState => {
      const updatedTransactions = prevState.transactions.filter(
        transaction => transaction.id !== id,
      )

      let updatedIncome = prevState.totalIncome
      let updatedExpenses = prevState.totalExpenses
      let updatedBalance = prevState.totalBalance

      if (type === 'Income') {
        updatedIncome -= amount
        updatedBalance -= amount
      } else{
        updatedExpenses -= amount
        updatedBalance += amount
      }

      return {
        transactions: updatedTransactions,
        totalIncome: updatedIncome,
        totalExpenses: updatedExpenses,
        totalBalance: updatedBalance,
      }
    })
  }

  getTransactionTypeDisplayText = type => {
    const transactionType = transactionTypeOptions.find(
      option => option.optionId === type,
    )
    return transactionType ? transactionType.displayText : type
  }

  render() {
    const {
      title,
      amount,
      type,
      transactions,
      totalIncome,
      totalExpenses,
      totalBalance,
    } = this.state

    // console.log(transactions)

    return (
      <div className="app-container">
        <div className="main-container">
          <div className="name-container mb-5">
            <h1 className="name">Hi, Richard</h1>
            <p className="greeting">
              Welcome back to your <span className="span">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBalance={totalBalance}
          />
          <div className="form-history-container mt-5">
            <form className="form-container mr-5">
              <h1 className="form-heading mb-4">Add Transaction</h1>
              <div className="input-container d-flex flex-column mb-3">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  placeholder="TITLE"
                  className="input"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-container d-flex flex-column mb-3">
                <label htmlFor="amount" className="label">
                  AMOUNT
                </label>
                <input
                  id="amount"
                  placeholder="AMOUNT"
                  className="input"
                  value={amount}
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label className="label">TYPE</label>
                <select
                  className="input"
                  value={type}
                  onChange={this.onChangeType}
                >
                  {transactionTypeOptions.map(option => (
                    <option key={option.optionId} value={option.optionId}>
                      {option.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary add-btn"
                type="submit"
                onClick={this.addTransaction}
              >
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="form-heading mb-4">History</h1>
              <li className="history-heading-container">
                <p className="history-heading">Title</p>
                <p className="mr-5">Amount</p>
                <p className="ml-2">Type</p>
              </li>
              <ul className="history-list-container">
                {transactions.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transaction={{
                      ...eachTransaction,
                      type: this.getTransactionTypeDisplayText(
                        eachTransaction.type,
                      ),
                    }}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
