import './styles.css';
import getImages from './fetchImages';
import imagesTemplateHbs from './templates/imagesDesk.hbs';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form input');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', onSubmit);

const options = {
  page: 1,
  key: '19199017-0109ef76b5c2e4dd98ebacd3c',
};

function onSubmit(event) {
  event.preventDefault();
  const searchOptions = {
    ...options,
    query: inputRef.value,
  };
  getImages(searchOptions).then(handleResponse);
  options.page += 1;
}

function handleResponse(response) {
  const images = response.data.hits;
  showImages(images);
  console.log(images);
}

function showImages(images) {
  const markup = imagesTemplateHbs(images);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
