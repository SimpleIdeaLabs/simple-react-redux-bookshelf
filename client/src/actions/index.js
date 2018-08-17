import axios from 'axios';

export const getBooks = (
  take = 10,
  skip = 0,
  sortBy = 'ASC',
  sortColumn = 'id',
  bookList = []
) => {  

  const request = axios
                    .get(`/api/books?skip=${skip}&take=${take}&sortBy=${sortBy}&sortColumn=${sortColumn}`)
                    .then((response) => {
                      if (bookList.length > 0) {
                        return [...bookList,...response.data];
                      } else {
                        return response.data;
                      }
                    });

  return {
    type: 'GET_BOOKS',
    payload: request    
  }
}

export const getBookWithReviewer = (id) => {
  const request = axios.get(`/api/books/${id}`);
  return (dispatch) => {
    request.then(({data}) => {
      let book = data;
      axios
        .get(`/api/users/${book.userId}`)
        .then((response) => {
          const user = response.data;
          const payload = {
            book,
            user
          };
          dispatch({
            type: 'GET_BOOK_WITH_REVIEWER',
            payload: payload
          });
        });
    });
  }
}

export const clearBookWithReviewer = () => {
  return {
    type: 'CLEAR_BOOK_WITH_REVIEWER',
    payload: {
      user: {},
      book: {}
    }
  }
}

export const addBook = (book) => {
  const request = axios.post(`/api/books`, book)
    .then((response) => response.data);
  return {
    type: 'ADD_BOOK',
    payload: request
  }
}

export const getBook = (id) => {
  const request = axios.get(`/api/books/${id}`)
    .then((response) => response.data);
  return {
    type: 'GET_BOOK',
    payload: request
  }
}

export const updateBook = (id, data) => {
  const request = axios.patch(`/api/books/${id}`, {
    ...data
  }).then((response) => response.data);
  return {
    type: 'UPDATE_BOOK',
    payload: request
  }
}

export const deleteBook = (id) => {
  const request = axios.delete(`/api/books/${id}`)
    .then((response) => response.data);
  return {
    type: 'DELETE_BOOK',
    payload: { id }
  }
}

// USER ACTIONS
export const loginUser = (credentials) => {
  const request = axios.post(`/api/auth/login`, {
    username: credentials.username,
    password: credentials.password
  }).then((response) => {
    return response.data;
  }).catch((e) => {
    return {
      token: null,
      error: 'Login failed'
    }
  })

  return {
    type: 'USER_LOGIN',
    payload: request
  }
}

export const checkAuth = () => {
  const request = axios.get(`/api/auth/session`)
    .then((response) => response.data)
    .catch((e) => {
      return {
        token: null,
        error: 'You are not logged in'
      } 
    });
  return {
    type: 'USER_SESSION',
    payload: request
  }
}

export const getUserPosts = () => {
  const request = axios.get(`/api/users/posts`)
    .then((response) => response.data);

  return {
    type: 'USER_POSTS',
    payload: request
  }
}

export const getUsers = () => {
  const request = axios.get(`/api/users`)
    .then((response) => response.data);
  return {
    type: 'USER_LIST',
    payload: request
  }
}

export const clearUsersList = () => {
  return {
    type: 'CLEAR_USER_LIST',
    payload: null
  }
}

export const registerUser = (user) => {
  const request = axios.post(`/api/users`, user).then((response) => response.data);
  return {
    type: 'USER_REGISTER',
    payload: request
  }
}

export const clearNewUser = () => {
  return {
    type: 'CLEAR_NEW_USER',
    payload: null
  }
  
}