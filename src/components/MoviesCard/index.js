import {Link} from 'react-router-dom'

import './index.css'

const MoviesCard = props => {
  const {eachMovie} = props
  const {posterPath, title, id} = eachMovie
  //   console.log(eachMovie)
  return (
    <Link to={`/movies/${id}`}>
      <li className="movie-card">
        <img className="image-fit" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}

export default MoviesCard
