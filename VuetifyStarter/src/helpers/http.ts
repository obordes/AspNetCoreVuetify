import Axios from 'axios';

export const HTTP = Axios.create({
    baseURL: `http://localhost:61138/`,
    headers: {
        'Content-Type': 'application/json',
    }
});
