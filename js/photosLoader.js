function getExamplePhotos(){
    var request = new XMLHttpRequest();

    // This executes an unsigned request for the last 10 images uploaded to the KABA 2022 photostream
    var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=4e4799e62be89b33ab237d014bbb5267&user_id=195536935%40N04&per_page=10&format=json&nojsoncallback=1"
    request.open("GET", url, true);

    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // Extract only the actually useful part of the response before sending it off to the next function
            const RESPONSE = JSON.parse(this.responseText);
            const PHOTOS = RESPONSE.photos.photo;
            addPhotosToDOM(PHOTOS);
        }
    }

    request.send();
}

function addPhotosToDOM(JSON_PHOTOS_ARRAY){
    // Grab the div element that will contain all of the photos from the page
    var photosContainer = document.getElementById("fotos-container");
    console.log(photosContainer);
    for(const PHOTO of JSON_PHOTOS_ARRAY){
        // First construct the url to retrieve the photo
        let photo_url = `https://farm${PHOTO.farm}.staticflickr.com/${PHOTO.server}/${PHOTO.id}_${PHOTO.secret}.jpg`;
        // To inspect one specific photo individually, every image will be wrapped in an anchor
        var img_anchor = document.createElement("a");
        img_anchor.href = photo_url;
        img_anchor.classList.add("flickr-img-anchor");
        // Then construct the HTML element
        var img_element = document.createElement("img");
        img_element.src = photo_url;
        img_element.classList.add("flickr-img");
        img_anchor.appendChild(img_element);
        photosContainer.appendChild(img_anchor);
    }
}