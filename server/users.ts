import axios from "axios"
axios.defaults.baseURL = 'https://gorest.co.in/public/v2/'
type User = {
  username: string;
  token: string;
}

export const getUser = async (user: User) => {
    const res = await axios.get('/users', {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });
    return res.data;
}