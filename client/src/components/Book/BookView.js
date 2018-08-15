import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBookWithReviewer, clearBookWithReviewer } from '../../actions';

class BookView extends React.Component {

  componentWillMount() {
    this.props.getBookWithReviewer(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearBookWithReviewer();
  }

  renderBook = (data) => {
    return (
      <div className="br_container">
        <div className="br_header">
          <h2>{data.book.name}</h2>
          <h5>{data.book.author}</h5>
          <div className="br_reviewer">
            <span>Review By:</span> {data.user.username}
          </div>
          <div className="br_review">
            {data.book.review}
          </div>
          <div className="br_box">
            <div className="left">
              <div>
                <span>Pages: </span> {data.book.pages}
              </div>
              <div>
                <span>Price: </span> {data.book.price}
              </div>
            </div>
            <div className="right">
              <span>Rating: </span> {data.book.rating}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.book || !this.props.user) return null;
    return(
      <div>
        {this.renderBook(this.props)}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    book: state.books.book,
    user: state.books.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getBookWithReviewer,
    clearBookWithReviewer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookView);