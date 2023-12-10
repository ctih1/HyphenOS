function DC() {
    window.open("https://discord.com/invite/Sn2zJJ25", "_blank");
}

function TryIt() {
    window.open("https://www.example.com/", "_blank");
}

function PlaceholderButton() {
    window.open("https://www.example.com/", "_blank");
}

const container = document.querySelector('.scroll-container');
let isScrolling = false;
let startPos = 0;
let currentPos = 0;

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  
  const delta = event.deltaY || event.detail || event.wheelDelta;
  
  container.scrollBy({
    top: delta,
    behavior: 'smooth'
  });
});
