import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = (props) => {
  return (
    <Link to={`/api/books/${props.id}`} className="book_item">
      <div className="book_header">
        <h2>{props.name}</h2>
      </div>
      <div className="book_items">
        <div className="book_author">
          {props.author}
        </div>
        <div className="book_bubble">
          <strong>Price</strong> $ {props.price}
        </div>
        <div className="book_bubble">
          <strong>Pages</strong> $ {props.pages}
        </div>
        <div className="book_bubble rating">
          <strong>Rating</strong> $ {props.rating}
        </div>
      </div>
    </Link>
  )
}

export default BookItem;