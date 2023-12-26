function log(msg, color) {
  color = color || "black";
  bgc = "White";
  switch (color) {
      case "success":  color = "Green";      bgc = "LimeGreen";       break;
      case "info":     color = "DodgerBlue"; bgc = "Turquoise";       break;
      case "error":    color = "Red";        bgc = "Black";           break;
      case "start":    color = "OliveDrab";  bgc = "PaleGreen";       break;
      case "warning":  color = "Tomato";     bgc = "Black";           break;
      case "end":      color = "Orchid";     bgc = "MediumVioletRed"; break;
      default: color = color;
  }

  if (typeof msg == "object") {
      console.log(msg);
  } else if (typeof color == "object") {
      console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
      console.log(color);
  } else {
      console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
  }
}

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

function SignOut() {
  localStorage.removeItem("TOKEN");
  window.location.reload();
}

if(localStorage.getItem("TOKEN")===null ||localStorage.getItem("TOKEN")===undefined) {
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
  container.scrollBy({
    top: delta,
    behavior: 'smooth'
  });
});

setInterval(function() {
  if(index >= 5){
    index = 0;  
  }
  phone.src = images[index].src;
  index++;
},4000)

log("!!! WARNING !!!", "warning");
log("### Running unofficial code CAN and WILL give other people access to your account. ###","warning")