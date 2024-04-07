import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

export function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="img-item">
            <a class="img-link" href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}">
                <ul class="info-card">
                    <li><span class="info-label">Likes</span><br>${likes}</li>
                    <li><span class="info-label">Views</span><br>${views}</li>
                    <li><span class="info-label">Comments</span><br>${comments}</li>
                    <li><span class="info-label">Downloads</span><br>${downloads}</li>
                </ul>
            </a>
        </li>`
    ).join("");
}

export function initLightbox() {
    const lightbox = new SimpleLightbox('.img-list a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        animationSpeed: 250,
        animationSlide: true
    });
    lightbox.refresh();
}