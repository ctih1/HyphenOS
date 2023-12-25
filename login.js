async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
}

async function removeInvalid(user,pass,cpass,email,uh,ph,eh) {
    console.log("removing...");
    user.classList.remove("invalid");
    pass.classList.remove("invalid");
    cpass.classList.remove("invalid");
    email.classList.remove("invalid");
    uh.innerHTML = "";
    ph.innerHTML = "";
    eh.innerHTML = "";
}
  
  
async function SignUp(element) {
    let uh = document.getElementById("username-hint");
    let ph = document.getElementById("password-hint");
    let eh = document.getElementById("email-hint");
    let username = document.getElementById("username").value;
    let username_ = document.getElementById("username");
    let password = document.getElementById("password").value;
    let password_ = document.getElementById("password");
    let confirm_password = document.getElementById("confirm-password").value;
    let confirm_password_ = document.getElementById("confirm-password");
    let email = document.getElementById("email").value;
    let email_ = document.getElementById("email");
    let warning = document.getElementById("warning");
    removeInvalid(username_,password_,confirm_password_,email_,uh,ph,eh);

    let language = navigator.language || navigator.userLanguage; 
    console.log(email.indexOf("@") > -1);
    if(!(username.length>3&&
        password.length>=8&&
        confirm_password===password&&
        email.indexOf("@") > -1)) {
        
        if(username.length<3) {
            username_.classList.add("invalid");
            uh.innerHTML = "Username must be atleast 3 characters long.";
        }
        if(password.length<=8) {
            password_.classList.add("invalid");
            ph.innerHTML = "Password must be atleast 8 characters long.";
        }
        if(!(confirm_password===password)) {
            confirm_password_.classList.add("Invalid");
            ph.innerHTML = "Passwords must match!";
        }
        if(!(email.indexOf("@") > -1)) {
            eh.innerHTML = 'Email must include "@"';
            email_.classList.add("invalid");
        }
        return;
    }
    element.setAttribute("disabled","disabled");
    const creds = {
        "username": username,
        "password": password,
        "email":email,
        "lang":language
    };

    const response = await fetch("https://hyphenos.ctih.repl.co/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    }
    )
    .then(data => {
    if(data.status===409) {
        warning.innerHTML="Username taken!"
    }

    if(data.status===200) {
        digestMessage(username+password).then(token => {
	    	localStorage.setItem("USR",username);
		localStorage.setItem("PSW", password);
        });
        window.location.href = "index.html"
      }
      element.disabled = false;
    });
}

async function Login(element) {
    let username = document.getElementById("username").value;
    let username_ = document.getElementById("username");
    let password = document.getElementById("password").value;
    let warning = document.getElementById("warning");
    let password_ = document.getElementById("password");
    
    await digestMessage(username+password).then(token => {
        let creds = {
            "USR": username,
	    "PSW": password
        }
        console.log(creds);

        const response = fetch("https://hyphenos.ctih.repl.co/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
        .then(data => {
            if(data.status===401) {
                warning.innerHTML = "Invalid login.";
            }
            if(data.status===200) {
		console.log(username);
                localStorage.setItem("USR",username);
		localStorage.setItem("PSW", password);
                window.location.href = "index.html";
            }
        })
    });
}

async function GetToken() {
    return localStorage.getItem("TOKEN");
}
async function RetrieveData() {
    const username = localStorage.getItem("USR");
    const password = localStorage.getItem("PSW");

    let creds = {
        "USR": username,
	"PSW": password
    }
    console.log(creds);

    const response = fetch("https://hyphenos.ctih.repl.co/retrieve-data", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    })
    
    .then(response => response.json()).then(data => {
        if(data.length < 5) {
            console.log("Error!");
            return;	
        }
        var date = new Date(0);
        date.setSeconds(data["created"])
        console.log(data);
        document.getElementById("name").innerHTML = data["username"];
        document.getElementById("email").innerHTML = data["email"];
        document.getElementById("lang").innerHTML = data["lang"];
        document.getElementById("country").innerHTML = data["country"];
        document.getElementById("created").innerHTML = date;
    });
}
