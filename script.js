// ===== CONFIGURATION =====
// Configuration is now loaded from config.js
// Edit config.js to customize your personal homepage
const CONFIG = typeof PERSONAL_CONFIG !== 'undefined' ? PERSONAL_CONFIG : {
    // Fallback configuration if config.js fails to load
    name: "MIKUSCAT",
    bio: "配置文件加载失败",
    email: "error@example.com",
    avatar: { image: "", alt: "Avatar" },
    socialLinks: [],
    theme: { enableTypingEffect: true, typingSpeed: 50 },
    backgroundImages: { enabled: false }
};

let typingTimeout; // To hold the timeout ID

// ===== DOM ELEMENTS =====
const elements = {
    name: document.getElementById('name'),
    bio: document.getElementById('bio'),
    email: document.getElementById('email'),
    avatar: document.getElementById('avatar'),
    linksContainer: document.querySelector('.links-container')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePersonalInfo();
    initializeBackgroundImages();
    initializeInteractiveFeatures();
    initializeAnimations();
    initializeAccessibility();
    initializeVisibilityHandler();
});

// ===== PERSONAL INFO INITIALIZATION =====
function initializePersonalInfo() {
    // Update name
    if (elements.name) {
        elements.name.textContent = CONFIG.name;
    }
    
    // Update bio with typing effect
    if (elements.bio && CONFIG.theme.enableTypingEffect) {
        typeWriter(elements.bio, CONFIG.bio, CONFIG.theme.typingSpeed || 50);
    } else if (elements.bio) {
        elements.bio.textContent = CONFIG.bio;
    }
    
    // Update email
    if (elements.email) {
        elements.email.textContent = CONFIG.email;
        elements.email.href = `mailto:${CONFIG.email}`;
    }
    
    // Update avatar with GIF support
    if (elements.avatar) {
        updateAvatar(CONFIG.avatar.image, CONFIG.avatar.alt || `${CONFIG.name}'s Avatar`);
    }
    
    // Dynamically create and update social links
    if (elements.linksContainer && CONFIG.socialLinks) {
        elements.linksContainer.innerHTML = ''; // Clear existing links
        CONFIG.socialLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'social-link';
            linkElement.target = '_blank';
            linkElement.innerHTML = `<i class="${link.icon}"></i><span>${link.name}</span>`;
            elements.linksContainer.appendChild(linkElement);
        });
    }
}

// ===== ENHANCED AVATAR SYSTEM =====
function updateAvatar(imagePath, altText) {
    const avatar = elements.avatar;
    if (!avatar) return;

    // 直接设置图片路径和alt文本
    avatar.src = imagePath;
    avatar.alt = altText;

    avatar.onerror = function() {
        console.warn('Failed to load avatar image:', imagePath);
        // 可以设置一个备用头像
        avatar.src = 'avatar.svg';
        avatar.alt = 'Default Avatar';
    };
}

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 100) {
    // Clear any existing typing animation
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        }
    }
    
    // Start typing after a small delay
    typingTimeout = setTimeout(type, 500); // Reduced delay
}

// ===== INTERACTIVE FEATURES =====
function initializeInteractiveFeatures() {
    // Avatar click effect
    if (elements.avatar) {
        elements.avatar.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Name click to hide card and reveal background
    if (elements.name) {
        elements.name.addEventListener('click', function() {
            const profileCard = document.querySelector('.profile-card');
            const backgroundContainer = document.getElementById('backgroundContainer');
            
            if (profileCard && backgroundContainer) {
                profileCard.classList.add('hidden-by-name-click');
                backgroundContainer.classList.add('unblurred');

                const restoreView = () => {
                    profileCard.classList.remove('hidden-by-name-click');
                    backgroundContainer.classList.remove('unblurred');
                    window.removeEventListener('mousemove', restoreView, { once: true });
                };

                // Listen for the next mouse move to restore the view
                setTimeout(() => {
                    window.addEventListener('mousemove', restoreView, { once: true });
                }, 100); // Add a small delay to prevent immediate restoration
            }
        });
    }

    // Email copy functionality
    if (elements.email) {
        elements.email.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(CONFIG.email);
            showNotification('Email copied to clipboard!');
        });
    }
    
    // Social links analytics (optional)
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const linkName = this.querySelector('span').textContent;
            console.log(`Clicked on ${linkName} link`);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== VISIBILITY CHANGE HANDLER =====
function initializeVisibilityHandler() {
    document.addEventListener('visibilitychange', function() {
        // When the page becomes visible again, re-trigger the typing effect
        if (!document.hidden && elements.bio && CONFIG.theme.enableTypingEffect) {
            typeWriter(elements.bio, CONFIG.bio, CONFIG.theme.typingSpeed || 50);
        }
    });
}

// ===== DYNAMIC TITLE FEATURE =====

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.profile-card > *').forEach(section => {
        observer.observe(section);
    });
    
}

