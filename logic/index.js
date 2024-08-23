let cookies = document.cookie;
console.log(cookies);
let menuState = false;
const menuBar = document.getElementById("menuBar");
const logoutBtn = document.getElementById("logoutBtn");
const loader = document.getElementById("loader");

document.addEventListener('DOMContentLoaded', () => {
    let cookies = document.cookie.split(";");
    function getAuth(cookie) {
        if (cookie.indexOf("auth") != -1) return cookie;
        else return false;
    }
    let auth = cookies.filter(getAuth);
    if (auth.length == 0) location.href = "./login.html";
})

logoutBtn.addEventListener("click", () => {
    loader.style.display = "flex";
    cookies = `auth=uname:${""},pass:${""}`;
    location.href = "./login.html";
    loader.style.display = "none";
})

menuBar.addEventListener('click', () => {
    console.log(menuState);
    const sidebar = document.getElementById("sideBar");
    menuState ? sidebar.style.display = "none" : sidebar.style.display = "flex";
    menuState = !menuState;    
})