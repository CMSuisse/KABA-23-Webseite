var navbarToggler = document.getElementById("navbarToggler");
navbarToggler.addEventListener("click", updateNavbar);

function updateNavbar(){
    navbarCollapse = document.getElementById("navbarCollapse");
    if(navbarCollapse.classList.contains("show")){
        navbarCollapse.classList.remove("show");
    } else{
        navbarCollapse.classList.add("show");
    }
}