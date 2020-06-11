import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookself from './Bookshelf';

const Dashboard = (props) => {
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {props.books.length > 0 ? (
                                <div>
                                    <Bookself
                                        title="Currently Reading"
                                        books={props.books.filter(
                                            (book) => { return book.shelf === "currentlyReading" }
                                        )}
                                        handleUpdateBook={props.handleUpdateBook}
                                    />
                                    <Bookself
                                        title="Want to Read"
                                        books={props.books.filter(
                                            (book) => { return book.shelf === "wantToRead" }
                                        )}
                                        handleUpdateBook={props.handleUpdateBook}

                                    />
                                    <Bookself
                                        title="Read"
                                        books={props.books.filter(
                                            (book) => { return book.shelf === "read" }
                                        )}
                                        handleUpdateBook={props.handleUpdateBook}
                                    />
                                </div>
                            ) : null
                        }

                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                    ></Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;