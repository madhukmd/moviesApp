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
const searchBar = true

class Search extends Component {
  state = {
    status: apiStatusConstants.initial,
    moviesList: [],
    inputSearch: '',
    start: 1,
    showLimit: 12,
    startInd: 0,
  }

  onSearchChange = text => {
    this.setState({InputSearch: text})
  }

  getMovies = async inputSearch => {
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${inputSearch}`
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
        moviesList: MoviesDataList,
        status: apiStatusConstants.success,
        inputSearch,
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

  prevLimit = () => {
    const {start} = this.state
    if (start > 1) {
      this.setState(prev => ({
        start: prev.start - 1,
        startInd: prev.startInd - 12,
      }))
    }
  }

  nextLimit = limit => {
    const {start} = this.state
    if (start < limit) {
      this.setState(prev => ({
        start: prev.start + 1,
        startInd: prev.startInd + 12,
      }))
    }
  }

  renderMoviesList = () => {
    const {moviesList, start, startInd, showLimit} = this.state
    const limit = Math.ceil(moviesList.length / 12)
    const searchData = moviesList.slice(startInd, start * showLimit)
    return moviesList.length > 0 ? (
      <>
        <ul className="search-movies-container">
          {searchData.map(eachMovie => (
            <MoviesCard key={eachMovie.id} eachMovie={eachMovie} />
          ))}
        </ul>
        <div className="pagination-container">
          <img
            src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688653171/Icon_qxzjqs.png"
            alt="prev"
            onClick={this.prevLimit}
          />
          <p className="pages">
            {start} of {limit}
          </p>
          <img
            src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688653253/Icon_brqgzc.png"
            alt="next"
            onClick={() => this.nextLimit(limit)}
          />
        </div>
      </>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {inputSearch} = this.state
    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dtpjzzexl/image/upload/v1688408283/Group_7394_b7gt0t.png"
        />
        <p className="no-results">
          Your search for {inputSearch} did not find any matches.
        </p>
      </div>
    )
  }

  onRetryResults = () => {
    this.getMovies('venom')
  }

  renderFailureView = () => <FailureView onRetry={this.onRetryResults} />

  renderMovies = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderMoviesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTnProgress()
      default:
        return null
    }
  }

  render() {
    const {InputSearch} = this.state
    return (
      <div className="Search-container">
        <Header
          onSearchChange={this.onSearchChange}
          getMovies={this.getMovies}
          InputSearch={InputSearch}
          searchBar={searchBar}
        />
        {this.renderMovies()}
      </div>
    )
  }
}
export default Search
