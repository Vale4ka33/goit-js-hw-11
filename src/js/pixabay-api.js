import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "43261238-3a65c2c3cbe2ed873fa1b88e3";
const URL = "https://pixabay.com/api/";

export function searchImage(searchInput = '') {
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
        .then(data => {
            if (!data.hits || data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: '#EF4040',
                    messageColor: '#fff',
                    
        });
    }
    return data;
})
}