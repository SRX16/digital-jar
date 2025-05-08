const container = document.getElementById("star-container");
const messageBox = document.getElementById("message-box");
const resetButton = document.getElementById("reset-button");
const lid = document.querySelector('.lid');
const jar = document.querySelector('.jar');
const gifContainer = document.getElementById("gif-container");

const messages = [
  { text: "keep up, you can do it!!", gif: "gif1.gif" },
  { text: "HELLO <3", gif: "gif2.gif" },
  { text: "When i found out my toaster wasn't waterproof, I was shock...", gif: "gif3.gif" },
  { text: "I'm sleeping", gif: "gif4.gif"},
  { text: "you're amazing!", gif: "gif5.gif"},
  { text: "You may now sleep", gif: "gif6.gif"},
  { text: "Follow your dreams!", gif: "gif7.gif"},
  { text: "Smile !!", gif: "gif8.gif"},
  { text: "If sleep won't company you, i will !!", gif: "gif9.gif"},
  { text: "Don't mind me, I'm just checking you out", gif: "gif10.gif"}
];

const starSize = 20;
const minGap = 50;
const spreadX = 0.8; // spread horizontally (0.1 = tight, 1 = full width)
const spreadY = 0.7; // spread vertically (0.1 = tight, 1 = full height)
let placedStars = [];
let clickedCount = 0;

function isFarEnough(x, y) {
  for (const star of placedStars) {
    const dx = x - star.x;
    const dy = y - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < minGap) return false;
  }
  return true;
}

function generateStars() {
  container.innerHTML = "";
  gifContainer.innerHTML = "";
  placedStars = [];
  clickedCount = 0;
  resetButton.style.display = "none";
  messageBox.style.display = "none";

  for (let i = 0; i < messages.length; i++) {
    let x, y, attempts = 0;

    const offsetX = (1 - spreadX) / 2 * container.offsetWidth;
    const offsetY = (1 - spreadY) / 2 * container.offsetHeight;
    const maxX = container.offsetWidth * spreadX - starSize;
    const maxY = container.offsetHeight * spreadY - starSize;

    do {
      x = offsetX + Math.random() * maxX;
      y = offsetY + Math.random() * maxY;
      attempts++;
      if (attempts > 100) break;
    } while (!isFarEnough(x, y));

    placedStars.push({ x, y });

    const star = document.createElement("img");
    star.src = "star.png";
    star.classList.add("star");
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(star);

    star.addEventListener("click", () => {
      messageBox.innerText = messages[i].text;
      messageBox.style.display = "block";

      // Animate lid
      lid.classList.add('open');
      setTimeout(() => lid.classList.remove('open'), 3000);

      // Shake jar
      jar.classList.add('shake');
      setTimeout(() => jar.classList.remove('shake'), 500);

      // Hide message after 3 seconds
      setTimeout(() => messageBox.style.display = "none", 3000);

      // Hide other stars briefly
      const allStars = document.querySelectorAll('.star');
      allStars.forEach(s => {
        if (s !== star) s.style.opacity = "0";
      });

      // Show gif
      gifContainer.innerHTML = `<img src="${messages[i].gif}" alt="Star GIF">`;

      // Restore stars and remove gif after 4 seconds
      setTimeout(() => {
        allStars.forEach(s => {
          if (s !== star) s.style.opacity = "1";
        });
        gifContainer.innerHTML = "";
      }, 4000);

      // Remove clicked star
      star.remove();
      clickedCount++;

      if (clickedCount === messages.length) {
        setTimeout(() => {
          resetButton.style.display = "block";
        }, 4000);
      }
    });
  }
}

resetButton.addEventListener("click", generateStars);
generateStars();
