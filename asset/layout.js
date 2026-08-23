


let path = window.location.pathname
    ? "../component/"
    : "component/";


// Navbar
fetch(path + "navbar.html")
.then(response => response.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;
});


// Sidebar
fetch(path + "sidebar.html")
.then(response => response.text())
.then(data => {
    document.getElementById("sidebar-container").innerHTML = data;
});