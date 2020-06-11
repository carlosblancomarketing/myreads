import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'underscore';
import Book from './Book'

class SearchBooks extends Component {
    state = {
        books: [],
        query: "",
    }

    getBooksFromApi = (query) => {
        let showBooks = true
        let newBooks = []

        this.props.BooksAPI.search(query).then((books) => {

            try {
                showBooks = !(books.error)
                
                let shelfBooksIds = {}
                this.props.shelfBooks.map((book) => {
                    shelfBooksIds[book.id] = book.shelf
                })

                // console.log(shelfBooksIds)

                newBooks = books.map((book) => {
                    let newBookObj = {};
                    book.id in shelfBooksIds 
                        ? newBookObj = {...book, 'shelf':shelfBooksIds[book.id]} 
                        : newBookObj = {...book, 'shelf':'none'}

                    return newBookObj
                })

                // console.log(newBooks);


            } catch (error) {
                showBooks = !((typeof books === 'undefined'))
            }

            this.setState((prevState) => {
                return {
                    query,
                    books: showBooks ? newBooks : [],
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

    handleUpdateQuery = (e) => {
        debounce(this.updateQuery(e), 250)
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
                                        shelfBooks={this.props.shelfBooks}
                                    />

                                ))}
                            </div>
                            : <div>Not matching books</div>
                        }
                       
                    </ol>
                </div>
            </div>

        )
    }
}

export default SearchBooks;

