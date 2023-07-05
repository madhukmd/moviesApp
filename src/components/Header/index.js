import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    mobileNav: false,
    inputSearch: '',
  }

  onClickMobileMenu = () => {
    this.setState({mobileNav: true})
  }

  onClickHideMobile = () => {
    this.setState({mobileNav: false})
  }

  onchangeSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  enterEvent = () => {
    const {inputSearch} = this.state
    const {getMovies} = this.props
    if (inputSearch !== '') {
      getMovies(inputSearch)
    }
  }

  render() {
    const {mobileNav, inputSearch} = this.state
    const {searchBar} = this.props
    const add = searchBar ? 'addcolor' : null
    const bar = searchBar ? 'bar' : null

    return (
      <nav className="nav-container">
        <div className="nav-link-desk-container">
          <div className="img-links-container">
            <img
              src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688307049/Group_7399_gtyxb6.png"
              alt="login website logo"
              className="header-logo"
            />
            <ul className="links">
              <Link to="/" className="nav-link">
                <li className="link-heading">Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className="link-heading">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="profile-container">
            <div className={`input-search-container ${bar}`}>
              {searchBar && (
                <input
                  value={inputSearch}
                  type="search"
                  className="input-search"
                  onChange={this.onchangeSearch}
                />
              )}
              <Link to="/search">
                <button
                  type="button"
                  className={`input-icon ${add}`}
                  onClick={this.enterEvent}
                >
                  <HiOutlineSearch size={20} color="#fff" />
                </button>
              </Link>
            </div>

            <Link to="/account">
              <img
                className="avatar"
                alt="profile"
                src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688327359/Avatar_rscj2h.png"
              />
            </Link>
            <MdMenuOpen
              size={30}
              color="white"
              className="open-menu-icon"
              onClick={this.onClickMobileMenu}
            />
          </div>
        </div>
        {mobileNav && (
          <div className="mobile-container">
            <ul className="mobile-menu">
              <Link to="/" className="nav-link">
                <li>Home</li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li>Popular</li>
              </Link>
              <Link to="/account">
                <li>Account</li>
              </Link>
              <button type="button" className="cross-button">
                <ImCross
                  size={15}
                  color="#ffffff"
                  onClick={this.onClickHideMobile}
                />
              </button>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
