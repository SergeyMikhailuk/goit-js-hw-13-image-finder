import './styles.css';
import './loader.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import getImages from './apiService';
import imagesTemplateHbs from './templates/imagesDesk.hbs';
import * as basicLightbox from 'basiclightbox';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form input');
const galleryRef = document.querySelector('.gallery');
const searchBtnRef = document.querySelector('.search-btn');
const clearBtnRef = document.querySelector('.clear-btn');
const loadMoreBtnRef = document.querySelector('.load-more-btn');
const loaderRef = document.querySelector('.lds-roller');

formRef.addEventListener('submit', onSubmit);
searchBtnRef.addEventListener('click', onSubmit);
loadMoreBtnRef.addEventListener('click', onSubmit);
clearBtnRef.addEventListener('click', handleCleanup);
galleryRef.addEventListener('click', openModal);

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

  getImages(searchOptions).then(showImages).then(showLoadMoreBtn);
}

function showLoadMoreBtn() {
  loaderRef.classList.remove('show');
  if (options.page !== 1) {
    loadMoreBtnRef.classList.remove('is-hidden');
  }
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  scroll({
    top: scrollHeight,
    behavior: 'smooth',
  });
}

function showImages(response) {
  const images = response.data.hits;
  const markup = imagesTemplateHbs(images);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function openModal(event) {
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const url = target.dataset.largeimg;
  const alt = target.alt;
  basicLightbox.create(`<img src=${url} alt=${alt}>`).show();
}
