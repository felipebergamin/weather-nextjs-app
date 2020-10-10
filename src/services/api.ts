import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  params: {
    appid: {
      appid: process.env.API_KEY,
    },
  },
});
