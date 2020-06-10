import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'

class SearchBooks extends Component {
    state = {
        books: [],
        query: "",
    }

    getBooksFromApi = (query) => {
        this.props.BooksAPI.search(query).then((books) => {

            let showBooks = true

            try {
                showBooks = !(books.error)
            } catch (error) {
                showBooks = !((typeof books === 'undefined'))
            }

            this.setState((prevState) => {
                return {
                    query,
                    books: showBooks ? books : [],
                }
            })
        })
    }

    updateQuery = (e) => {
        const query = e.target.value.trim();

        if (query === "") {
            this.setState({ query, books: [] })
        }

        this.getBooksFromApi(query)

    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />

                    <div className="search-books-input-wrapper">
                          <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.updateQuery}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.length > 0
                            ? <div>
                                {this.state.books.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        handleUpdateBook={this.props.handleUpdateBook}
                                    />

                                ))}
                            </div>
                            : <div>Not matching books</div>
                        }
                        {/* {this.state.books.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                handleUpdateBook={this.props.handleUpdateBook}
                            />

                        ))} */}
                    </ol>
                </div>
            </div>

        )
    }
}

export default SearchBooks;

