import axios from 'axios'

const base_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    url: base_URL,
    params: {
      maxResults: '50' // number of results
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY, // your api key
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchFromAPI = async (url) =>{
    const {data} = await axios.get(`${base_URL}/${url}`, options);
    return data;
}