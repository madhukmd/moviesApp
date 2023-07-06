import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomeBanner from '../HomeBanner'
import Header from '../Header'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Toprated from '../Toprated'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    status: apiStatusConstants.initial,
    banner: '',
  }

  componentDidMount() {
    this.getHome()
  }

  getHome = async () => {
    this.setState({
      status: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    // console.log(data)
    if (response.ok) {
      const data = await response.json()
      const dataLength = data.results.length
      const bannerPoster = data.results[Math.floor(Math.random() * dataLength)]
      const updatedData = {
        id: bannerPoster.id,
        backdropPath: bannerPoster.backdrop_path,
        title: bannerPoster.title,
        overview: bannerPoster.overview,
        posterPath: bannerPoster.poster_path,
      }
      //   console.log(updatedData)

      this.setState({
        banner: {...updatedData},
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {banner} = this.state
    return <HomeBanner banner={banner} />
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="layout">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onRetry = () => {
    this.getHome()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderBannerContainer = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.renderBannerContainer()}
        <TrendingNow />
        <Toprated />
        <Originals />
        <Footer />
      </div>
    )
  }
}
export default Home
