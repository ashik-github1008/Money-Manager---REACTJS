// Write your code here
import '../MoneyManager/index.css'

const MoneyDetails = props => {
  const {totalIncome, totalExpenses, totalBalance} = props

  return (
    <div className="money-details-container">
      <div className="money-detail-container mr-5">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="balance"
          className="card-img mr-4"
        />
        <div className="money-computed-container">
          <p className="your-balance mb-1">Your Balance</p>
          <p
            className="rupees-in-card"
            data-testid="balanceAmount"
          >{`Rs ${totalBalance}`}</p>
        </div>
      </div>
      <div className="money-detail-container mr-5 income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="card-img mr-4"
        />
        <div className="money-computed-container">
          <p className="your-balance mb-1">Your Income</p>
          <p
            className="rupees-in-card"
            data-testid="incomeAmount"
          >{`Rs ${totalIncome}`}</p>
        </div>
      </div>
      <div className="money-detail-container mr-5 expense">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="card-img mr-4"
        />
        <div className="money-computed-container">
          <p className="your-balance mb-1">Your Expenses</p>
          <p
            className="rupees-in-card"
            data-testid="expensesAmount"
          >{`Rs ${totalExpenses}`}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
