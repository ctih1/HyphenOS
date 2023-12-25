function DC() {
    window.open("https://discord.com/invite/7dUUETkk5j", "_blank");
}

function TryIt() {
    window.open("https://www.example.com/", "_blank");
}

function PlaceholderButton() {
    window.open("https://www.example.com/", "_blank");
}
var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
  }
}

function redirectToLogin() {
  window.location.href="login.html";
}

console.log(localStorage.getItem("TOKEN_"));
if(localStorage.getItem("TOKEN_")!==null) {
  document.getElementById("log-in").style["display"]="none";
}
else {
  document.getElementById("account-choices").style["display"] = "none";
  document.getElementById("dropdown-extend").addEventListener("click",redirectToLogin);
}

var index = 0;

preload("assets/phones/1.png","assets/phones/2.png","assets/phones/3.png","assets/phones/4.png","assets/phones/5.png");
try {
  document.getElementById("log-in").href = "login.html";
  document.getElementById("sign-up").href = "signup.html";  
} catch(Error) {
  null;
}

const phone = document.getElementById("device");
const container = document.querySelector('.scroll-container');

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  
  const delta = event.deltaY || event.detail || event.wheelDelta;
  console.log(delta);
  console.log(event.deltaY, event.detail, event.wheelDelta );
  container.scrollBy({
    top: delta,
    behavior: 'smooth'
  });
});

setInterval(function() {
  console.log(images);
  if(index >= 5){
    index = 0;
  }
  phone.src = images[index].src;
  index++;
},4000)

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}


function SignUp(element) {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let warning = document.getElementById("warning");
  let language = navigator.language || navigator.userLanguage; 
  element.setAttribute("disabled","disabled");
  const response = fetch(`https://hyphenos.ctih.repl.co/sign-up?username=${username}&password=${password}&email=${email}&language=${language}`).then(data => {
    if(data.status===409) {
      warning.innerHTML="Username taken!"
    }
    if(data.status===200) {
        digestMessage(username+password).then(token => {
          localStorage.setItem("TOKEN",token);
        }
      );
      console.log(data);
      
    }
    element.disabled = false;
  });
  

}
