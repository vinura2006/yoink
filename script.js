document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const catYesBtn = document.getElementById('cat-yes-btn');
    const catContainer = document.getElementById('cat-container');
    const successContainer = document.getElementById('success-container');
    const heartsContainer = document.getElementById('hearts-container');

    let noClickCount = 0;
    const MAX_ATTEMPTS = 5;
    let lastPosition = -1;

    // --- Falling Hearts Animation ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = ['❤️', '💖', '🌸', '💍'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // --- No Button Logic with FIXED POSITIONS ---
    // Define safe positions using percentage-based layout
    // These are guaranteed to be within the visible area
    const safePositions = [
        { left: '25%', top: '30%' },
        { left: '60%', top: '25%' },
        { left: '15%', top: '50%' },
        { left: '65%', top: '50%' },
        { left: '30%', top: '65%' },
        { left: '55%', top: '70%' },
        { left: '40%', top: '40%' },
        { left: '20%', top: '75%' }
    ];

    function moveNoButton() {
        // Add shake animation
        noBtn.classList.add('shaking');
        setTimeout(() => noBtn.classList.remove('shaking'), 300);

        // Pick a random position different from the last one
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * safePositions.length);
        } while (newPosition === lastPosition && safePositions.length > 1);

        lastPosition = newPosition;
        const position = safePositions[newPosition];

        // Apply the fixed position
        noBtn.style.position = 'fixed';
        noBtn.style.left = position.left;
        noBtn.style.top = position.top;
        noBtn.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;

        // Track attempts
        noClickCount++;

        if (noClickCount >= MAX_ATTEMPTS) {
            showCatEvent();
        }
    }

    function showCatEvent() {
        catContainer.classList.add('active');
        noClickCount = 0;
    }

    // Desktop: Hover
    noBtn.addEventListener('mouseover', moveNoButton);

    // Mobile: Touch start
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Fallback click
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // --- Yes Button Logic ---
    function showSuccess() {
        catContainer.classList.remove('active');
        successContainer.classList.add('active');

        // Trigger extra celebration hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeart, i * 50);
        }
    }

    yesBtn.addEventListener('click', showSuccess);
    catYesBtn.addEventListener('click', showSuccess);
});
