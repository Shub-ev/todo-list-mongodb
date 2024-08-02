const nameIn = document.getElementById("name");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const form = document.querySelector("form");
const message = document.querySelector("#message");
const messageIcon = document.getElementById("messageIcon");
const loader = document.getElementById("loader");

const pass = [pass1, pass2];

pass.map((pas) => {
    pas.addEventListener('click', () => {
        pas.style.border = "1px solid grey";
        pas.setAttribute("placeholder", "");
    });
})

function err(element) {
    loader.style.display = "none";
    element.style.borderColor = "red";
    element.value = "";
    element.setAttribute("placeholder", (element == pass1 ? "Password size minimum 8" : "password should be same"));
}

function showSuccess(text){
    loader.style.display = "none";
    const messageText = document.getElementById("messageText");
    messageText.textContent = text;
    message.classList.add("success", "successColor");
    messageIcon.src = "./assets/check.png";
    setTimeout(() => {
        message.classList.remove("success", "successColor");
    }, 3000);
}

function showError(text){
    loader.style.display = "none";
    message.classList.add("error", "errorColor");
    const messageText = document.getElementById("messageText");
    messageText.textContent = text;
    messageIcon.src = "./assets/cross.png";
    setTimeout(() => {
        message.classList.remove("error", "errorColor");
    }, 3000);
}

form.onsubmit = (e) => { 
    loader.style.display = "flex";
    e.preventDefault();
    message.style.position = "absolute";
    const p1 = pass1.value;
    const p2 = pass2.value;
    const nm = nameIn.value;

    if(p1.length < 8){
        err(pass1);
        return;
    }
    if (p1 !== p2) {
        err(pass2);
        return;
    }

    const process = "signup";

    const credentials = {
        pr: process,
        name: nm,
        pass: p1,
    } 

    const url = "http://localhost:1324/";

    const fetchPromise = fetch(url, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    fetchPromise.then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }else{
            const jsonPromise = response.json();
            jsonPromise.then((result) => {
                if(result.res == "user present"){
                    showError("Email Already Registered");
                }
                else if(result.res == "user created"){
                    showSuccess("User Created!");
                    location.href = "./index.html";
                }
            })
        }
    }).catch(error => {
        showError("Connection Error!")
        console.error(error);
    })
}

signup.addEventListener('click', () => {
    location.href = "./login.html";
})