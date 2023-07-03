import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_a5YjdAGQbur4xVGiBRUyW0CPAqe5jfl0ZhIshtOR7fSzF2BTR2bKU6rF28hxSsC0';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
