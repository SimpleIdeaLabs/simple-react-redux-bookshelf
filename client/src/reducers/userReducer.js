export default (state = {}, action) => {
  switch (action.type) {

    case 'USER_LOGIN':
      return {...state, login: action.payload};

    case 'USER_SESSION':
      return {...state, login: action.payload};

    case 'USER_POSTS':
      return {...state, posts: action.payload};

    default:
      return state;
  }
}