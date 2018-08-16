import React from 'react';

class AddReview extends React.Component {
  
  state = {
    formData: {
      name:'',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state.formData)
  }

  handleInputChange = (e, name) => {
    const newFormData = {
      ...this.state.formData
    };
    newFormData[name] = e.target.value;
    this.setState({ formData: newFormData});
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Add Review</h2>
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
            Add Review  
          </button>
        </form>
      </div>
    )
  }
}

export default AddReview;