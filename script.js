// Falling hearts
const heartsContainer = document.querySelector('.hearts');

function createHeart() {
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'absolute';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = '-50px';
  heart.style.fontSize = `${Math.random() * 25 + 15}px`;
  heart.style.opacity = Math.random();
  heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heartsContainer.removeChild(heart);
  }, 5000);
}

setInterval(createHeart, 250);

// Keyframes (in JS)
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// Autoplay fix for music
window.addEventListener('click', () => {
  const audio = document.getElementById('loveMusic');
  audio.play().catch(() => {});
});