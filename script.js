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

// Add click event to all cat cards with meow sound
document.addEventListener('DOMContentLoaded', function() {
    const catCards = document.querySelectorAll('.cat-card');
    
    catCards.forEach(card => {
        let canClick = true; // Cooldown flag
        
        card.addEventListener('click', function() {
            if (!canClick) return; // Ignore clicks during cooldown
            
            // Check if this card has the PH image
            const img = card.querySelector('img');
            const isPH = img && img.src.includes('PH.png');
            
            // Play appropriate sound
            let sound;
            if (isPH) {
                sound = new Audio('./sounds/error.mp3');
            } else {
                sound = new Audio('./sounds/meow.mp3');
            }
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
