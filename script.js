// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    updateButtonText();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    
    updateButtonText();
}

function updateButtonText() {
    const button = document.querySelector('.dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = '☀️ Light Mode';
    } else {
        button.textContent = '🌙 Dark Mode';
    }
}

// Add click event to all cat cards with animal-specific sounds
document.addEventListener('DOMContentLoaded', function() {
    const catCards = document.querySelectorAll('.cat-card');
    
    // Map animal types to sound files
    const animalSounds = {
        'cat': './sounds/meow.mp3',
        'dog': './sounds/woof.mp3',
        'hamster': './sounds/hamster.mp3',
        'bird': './sounds/bird.mp3',
        'placeholder': './sounds/error.mp3'
    };
    
    catCards.forEach(card => {
        let canClick = true; // Cooldown flag
        
        card.addEventListener('click', function() {
            if (!canClick) return; // Ignore clicks during cooldown
            
            // Get animal type from data attribute
            const animalType = card.getAttribute('data-animal') || 'cat';
            
            // Get the appropriate sound file
            const soundFile = animalSounds[animalType] || animalSounds['cat'];
            
            // Play sound
            const sound = new Audio(soundFile);
            sound.play();
            
            // Set cooldown
            canClick = false;
            
            // Reset cooldown after 2 seconds
            setTimeout(() => {
                canClick = true;
            }, 2000);
        });
    });
});
