export default (state={}, action) => {
  switch(action.type) {
    
    case 'GET_BOOKS':
      return {...state, books: action.payload};

    case 'GET_BOOK':
      return {...state, book: action.payload};

    case 'UPDATE_BOOK':
      return {...state, newBook: action.payload};

    case 'DELETE_BOOK':
      return {...state, deletedBook: action.payload};
    
    case 'GET_BOOK_WITH_REVIEWER':
      return {
        ...state, 
        book: action.payload.book,
        user: action.payload.user
      };

    case 'CLEAR_BOOK_WITH_REVIEWER':
      return {
        ...state,
        book: action.payload.book,
        user: action.payload.user
      };

    case 'ADD_BOOK':
      return {
        ...state,
        newBook: action.payload
      }

    default:
      return state;
  }
}