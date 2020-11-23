import './styles.css';
import getImages from './apiService';
import imagesTemplateHbs from './templates/imagesDesk.hbs';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form input');
const galleryRef = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const clearBtnRef = document.querySelector('.clear-btn');
const loadMoreBtnRef = document.querySelector('.load-more-btn');
const loaderRef = document.querySelector('.lds-roller');

formRef.addEventListener('submit', onSubmit);
searchBtn.addEventListener('click', onSubmit);
loadMoreBtnRef.addEventListener('click', onSubmit);
clearBtnRef.addEventListener('click', handleCleanup);

let queryString = '';
function handleCleanup() {
  options.page = 1;
  galleryRef.innerHTML = '';
  inputRef.value = '';
  loadMoreBtnRef.classList.add('is-hidden');
}

const options = {
  page: 1,
  key: '19199017-0109ef76b5c2e4dd98ebacd3c',
};

function onSubmit(event) {
  event.preventDefault();
  loaderRef.classList.add('show');
  const amountRow = Math.floor(window.innerWidth / 354) * 3;
  console.log(amountRow);
  if (queryString !== inputRef.value) {
    options.page = 1;
    queryString = inputRef.value;
  }
  const searchOptions = {
    ...options,
    query: inputRef.value,
    perpage: amountRow,
  };
  options.page += 1;
  getImages(searchOptions).then(handleResponse).then(showLoadMoreBtn);
}

function showLoadMoreBtn() {
  loaderRef.classList.remove('show');
  if (options.page !== 1) {
    loadMoreBtnRef.classList.remove('is-hidden');
  }
  console.log(`inner Height : ${innerHeight}`);
  console.log(`inner Width : ${innerWidth}`);
  scroll({
    top: 99999999,
    behavior: 'smooth',
  });
}

function handleResponse(response) {
  const images = response.data.hits;
  showImages(images);
}

function showImages(images) {
  const markup = imagesTemplateHbs(images);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
