//This file includes some calculations that I was too lazy to do by hand or via css
// This function sets the div that fades in when an act image is hovered over or clicked to the same size and position as the image it belongs to
// This took way too long to implement D:
function prepare_image_wrappers(){
    var image_wrappers = document.getElementsByClassName("image-wrapper");
    for(var wrapper of image_wrappers){
        wrapper_children = wrapper.children;
        // The image for an act is defined before the act time and therefore has list index 0
        act_image = wrapper_children[0];
        act_time = wrapper_children[1];
        // Now, the act_time object needs to get the same margin and size properties as the image
        const ACT_IMAGE_STYLE = getComputedStyle(act_image);
        const IMAGE_HEIGHT = act_image.clientHeight;
        const IMAGE_WIDTH = act_image.clientWidth;
        const IMAGE_MARGIN_LEFT = ACT_IMAGE_STYLE.marginLeft;
        act_time.style.height = IMAGE_HEIGHT + "px";
        act_time.style.width = IMAGE_WIDTH + "px";
        act_time.style.marginLeft = IMAGE_MARGIN_LEFT;
        // After the styling rules have been set, add on click event listeners and mouseovers/mouseouts event listeners
        act_time.addEventListener("click", updateActTime);
    }
}

function updateActTime(){
    console.log(this.parentElement.id);
    // Just make the act time appear when clicked on and disappear again on a second click
    // Styling is done in the css file using the class name visible on elements with class name act-time
    if(this.classList.contains("visible")){
        this.classList.remove("visible");
    } else {
        this.classList.add("visible");
    }
}

function prepare_page(){
    prepare_image_wrappers();
}

window.onload = prepare_page();
addEventListener("resize", prepare_page);