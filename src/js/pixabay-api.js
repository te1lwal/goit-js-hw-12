import axios from 'axios';

const API_KEY = '47675764-87f77a78ce9e5d021dcf81100';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 15,
  });

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}