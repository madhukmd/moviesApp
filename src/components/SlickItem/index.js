import {Link} from 'react-router-dom'

import './index.css'

const SlickItem = props => {
  const {eachMovie} = props
  const {posterPath, title, id} = eachMovie
  return (
    <Link to={`/movies/${id}`}>
      <li className="slick-card">
        <img className="slick-image-fit" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}

export default SlickItem
