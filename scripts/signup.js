const name = document.getElementById("name");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const p1 = pass1.value;
    const p2 = pass2.value;

    console.log(p1+"\n"+p2);

    if(p1 !== p2){
        pass2.style.borderColor = "red";
        pass2.setAttribute("placeholder", "enter password");
        return;
    }    
})

signup.addEventListener('click', () => {
    location.href = "./login.html";
})