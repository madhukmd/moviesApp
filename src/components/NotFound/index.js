import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notFound-container">
    <h1 className="notFound-heading">Lost Your Way ?</h1>
    <p className="notFound-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-to-home" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
