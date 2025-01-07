import axios from "axios"
axios.defaults.baseURL = 'https://gorest.co.in/public/v2/'
type Pagination = {
  currentPage: number;
  perPage: number;
}

export const getAllPosts = async (pagination: Pagination) => {
  const res = await axios.get('/posts', {
    params: {
      page: pagination.currentPage,
      per_page: pagination.perPage,
    },
  });
  const data = {
    'headers': res.headers,
    'data': res.data
  } 
  return data;
  // const res = await fetch('https://gorest.co.in/public/v2/posts')
  // return res.json();
}