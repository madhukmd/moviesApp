import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import MoviesCard from '../MoviesCard'
import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    status: apiStatusConstants.initial,
    popularList: [],
  }

  componentDidMount() {
    this.getPopular()
  }

  getPopular = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(searchApi, options)

    if (response.ok) {
      const data = await response.json()
      const MoviesDataList = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        popularList: MoviesDataList,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderTnProgress = () => (
    <div className="load-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularList = () => {
    const {popularList} = this.state
    return (
      <ul className="search-movies-container">
        {popularList.map(eachMovie => (
          <MoviesCard key={eachMovie.id} eachMovie={eachMovie} />
        ))}
      </ul>
    )
  }

  onRetry = () => {
    this.getPopular()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderPopular = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderPopularList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTnProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Search-container">
        <Header />
        {this.renderPopular()}
      </div>
    )
  }
}
export default Popular
