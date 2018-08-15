import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBookWithReviewer } from '../../actions';

class BookView extends React.Component {

  componentWillMount() {
    this.props.getBookWithReviewer(this.props.match.params.id);
  }

  render() {
    if (!this.props.book) return null;
    return(
      <div>
        { this.props.book.name }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    book: state.books.book
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getBookWithReviewer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookView);