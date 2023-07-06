import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SlickCard from '../SlickCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    status: apiStatusConstants.initial,
    trendingList: [],
  }

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      // console.log(updatedData)
      this.setState({
        trendingList: updatedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  renderTrendingList = () => {
    const {trendingList} = this.state
    return (
      <div className="slick-container">
        <h1 className="all-heading">Trending Now</h1>
        <SlickCard trends={trendingList} />
      </div>
    )
  }

  retryTrending = () => {
    this.getTrending()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="error-image"
        alt="failure view"
        src=" https://res.cloudinary.com/dtpjzzexl/image/upload/v1688501994/alert-triangle_sxmap5.png"
      />
      <p className="error-m">Something went wrong. Please try again</p>
      <button onClick={this.retryTrending} className="error-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderTnProgress = () => (
    <div className="failure-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrending = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderTrendingList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTnProgress()
      default:
        return null
    }
  }

  render() {
    return <div className="trending-container">{this.renderTrending()}</div>
  }
}
export default TrendingNow
