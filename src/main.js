import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImage } from './js/pixabay-api';
import { createMarkup, initLightbox } from './js/render-funcions';

const form = document.querySelector('.form');
const imgList = document.querySelector('.img-list');
const loader = document.querySelector('.loader');


form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    const searchInput = event.currentTarget.elements.search.value.trim();
    if (searchInput === '') {
        return;
    }
    loader.style.display = 'block';
     imgList.innerHTML = '';

    searchImage(searchInput)
        .then(data => {
            console.log(data);
            imgList.innerHTML = createMarkup(data.hits)
            initLightbox();

            form.reset();
        })
        .catch(error => alert(error));
     loader.style.display = 'none';
}