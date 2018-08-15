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