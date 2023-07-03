import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function createOptionElement(breed) {
  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  breedSelect.appendChild(option);
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>
  `;
}

function loadBreeds() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  error.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => createOptionElement(breed));
      loader.style.display = 'none';
      breedSelect.style.display = 'block';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

function handleBreedSelect() {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat[0]);
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

breedSelect.addEventListener('change', handleBreedSelect);

loadBreeds();
