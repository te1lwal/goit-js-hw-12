import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery');
let lightbox;

export function renderGallery(images) {
  const markup = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="360"/>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryElement.innerHTML = '';
}

export function showLoader(loader) {
  loader.classList.remove('hidden');
}

export function hideLoader(loader) {
  loader.classList.add('hidden');
}