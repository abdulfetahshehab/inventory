<<<<<<< HEAD



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
=======



let path = window.location.pathname.includes("/pages/")
    ? "../component/"
    : "component/";


// Navbar
fetch(path + "navbar.html")
.then(response => {
    if (!response.ok){
        throw new Error("Navbar not founde");
    }
    return response.text();
})
.then(data => {
    document.getElementById("navbar").innerHTML = data;
})
.catch(error => console.log(error));


// Sidebar
fetch(path + "sidebar.html")
.then(response => response.text())
.then(data => {
    document.getElementById("sidebar-container").innerHTML = data;
>>>>>>> f3b2bc90ea3fb5a137f9296901058b59c4a16e73
});