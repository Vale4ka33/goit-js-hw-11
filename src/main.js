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

    imgList.innerHTML = '';
     loader.classList.add('loader--visible');


    searchImage(searchInput)
    .then(data => {
        console.log(data);
        imgList.innerHTML = createMarkup(data.hits);
        initLightbox();
        form.reset();
    })
    .catch(error => {
        iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: '#EF4040',
                    messageColor: '#fff',
                    
        });
    })
    .finally(() => {
        loader.classList.remove('loader--visible');
    });
}