// ===== BACKGROUND IMAGE SYSTEM =====
function initializeBackgroundImages() {
    if (!CONFIG.backgroundImages.enabled || !CONFIG.theme.enableBackgroundImages) {
        setFallbackBackground();
        return;
    }
    
    detectBackgroundImages().then(images => {
        if (images.length > 0) {
            const selectedImage = selectRandomImage(images);
            setBackgroundImage(selectedImage);
        } else {
            setFallbackBackground();
        }
    });
}


function detectBackgroundImages() {
    return new Promise((resolve) => {
        const potentialImages = [
            'bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg',
            'bg1.png', 'bg2.png', 'bg3.png', 'bg4.png', 'bg5.png',
            'background1.jpg', 'background2.jpg', 'background3.jpg',
            'background1.png', 'background2.png', 'background3.png',
            'wallpaper1.jpg', 'wallpaper2.jpg', 'wallpaper3.jpg',
            'wallpaper1.png', 'wallpaper2.png', 'wallpaper3.png'
        ];
        
        // Add configured images
        if (CONFIG.backgroundImages.images && CONFIG.backgroundImages.images.length > 0) {
            potentialImages.push(...CONFIG.backgroundImages.images);
        }
        
        const existingImages = [];
        let checked = 0;
        
        if (potentialImages.length === 0) {
            resolve([]);
            return;
        }
        
        potentialImages.forEach(imagePath => {
            const img = new Image();
            img.onload = () => {
                existingImages.push(imagePath);
                checked++;
                if (checked === potentialImages.length) {
                    resolve(existingImages);
                }
            };
            img.onerror = () => {
                checked++;
                if (checked === potentialImages.length) {
                    resolve(existingImages);
                }
            };
            img.src = imagePath;
        });
    });
}

function selectRandomImage(images) {
    return images[Math.floor(Math.random() * images.length)];
}

function setBackgroundImage(imagePath) {
    const container = document.getElementById('backgroundContainer');
    if (!container) return;

    const thumbPath = imagePath.replace(/(\.[\w\d_-]+)$/i, '_thumb$1');

    // 1. Set the low-res thumbnail immediately
    container.style.backgroundImage = `url('${thumbPath}')`;
    container.classList.add('loaded'); // Fade in the blurred thumbnail

    // 2. Create a new image object to load the full-res image in the background
    const fullResImage = new Image();
    fullResImage.onload = () => {
        // 3. Once loaded, set the full-res image as the background
        container.style.backgroundImage = `url('${imagePath}')`;
    };
    fullResImage.onerror = () => {
        // If the full-res image fails, the thumbnail will remain
        console.warn('Failed to load full-resolution background image:', imagePath);
    };
    
    // Start loading the full-resolution image
    fullResImage.src = imagePath;
}

function setFallbackBackground() {
    const container = document.getElementById('backgroundContainer');
    if (!container) return;
    
    if (CONFIG.backgroundImages.fallbackToGradient) {
        container.classList.add('gradient-fallback');
    } else {
        container.style.background = 'white';
        container.style.filter = 'none';
        container.style.opacity = '1';
    }
}

// ===== UTILITY FUNCTIONS =====
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--primary-blue), var(--primary-pink));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Add main content landmark
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.setAttribute('id', 'main-content');
        profileCard.setAttribute('role', 'main');
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Optimize background image loading
    if (CONFIG.backgroundImages.enabled) {
        preloadBackgroundImages();
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle responsive layout adjustments
            handleResponsiveLayout();
        }, 250);
    });
}

// ===== BACKGROUND IMAGE PRELOADING =====
function preloadBackgroundImages() {
    if (!CONFIG.backgroundImages.images || CONFIG.backgroundImages.images.length === 0) {
        return;
    }
    
    CONFIG.backgroundImages.images.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// ===== RESPONSIVE LAYOUT HANDLER =====
function handleResponsiveLayout() {
    const container = document.getElementById('backgroundContainer');
    if (container && container.style.backgroundImage) {
        // Refresh background positioning on resize
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
    }
}

// ===== THEME TOGGLE (BONUS FEATURE) =====
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-palette"></i>';
    toggle.title = 'Toggle theme';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 100;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        icon.className = document.body.classList.contains('dark-theme') 
            ? 'fas fa-sun' 
            : 'fas fa-palette';
    });
    
    document.body.appendChild(toggle);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Homepage Error:', e.error);
    // Could implement error reporting here
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        initializePersonalInfo,
        initializeBackgroundImages,
        detectBackgroundImages,
        selectRandomImage,
        setBackgroundImage,
        setFallbackBackground,
        typeWriter,
        copyToClipboard,
        showNotification
    };
}

// Initialize performance optimizations
optimizePerformance();

// Optional: Add theme toggle
// createThemeToggle();