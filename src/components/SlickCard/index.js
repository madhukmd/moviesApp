import {Component} from 'react'
import Slider from 'react-slick'
import SlickItem from '../SlickItem'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 398,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class SlickCard extends Component {
  render() {
    const {trends} = this.props
    return (
      <Slider className="slick" {...settings}>
        {trends.map(eachMovie => (
          <SlickItem eachMovie={eachMovie} key={eachMovie.id} />
        ))}
      </Slider>
    )
  }
}
export default SlickCard
