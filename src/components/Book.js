import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Book extends Component {

    updateBook = (e) => {
        const shelf = e.target.value
        const book = this.props.book

        // console.log('book: ', this.props.book)
        // console.log('shelf: ', shelf)
        this.props.handleUpdateBook(book, shelf)
        this.props.history.push('/')

    }
    
    render() {
        const { book } = this.props
        const bookCover = book.hasOwnProperty('imageLinks')
            ? book.imageLinks.smallThumbnail
            : process.env.PUBLIC_URL + '../no-cover.jpg';
        const defaultValue = book.hasOwnProperty('shelf')
            ? book.shelf
            : "move"
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${bookCover})`
                            }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.updateBook} defaultValue={defaultValue}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.length > 0 && <div className="book-authors">{book.authors.join(", ")}</div>}

                </div>
            </li>
        )
    }
}

export default withRouter(Book);