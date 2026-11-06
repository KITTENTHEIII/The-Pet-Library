// Theme handling (light / dark / hacker) 

const body = document.body;

if (localStorage.getItem('hackerMode') === 'enabled') {
    body.classList.add('dark-mode', 'hacker-mode');
    startMatrixRain();
} else if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}
updateButtonText();

function toggleDarkMode() {
    // Dark mode is locked on while hacker mode is active
    if (body.classList.contains('hacker-mode')) return;

    body.classList.toggle('dark-mode');
    localStorage.setItem(
        'darkMode',
        body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
    updateButtonText();
}

function toggleHackerMode() {
    if (body.classList.contains('hacker-mode')) {
        // Leave hacker mode and restore the saved dark/light preference
        body.classList.remove('hacker-mode');
        if (localStorage.getItem('darkMode') !== 'enabled') {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('hackerMode', 'disabled');
        stopMatrixRain();
    } else {
        body.classList.add('hacker-mode', 'dark-mode');
        localStorage.setItem('hackerMode', 'enabled');
        startMatrixRain();
    }
    updateButtonText();
}

function updateButtonText() {
    const darkButton = document.querySelector('.dark-mode-toggle');
    const hackerButton = document.querySelector('.hacker-toggle');
    const hacker = body.classList.contains('hacker-mode');

    if (darkButton) {
        darkButton.disabled = hacker;
        darkButton.title = hacker ? 'Dark mode is locked while Hacker Mode is on' : '';
        if (hacker) {
            darkButton.textContent = '🔒 Dark Locked';
        } else if (body.classList.contains('dark-mode')) {
            darkButton.textContent = '☀️ Light Mode';
        } else {
            darkButton.textContent = '🌙 Dark Mode';
        }
    }

    if (hackerButton) {
        hackerButton.textContent = hacker ? '💻 Exit Hacker' : '💻 Hacker Mode';
    }
}

// Matrix rain background (hacker mode only)

let matrixCanvas = null;
let matrixTimer = null;

function startMatrixRain() {
    if (matrixCanvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-rain';
    body.appendChild(matrixCanvas);

    const ctx = matrixCanvas.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[];'.split('');
    const fontSize = 16;
    let drops = [];

    function resize() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        const columns = Math.ceil(matrixCanvas.width / fontSize);
        drops = Array.from({ length: columns }, () => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);
    matrixCanvas._resize = resize;

    matrixTimer = setInterval(function () {
        // Translucent black layer creates the fading trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 50);
}

function stopMatrixRain() {
    if (!matrixCanvas) return;
    clearInterval(matrixTimer);
    window.removeEventListener('resize', matrixCanvas._resize);
    matrixCanvas.remove();
    matrixCanvas = null;
    matrixTimer = null;
}

// Animal card sounds

document.addEventListener('DOMContentLoaded', function() {
    const animalCards = document.querySelectorAll('.animal-card');

    // Map animal types to sound files
    const animalSounds = {
        'cat': './sounds/meow.mp3',
        'dog': './sounds/woof.mp3',
        'hamster': './sounds/hamster.mp3',
        'bird': './sounds/bird.mp3',
        'turtle': './sounds/turtle.mp3',
        'placeholder': './sounds/error.mp3'
    };

    animalCards.forEach(card => {
        let canClick = true; // Cooldown flag

        card.addEventListener('click', function() {
            if (!canClick) return; // Ignore clicks during cooldown

            const animalType = card.getAttribute('data-animal') || 'cat';
            const soundFile = animalSounds[animalType] || animalSounds['cat'];

            const sound = new Audio(soundFile);
            sound.play();

            canClick = false;
            setTimeout(() => {
                canClick = true;
            }, 2000);
        });
    });
});