const nameIn = document.getElementById("name");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const form = document.querySelector("form");

const pass = [pass1, pass2];

pass.map((pas) => {
    pas.addEventListener('click', () => {
        pas.style.border = "1px solid grey";
        pas.setAttribute("placeholder", "");
    });
})

function err(element) {
    element.style.borderColor = "red";
    element.value = "";
    element.setAttribute("placeholder", (element == pass1 ? "Password size minimum 8" : "password should be same"));
}

form.onsubmit = (e) => {
    e.preventDefault();
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

    const credentials = {
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
        const res = document.createElement("p");
        if (!response.ok) {
            res.textContent = res.body;
            console.log(res);
            document.appendChild(res);
            throw new Error('Network response was not ok');
        }else{
            const jsonPromise = response.json();
            jsonPromise.then((result) => {
                console.log(result);
                
            })
        }
    }).catch(error => {
        console.error(error);
    })
}

signup.addEventListener('click', () => {
    location.href = "./login.html";
})