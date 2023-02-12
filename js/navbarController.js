// This function toggles the navbar menu on mobile devices when the hamburger menu has been clicked
function updateNavbar(){
    navbarCollapse = document.getElementById("navbarCollapse");
    if(navbarCollapse.classList.contains("show")){
        navbarCollapse.classList.remove("show");
    } else{
        navbarCollapse.classList.add("show");
    }
}