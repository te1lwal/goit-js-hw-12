
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let query = '';
let page = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast-error',
    });
    return;
  }

  clearGallery();
  showLoader(loader);
  loadMoreBtn.classList.add('hidden');
  page = 1; 

  try {
    const data = await fetchImages(query, page);
    hideLoader(loader); 

    if (data.hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        class: 'custom-toast-error',
      });
      return;
    }

    renderGallery(data.hits);

    if (data.totalHits > page * 15) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    hideLoader(loader);
    iziToast.error({
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast-error',
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader(loader);

  try {
    const data = await fetchImages(query, page);
    hideLoader(loader);
    renderGallery(data.hits);

    if (data.hits.length === 0 || data.totalHits <= page * 15) {
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.classList.add('hidden');
      return;
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader(loader);
    iziToast.error({
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
    console.error(error);
  }
});