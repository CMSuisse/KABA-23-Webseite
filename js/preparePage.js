//This file includes some calculations that I was too lazy to do by hand or via css
function prepare_image_wrappers(){
    var image_wrappers = document.getElementsByClassName("image-wrapper");
    console.log(image_wrappers);
    for(var wrapper of image_wrappers){
        wrapper_children = wrapper.children;
        // The image for an act is defined before the act time and therefore has list index 0
        act_image = wrapper_children[0];
        act_time = wrapper_children[1];
        // Now, the act_time object needs to get the same padding and size properties as the image
        console.log(act_image.style);
    }
}

function prepare_page(){
    prepare_image_wrappers();
}

window.onload = prepare_page();