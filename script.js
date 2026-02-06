// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const heartsContainer = document.querySelector("#hearts-container");
const musicPlayer = document.getElementById("music-player");
const playPauseBtn = document.getElementById("play-pause-btn");

// Audio
const bgMusic = document.getElementById("bg-music");
const soundYay = document.getElementById("sound-yay");

// Typing Effect
const textToType = "Will you be my Valentine?";
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        title.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
        typeWriter(); // Start typing
        bgMusic.play().catch(e => console.log("Audio autoplay blocked"));
    }, 50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 60;
    const max = 100;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";

    // Play Sound & Stop Background Music
    bgMusic.pause();
    soundYay.currentTime = 0;
    soundYay.play();

    // Confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Show Music Player
    setTimeout(() => {
        musicPlayer.style.display = "flex";
    }, 1000);
});

// Music Player Controls
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");

    if (isPlaying) {
        soundYay.pause();
        playIcon.style.display = "inline";
        pauseIcon.style.display = "none";
        isPlaying = false;
    } else {
        soundYay.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
        isPlaying = true;
    }
});

// Update playing state when song plays
soundYay.addEventListener("play", () => {
    isPlaying = true;
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
});

soundYay.addEventListener("pause", () => {
    isPlaying = false;
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
});

// Floating Hearts Generator
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️"; // You can use ❤️ or image
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    // Add to body or container. Using body for fixed position.
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);
