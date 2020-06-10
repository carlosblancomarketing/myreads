import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'

class SearchBooks extends Component {
    state = {
        books: [],
        query: "",
    }
    closeSearch = () => {
        this.props.handleCloseSearch();
    }

    handleUpdateQuery = (e) => {
        
        this.state.timeout = setTimeout(this.updateQuery(e), 1000)
    }

    updateQuery = (e) => {
        let timeout;
        const query = e.target.value.trim();
        clearTimeout(this.state.timeout);

        if (query === "") {
            this.setState({query, books:[]})
        }

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

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />

                    <div className="search-books-input-wrapper">
                        {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleUpdateQuery}
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

