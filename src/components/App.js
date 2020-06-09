import React from 'react'
import * as BooksAPI from '../BooksAPI'
import './App.css'
import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  handleCloseSearch = () => {
    this.setState({ showSearchPage: false });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <Router>

        <Route path="/" exact render={() => (
          <Dashboard books={this.state.books}/>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks />
        )} />

      </Router>
    )
  }
}

export default BooksApp