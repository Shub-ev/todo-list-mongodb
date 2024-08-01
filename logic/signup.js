const name = document.getElementById("name");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const form = document.querySelector("form");

form.onsubmit = (eve) => {
    eve.preventDefault();
    const p1 = pass1.value;
    const p2 = pass2.value;
    const nm = name.value;

    if (p1 !== p2) {
        pass2.style.borderColor = "red";
        pass2.value = "";
        pass2.setAttribute("placeholder", "Passwords did not match");
        return;
    }

    const data = {
        name: nm,
        pass: p1,
    }

    const url = "http://localhost:1324/";

    // creating headers
    const header = new Headers();

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
        })
}

signup.addEventListener('click', () => {
    location.href = "./login.html";
})