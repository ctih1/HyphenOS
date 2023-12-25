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
signoutButton = document.getElementById("sign-out").addEventListener("click",SignOut);
document.getElementById("settings").addEventListener("click", openSettings);
function SignOut() {
  localStorage.removeItem("USR");
  localStorage.removeItem("PSW");
  window.location.reload();
}
function opensettings() {
  window.location.href = "account.html";
}

if(localStorage.getItem("USR")!==null) {
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
  document.getElementById("settings").href = "account.html"; 
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
