import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI'
import './App.css'

import Dashboard from './Dashboard';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  handleCloseSearch = () => {
    this.setState({ showSearchPage: false });
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.updateBooks()
  }

  handleUpdateBook = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf)
      .then((res) => {
        // console.log('res: ', res);
        // console.log('updatedBook: ', updatedBook);

        let bookInState = false
        let updatedBooks = this.state.books.map((book) => {
          if (book.id === updatedBook.id) {
            bookInState = true
            return {
              ...book,
              'shelf': shelf,
            }
          } else {
            return book
          }
        })


        if (!bookInState) {
          updatedBooks = updatedBooks.concat[
            {
              ...updatedBook,
              'shelf': shelf
            }
          ]
        }

        console.log(updatedBooks)

        this.setState({
          books: updatedBooks,
        })
      })
  }


  render() {
    return (
      <Router>

        <Route path="/" exact render={() => (
          <Dashboard books={this.state.books} handleUpdateBook={this.handleUpdateBook} />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks handleUpdateBook={this.handleUpdateBook} BooksAPI={BooksAPI} shelfBooks={this.state.books} />
        )} />

      </Router>
    )
  }
}

export default BooksApp
