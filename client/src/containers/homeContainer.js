import React from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';
import BookItem from '../widgets/bookItem';

class HomeContainer extends React.Component {

  componentWillMount() {
    this.props.getBooks(1, 0, 'ASC', 'id');
  }

  renderItems = (books) => {
    if (!books.books || !_.isArray(books.books)) return null
    return books.books.map((book, key) => {
      return <BookItem key={key} {...book}/> ;
    })
  }

  loadMore = () => {
    let count = this.props.books.books.length;
    this.props.getBooks(1, count, 'ASC', 'id', this.props.books.books);
  }

  render() {
    console.log(this.props)
    return(
      <div>
        {this.renderItems(this.props.books)}
        <div 
          className="loadmore"
          onClick={()=>this.loadMore()}
        >
          Load More
        </div>
      </div>
    )
  }

}
 
const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);