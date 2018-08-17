export default (state = {}, action) => {
  switch (action.type) {

    case 'USER_LOGIN':
      return {...state, login: action.payload};

    case 'USER_SESSION':
      return {...state, login: action.payload};

    case 'USER_POSTS':
      return {...state, posts: action.payload};

    case 'USER_LIST': 
      return {...state, list: action.payload};

    case 'CLEAR_USER_LIST':
      return { ...state, list: action.payload };

    case 'USER_REGISTER':
      return {...state, newUser: action.payload};

    case 'CLEAR_NEW_USER':
      return { ...state, newUser: action.payload };

    default:
      return state;
  }
}