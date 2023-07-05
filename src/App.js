import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Search from './components/Search'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/popular" component={Popular} />
      <Route exact path="/movies/:id" component={MovieDetails} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)
export default App