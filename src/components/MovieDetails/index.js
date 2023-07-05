import {Component} from 'react'
import {format} from 'date-fns'

import Cookies from 'js-cookie'
import Header from '../Header'
import MoviesCard from '../MoviesCard'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const GenreList = props => {
  const {eachItem} = props
  const {name} = eachItem
  return <li>{name}</li>
}

const Languages = props => {
  const {eachItem} = props
  const {englishName} = eachItem
  return <li>{englishName}</li>
}

class MovieDetails extends Component {
  state = {
    status: apiStatusConstants.initial,
    moviesDetailsList: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    // this.setState({renderStatus: renderConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(movieDetailsApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedGenreList = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))
      const updatedSimilarMovies = data.movie_details.similar_movies.map(
        eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }),
      )
      const updatedSpokenLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: updatedGenreList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: updatedSimilarMovies,
        spokenLanguages: updatedSpokenLanguages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        moviesDetailsList: updatedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderMovieSuccessView = () => {
    const {moviesDetailsList} = this.state
    console.log(moviesDetailsList)
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = moviesDetailsList
    const Hours = Math.floor(runtime / 60)
    const Minutes = runtime % 60
    const runTimeInHoursAndMinutes = `${Hours}h ${Minutes}m`
    const certificate = adult ? 'A' : 'U/A'
    const releasedYear = format(new Date(releaseDate), 'yyyy')
    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <div className="similar">
        <div
          className="movie-detail-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="movie-details">
            <div className="movie-details-content-container">
              <h1 className="movie-heading">{title}</h1>
              <div className="more-details">
                <p className="format">{runTimeInHoursAndMinutes}</p>
                <p className="format border">{certificate}</p>
                <p className="format">{releasedYear}</p>
              </div>
              <p className="overView">{overview}</p>
              <button type="button" className="play-btn">
                Play
              </button>
            </div>
            <div className="information">
              <div className="info-details">
                <h1 className="format-heading">Genres</h1>
                <ul className="listItems">
                  {genres.map(eachItem => (
                    <GenreList eachItem={eachItem} key={eachItem.id} />
                  ))}
                </ul>
              </div>
              <div className="info-details">
                <h1 className="format-heading">Audio Available</h1>
                <ul className="listItems">
                  {spokenLanguages.map(eachItem => (
                    <Languages eachItem={eachItem} key={eachItem.id} />
                  ))}
                </ul>
              </div>
              <div className="info-details">
                <h1 className="format-heading">Rating Count</h1>
                <p className="format-para">{voteCount}</p>
                <h1 className="format-heading">Rating Average</h1>
                <p className="format-para">{voteAverage}</p>
              </div>
              <div className="info details">
                <h1 className="format-heading">Budget</h1>
                <p className="format-para">{budget}</p>
                <h1 className="format-heading">Release Date</h1>
                <p className="format-para">{releaseDateFormat}</p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="moreLike">More like this</h1>
        <ul className="similar-container">
          {similarMovies.map(eachMovie => (
            <MoviesCard key={eachMovie.id} eachMovie={eachMovie} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderMoviesDetails = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderMovieSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderMoviesDetails()}</>
  }
}
export default MovieDetails
