let cookies = document.cookie;
console.log(cookies);

let menuState = false;
menuBar.addEventListener('click', () => {
    console.log(menuState);
    const sidebar = document.getElementById("sideBar");
    menuState ? sidebar.style.display = "none" : sidebar.style.display = "flex";
    menuState = !menuState;    
})