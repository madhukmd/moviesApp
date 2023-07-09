import {Component} from 'react'
import Header from '../Header'
import './index.css'

class HomeBanner extends Component {
  state = {
    wid: 577,
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.test)
  }

  test = () => {
    const rrr = window.innerWidth
    if (rrr) {
      this.setState({wid: rrr})
    }
    this.setState({wid: rrr})
  }

  render() {
    window.addEventListener('resize', this.test)
    const {wid} = this.state
    const {banner} = this.props
    const {posterPath, backdropPath, title, overview} = banner

    const bg = wid < 576 ? posterPath : backdropPath
    return (
      <div
        className="test"
        alt={title}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="content-container">
          <div className="description-container">
            <h1 className="title-head">{title}</h1>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeBanner
