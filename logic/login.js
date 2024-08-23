const nm = document.getElementById("name");
const pass1 = document.getElementById("pass1");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const form = document.querySelector("form");
const message = document.querySelector("#message");
const messageIcon = document.getElementById("messageIcon");
const loader = document.getElementById("loader");

function showSuccess(text) {
    loader.style.display = "none";
    const messageText = document.getElementById("messageText");
    messageText.textContent = text;
    message.classList.add("success", "successColor");
    messageIcon.src = "./assets/check.png";
    setTimeout(() => {
        message.classList.remove("success", "successColor");
    }, 3000);
}

function showError(text) {
    loader.style.display = "none";
    message.classList.add("error", "errorColor");
    const messageText = document.getElementById("messageText");
    messageText.textContent = text;
    messageIcon.src = "./assets/cross.png";
    setTimeout(() => {
        message.classList.remove("error", "errorColor");
    }, 3000);
}

form.onsubmit = (eve) => {
    loader.style.display = "flex";
    eve.preventDefault();

    const credentials = {
        pr : "login",
        user: nm.value,
        pass: pass1.value,
    };

    const url = "http://localhost:1324/";
    const fetchPromise = fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(credentials),
    });
    fetchPromise.then((response) => {
        if (!response.ok) {
            throw new Error("");
        }
        else{
            const jsonPromise = response.json();
            jsonPromise.then((response) => {
                loader.style.display = "none";
                console.log(response);
                if(response.res == "login success"){
                    showSuccess("Login Success");
                    document.cookie = `auth=uname:${nm.value},pass:${pass1.value}`;
                    location.href = "./index.html";
                }
                else if(response.res == "user not preset"){
                    showError("User not present!");
                }
                else{
                    throw new Error("");
                }
            })
        }
    }).catch(error => {
        showError("Connection Error!");
        console.error(error);
    });
}

signup.addEventListener('click', () => {
    location.href = "./signup.html";
})