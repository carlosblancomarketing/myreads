import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  handleCloseSearch = () => {
    this.setState({ showSearchPage: false });
  }

  render() {
    return (
      <Router>
        
        <Route path="/" exact render={() => (
          <Dashboard />
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks />
        )}/>
        
      </Router>
    )
  }
}

export default BooksApp
