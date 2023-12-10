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
const items = document.querySelectorAll('.scroll-item');

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  const delta = event.deltaY;

  container.scrollBy({
    top: delta,
    behavior: 'smooth'
  });
}, {passive: false});

container.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const delta = event.deltaY;
  
    container.scrollBy({
      top: delta,
      behavior: 'smooth'
    });
  }, {passive: false});