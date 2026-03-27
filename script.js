// ===== DOM ELEMENTS =====
const playButton = document.querySelector('.play-button');
const playPauseBtn = document.querySelector('.play-pause');
const ctaButton = document.querySelector('.cta-button');
const loadingOverlay = document.querySelector('.loading-overlay');
const progressBar = document.querySelector('.progress');
const scenes = document.querySelectorAll('.scene');
const confettiContainer = document.querySelector('.confetti-container');

// ===== VIDEO PLAYBACK SIMULATION =====
let isPlaying = false;
let progressInterval;

function simulateVideoPlayback() {
    if (!isPlaying) {
        // Start playback
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playButton.style.opacity = '0.5';
        
        // Start progress animation
        progressBar.style.animationPlayState = 'running';
        
        // Start scene rotation
        scenes.forEach(scene => {
            scene.style.animationPlayState = 'running';
        });
        
        // Start progress tracking
        progressInterval = setInterval(() => {
            const computedStyle = getComputedStyle(progressBar);
            const width = computedStyle.width;
            console.log(`Progress: ${width}`);
        }, 1000);
    } else {
        // Pause playback
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playButton.style.opacity = '1';
        
        // Pause progress animation
        progressBar.style.animationPlayState = 'paused';
        
        // Pause scene rotation
        scenes.forEach(scene => {
            scene.style.animationPlayState = 'paused';
        });
        
        // Clear interval
        clearInterval(progressInterval);
    }
}

// ===== LOADING SIMULATION =====
function simulateLoading() {
    loadingOverlay.classList.add('active');
    
    // Simulate loading time
    setTimeout(() => {
        loadingOverlay.classList.remove('active');
        createConfetti();
    }, 2000);
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Create confetti particles
    const colors = ['#F97316', '#DC2626', '#3B82F6', '#10B981', '#8B5CF6'];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        // Apply styles
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            left: ${left}%;
            top: -20px;
            opacity: ${Math.random() * 0.5 + 0.5};
            animation: fall ${animationDuration}s ease-in ${animationDelay}s forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add CSS for falling animation
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// ===== SCENE HOVER EFFECTS =====
scenes.forEach((scene, index) => {
    scene.addEventListener('mouseenter', () => {
        if (isPlaying) {
            scene.style.filter = 'brightness(1.2)';
            scene.style.transform = 'scale(1.05)';
        }
    });
    
    scene.addEventListener('mouseleave', () => {
        scene.style.filter = 'brightness(0.7)';
        scene.style.transform = 'scale(1)';
    });
});

// ===== CONTROL BUTTONS =====
document.querySelectorAll('.control-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Add click effect
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Handle specific buttons
        if (this.classList.contains('play-pause')) {
            simulateVideoPlayback();
        }
    });
});

// ===== EVENT LISTENERS =====
playButton.addEventListener('click', simulateVideoPlayback);

playPauseBtn.addEventListener('click', simulateVideoPlayback);

ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Show loading animation
    simulateLoading();
    
    // Open website after delay
    setTimeout(() => {
        window.open(this.href, '_blank');
    }, 2000);
});

// ===== PROGRESS BAR CLICK =====
document.querySelector('.progress-bar').addEventListener('click', function(e) {
    if (!isPlaying) return;
    
    const rect = this.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    
    // Update progress bar
    progressBar.style.width = `${percentage}%`;
    progressBar.style.animation = 'none';
    
    // Calculate which scene to show based on percentage
    let sceneIndex;
    if (percentage < 33) {
        sceneIndex = 0;
    } else if (percentage < 66) {
        sceneIndex = 1;
    } else {
        sceneIndex = 2;
    }
    
    // Show corresponding scene
    scenes.forEach((scene, index) => {
        scene.style.opacity = index === sceneIndex ? '1' : '0';
        scene.style.animation = 'none';
    });
});

// ===== KEYBOARD CONTROLS =====
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'Spacebar':
            e.preventDefault();
            simulateVideoPlayback();
            break;
        case 'Enter':
            if (document.activeElement === ctaButton) {
                ctaButton.click();
            }
            break;
        case 'ArrowRight':
            // Fast forward
            if (isPlaying) {
                const currentWidth = parseFloat(progressBar.style.width || '0');
                progressBar.style.width = `${Math.min(currentWidth + 10, 100)}%`;
            }
            break;
        case 'ArrowLeft':
            // Rewind
            if (isPlaying) {
                const currentWidth = parseFloat(progressBar.style.width || '0');
                progressBar.style.width = `${Math.max(currentWidth - 10, 0)}%`;
            }
            break;
    }
});

// ===== TOUCH SUPPORT =====
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    // Horizontal swipe for progress control
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (isPlaying) {
            const currentWidth = parseFloat(progressBar.style.width || '0');
            const change = diffX > 0 ? 10 : -10;
            progressBar.style.width = `${Math.max(0, Math.min(currentWidth + change, 100))}%`;
        }
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Start with first scene visible
    scenes[0].style.opacity = '1';
    
    // Add hover effect to preview items
    document.querySelectorAll('.preview-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.preview-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.preview-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click sound simulation (optional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playClickSound() {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Add click sounds to interactive elements
    const interactiveElements = document.querySelectorAll('.control-btn, .play-button, .cta-button');
    interactiveElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
    
    // Auto-play video preview after 3 seconds
    setTimeout(() => {
        if (!isPlaying) {
            simulateVideoPlayback();
        }
    }, 3000);
    
    // Log initialization
    console.log('🎬 Adventure Video Card initialized successfully!');
    console.log('Controls:');
    console.log('- Spacebar: Play/Pause');
    console.log('- Arrow Keys: Seek forward/backward');
    console.log('- Click progress bar: Jump to position');
    console.log('- Swipe on mobile: Seek forward/backward');
});

// ===== PERFORMANCE OPTIMIZATION =====
let lastScrollTime = 0;
const scrollThrottle = 100; // ms

window.addEventListener('scroll', () => {
    const now = Date.now();
    
    if (now - lastScrollTime > scrollThrottle) {
        // Pause animations when not visible
        const rect = document.querySelector('.video-card-container').getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible && isPlaying) {
            simulateVideoPlayback(); // Pause when out of view
        }
        
        lastScrollTime = now;
    }
}, { passive: true });

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Video Card Error:', e.error);
    
    // Fallback: If animations fail, show static version
    if (e.error.message.includes('animation')) {
        document.querySelectorAll('*[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
        });
        console.warn('Animations disabled due to error');
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        simulateVideoPlayback,
        simulateLoading,
        createConfetti
    };
}