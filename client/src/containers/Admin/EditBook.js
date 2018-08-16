import React from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getBook, updateBook, deleteBook } from '../../actions';

class EditBook extends React.PureComponent {
  
  state = {
    formData: {
      id: this.props.match.params.id,
      name:'',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  }

  notify(msg) {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state.formData,
      userId: this.props.userData.id
    };
    this.props.updateBook(this.props.match.params.id, payload);
    this.notify("Book Updated!");
  }

  deleteBook = () => {
    const id = this.props.match.params.id;
    this.props.deleteBook(id);
    this.notify("Book Deleted!");
    this.props.history.push('/');
  }

  handleInputChange = (e, name) => {
    const newFormData = {
      ...this.state.formData
    };
    newFormData[name] = e.target.value;
    this.setState({ formData: newFormData});
  }

  componentWillMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.book) {
      let book = nextProps.book;
      this.setState({
        formData: {
          name: book.name,
          author: book.author,
          review: book.review,
          pages: book.pages,
          rating: book.rating,
          price: book.price
        }
      })
    }
  }

  render() {
    console.log(this.props, 'RENDER');
    return (
      <div className="rl_container article">
        <ToastContainer />
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Edit Review</h2>
          <div className="form_element">
            <input type="text" placeholder="Enter name..." 
              value={this.state.formData.name}
              onChange={(e) => this.handleInputChange(e, 'name')}
            />
          </div>
          <div className="form_element">
            <input type="text" placeholder="Enter author..."
              value={this.state.formData.author}
              onChange={(e) => this.handleInputChange(e, 'author')}
            />
          </div>
          <div className="form_element">
           <textarea value={this.state.formData.review} 
              onChange={(e) => this.handleInputChange(e, 'review')}
           />
          </div>
          <div className="form_element">
            <input type="text" placeholder="Enter pages..."
              value={this.state.formData.pages}
              onChange={(e) => this.handleInputChange(e, 'pages')}
            />
          </div>
          <div className="form_element">
            <select 
              value={this.state.formData.rating}
              onChange={(e) => this.handleInputChange(e, 'rating')}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="form_element">
            <input type="text" placeholder="Enter price..."
              value={this.state.formData.price}
              onChange={(e) => this.handleInputChange(e, 'price')}
            />
          </div>
          <button type="submit">
            Edit Review  
          </button>
          <div className="delete_post" onClick={()=>this.deleteBook()}>
            <div className="button">
              Delete Review
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    book: state.books.book,
    deletedBook: state.books.deleteBook
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getBook,
    updateBook,
    deleteBook
  }, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);