import {Component} from 'react' //
import {Route, Switch, Redirect} from 'react-router-dom'

import AppContext from './context/AppContext'

import './App.css'
import LoginForm from './components/LoginPage/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/HomePage'
import Trending from './components/TrendingPage'
import Gaming from './components/GamingPage'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/ErrorPages/NotFound'

// TODO: Add redirect in not-found.
// TODO: move banner to Home and adjust home styling.

class App extends Component {
  state = {isDark: false, activeTab: 'HOME', savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  changeTab = val => {
    this.setState({activeTab: val})
  }

  render() {
    const {isDark, activeTab, savedVideosList} = this.state
    return (
      <AppContext.Provider
        value={{
          isDark,
          activeTab,
          savedVideosList,
          changeTab: this.changeTab,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" component={NotFound} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
