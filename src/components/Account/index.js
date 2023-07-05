import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const Account = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="account">
      <Header />
      <div className="account-container">
        <div className="a-container">
          <h1 className="account-heading">Account</h1>
          <hr className="line" />
          <div className="membership-details">
            <p className="membership-heading">Member ship</p>
            <div>
              <p className="mail">Rahul@gmail.com</p>
              <p className="password">
                Password <span className="spa"> : **********</span>
              </p>
            </div>
          </div>

          <div className="membership-details">
            <p className="membership-heading">Plan details</p>
            <div className="premium">
              <p className="mail margin">Premium</p>
              <p className="password mar">Ultra HD</p>
            </div>
          </div>
          <hr className="line" />
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Account
