import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.form');
const imgList = document.querySelector('.img-list');

const API_KEY = "43261238-3a65c2c3cbe2ed873fa1b88e3";
const URL = "https://pixabay.com/api/";

form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    const searchInput = event.currentTarget.elements.search.value;
    searchImage(searchInput)
        .then(data => {
            console.log(data);
            imgList.innerHTML = createMarkup(data.hits)
            initLightbox();
        })
        .catch(error => alert(error));


}

function searchImage(searchInput = '') {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    })

    return fetch(`${URL}?${params}`)
        .then(response => {
            if (!response.ok) {
            throw new Error("Sorry, there are no images matching your search query. Please try again!")
            }
            return response.json();
        })
        .catch(error => {
            throw new Error("Sorry, an error occurred while fetching data. Please try again later!");
        });
}

function createMarkup(arr) {
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

function initLightbox() {
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
  animationSlide: true
})
    lightbox.refresh();
}