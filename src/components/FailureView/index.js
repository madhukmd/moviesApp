import './index.css'
import Header from '../Header'

const FailureView = props => {
  const {onRetry} = props
  const getdata = () => onRetry()

  return (
    <>
      <Header />
      <div className="failure-view">
        <img
          className="failure-img"
          alt="failure view"
          src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688409037/Group_qnjcsr.png"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button onClick={getdata} className="retry-btn" type="button">
          Try Again
        </button>
      </div>
    </>
  )
}

export default FailureView
