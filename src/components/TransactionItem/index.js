// Write your code here
import './index.css'
import '../MoneyManager/index.css'

const TransactionItem = props => {
  const {transaction, onDeleteTransaction} = props
  const {id, title, amount, type} = transaction

  const deleteTransaction = () => {
    onDeleteTransaction(id, type, amount)
  }

  return (
    <li className="transaction-item history-heading-container">
      <p className="history-heading mr-5">{title}</p>
      <p className="mr-5 ml-2">{`Rs ${amount}`}</p>
      <p className="ml-2">{type}</p>
      <button
        className="delete-btn"
        type="button"
        onClick={deleteTransaction}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
