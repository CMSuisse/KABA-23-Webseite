// This file loads the images to be displayed on the fotos page of the website
// For this, it uses a sort of lazy loading technique that loads a batch of 20 images and adds a loading trigger in the middle of them
// When the loading trigger comes into the the viewport, it is deleted, a new batch of 20 images are loaded and a new loading trigger is added

// The first call to the Flickr API triggered by a loading trigger will have to request page 2 of the photostream
var page_nr = 2;
// This value sets to false when all of the images have been loaded
var should_fully_load = true;
// This variable will be set to its actual value later, but it has to be global, so here it is
var total_photos = 100;

function loadPhotosOnPageLoad(){
    var request = new XMLHttpRequest();
    
    // This request gets the first 20 images of the photostream
    let url = "https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=4e4799e62be89b33ab237d014bbb5267&user_id=195536935%40N04&per_page=20&page=1&format=json&nojsoncallback=1";
    request.open("GET", url, true);
    addPlaceholderPhotosToDOM(20);

    request.onreadystatechange = function(){
        // If the request has been completely processed
        if(this.readyState == 4){
            // If the action has been completed with a success (2xx) or partial success (3xx) status code
            if(this.status >= 200 && this.status < 400){
                // Extract only the actually useful part of the response before sending it off to the next function
                const RESPONSE = JSON.parse(this.responseText);
                // Status code can be 200, but the images still couldn't load
                if(RESPONSE.stat == "fail"){
                    addFlickrLinkToDOM();
                    return;
                }
                const PHOTOS = RESPONSE.photos.photo;
                replacePlaceholderPhotos(PHOTOS);
            }
            else{
                addFlickrLinkToDOM();
            }
        }
    }

    request.send();
}

function loadNextPhotosPage(){
    var request = new XMLHttpRequest();
    // This request gets the next 20 images of the photostream
    let url = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=4e4799e62be89b33ab237d014bbb5267&user_id=195536935%40N04&per_page=20&page=${page_nr}&format=json&nojsoncallback=1`;
    request.open("GET", url, true);
    // If the page should add 20 new placeholders do so, otherwise calculate how many placeholders are still needed and add those
    addPlaceholderPhotosToDOM(should_fully_load ? 20 : total_photos - 20*(page_nr-1));
    page_nr ++;
    // Determine if the page should still add 20 new placeholders the next time this function is called
    should_fully_load = 20*page_nr > total_photos ? false : true;
    console.log(should_fully_load);

    request.onreadystatechange = function(){
        // If the request has been completely processed
        if(this.readyState == 4){
            // If the action has been completed with a success (2xx) or partial success (3xx) status code
            if(this.status >= 200 && this.status < 400){
                // Extract only the actually useful part of the response before sending it off to the next function
                const RESPONSE = JSON.parse(this.responseText);
                total_photos = RESPONSE.photos.total;
                // HTTP status code can be 200, but the images still couldn't load
                if(RESPONSE.stat == "fail"){
                    addFlickrLinkToDOM();
                    return;
                }
                const PHOTOS = RESPONSE.photos.photo;
                replacePlaceholderPhotos(PHOTOS);
            }
            else{
                addFlickrLinkToDOM();
            }
        }
    }

    request.send();
}

function addFlickrLinkToDOM(){
   // When some or maybe all images couldn't load, add a link to the flickr photostream to the page
   var photos_info_div = document.getElementById("fotos-info")
   // Only append the link to the flickr page when it hasn't already been added
   if(photos_info_div.children.length == 1){
       var link_el = document.createElement("a");
       link_el.href = "https://www.flickr.com/photos/kaba2022/page1"
       link_el.innerHTML = "KABA 2023 Flickr Photostream"
       var info_p = document.createElement("p");
       info_p.innerHTML = "Nicht alle Fotos konnten erfolgreich geladen werden. Schau doch sonst auf der Flickr Seite des KABAs vorbei: "
       info_p.classList.add("text-center");
       info_p.appendChild(link_el);
       photos_info_div.appendChild(info_p);
   }
}

function addPlaceholderPhotosToDOM(placeholder_nr){
    // Grab the div element that will contain all of the photos from the page
    var photosContainer = document.getElementById("fotos-container");
    const PLACEHOLDER_URL = "../media/img/img_load_placeholder.png";
    for(var i = 0; i < placeholder_nr; i++){
        // To inspect one specific photo individually, every image will be wrapped in an anchor
        var img_anchor = document.createElement("a");
        img_anchor.href = PLACEHOLDER_URL;
        img_anchor.target = "_blank";
        img_anchor.classList.add("flickr-img-anchor");
        img_anchor.classList.add("flickr-img-anchor-placeholder");
        // Then construct the HTML element
        var img_element = document.createElement("img");
        img_element.src = PLACEHOLDER_URL;
        img_element.classList.add("flickr-img");
        img_element.classList.add("flickr-img-placeholder");
        img_anchor.appendChild(img_element);
        photosContainer.appendChild(img_anchor);
    }
    // Only add a loading trigger when there are still new images to be loaded
    if(should_fully_load) addLoadingTriggerToDOM();
}

function addLoadingTriggerToDOM(){
    // Grab the div element that will also contain the loading trigger
    var photosContainer = document.getElementById("fotos-container");
    // The loading trigger is an empty div that has an intersection observer on it
    var loading_trigger = document.createElement("div");
    loading_trigger.classList.add("loading-trigger");
    let observer = new IntersectionObserver(observerCallback);
    observer.observe(loading_trigger);
    photosContainer.appendChild(loading_trigger);
}

// This function is called by the intersection observer observing the loading trigger
function observerCallback(events){
    events.forEach(event => {
        if(event.isIntersecting){
            // If the right event has been triggered, delete the loading trigger and load the next batch of images
            event.target.remove();
            loadNextPhotosPage();
        }
    });
}

function replacePlaceholderPhotos(JSON_PHOTOS_ARRAY){
    // Grab the div element that will contain all of the photos from the page
    var photosContainer = document.getElementById("fotos-container");
    for(const PHOTO of JSON_PHOTOS_ARRAY){
        // First construct the url to retrieve the photo
        let photo_url = `https://farm${PHOTO.farm}.staticflickr.com/${PHOTO.server}/${PHOTO.id}_${PHOTO.secret}.jpg`;
        // Get the first anchor that still has flickr-img-anchor-placeholder in its class list
        var img_anchor = photosContainer.getElementsByClassName("flickr-img-anchor-placeholder")[0];
        img_anchor.href = photo_url;
        // The corresponding image element is the first child of the anchor
        var img_element = img_anchor.children[0];
        img_element.src = photo_url;
        // Remove the class tags from the elements
        img_anchor.classList.remove("flickr-img-anchor-placeholder");
        img_element.classList.remove("flickr-img-placeholder");
    }
}

window.onload = function(){
    loadPhotosOnPageLoad();
}