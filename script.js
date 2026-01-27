// Modal Functions
function openModal() {
    if (!checkPassword()) {
        return;
    }
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('postForm').reset();
}

function openPost(item) {
    const category = item.querySelector('.post-category').textContent;
    const title = item.querySelector('.post-title').textContent;
    const date = item.querySelector('.post-date').textContent;
    const content = item.querySelector('.post-content').textContent;
    
    document.getElementById('fullPostCategory').textContent = category;
    document.getElementById('fullPostTitle').textContent = title;
    document.getElementById('fullPostDate').textContent = date;
    document.getElementById('fullPostContent').textContent = content;
    
    document.getElementById('postModal').classList.add('active');
}

function closePostModal() {
    document.getElementById('postModal').classList.remove('active');
}

// Close modals on outside click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('postModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePostModal();
    }
});

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('postCategory').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    addPost(category, title, content);
    closeModal();
});

function addPost(category, title, content) {
    const timeline = document.getElementById('timeline');
    const today = new Date().toISOString().split('T')[0];
    
    const categoryClass = category === 'cert' ? 'category-cert' : 'category-project';
    const categoryLabel = category === 'cert' ? 'Certification' : 'Project';
    
    const postHTML = `
        <div class="timeline-item" onclick="openPost(this)">
            <article class="post-card">
                <div class="post-header">
                    <span class="post-date">${today}</span>
                </div>
                <span class="post-category ${categoryClass}">${categoryLabel}</span>
                <h3 class="post-title">${title}</h3>
                <p class="post-content">${content}</p>
            </article>
        </div>
    `;
    
    timeline.insertAdjacentHTML('afterbegin', postHTML);
    
    // Update stats
    updateStats();
}

function updateStats() {
    // Update stats when entries are added
}

// Navigation between views
const viewsContent = {
    timeline: document.getElementById('main-content').innerHTML,
    certs: `
        <div class="section-header">
            <h2 class="section-title">Certifications</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--spacing-xl);">
            <!-- Security+ Card -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; box-shadow: var(--md-sys-elevation-3);">
                    <div style="color: white; font: var(--md-sys-typescale-headline-large);">
                        <div style="font-size: 3rem; font-weight: 700;">SEC+</div>
                        <div style="font-size: 0.75rem; opacity: 0.9; margin-top: -8px;">CompTIA</div>
                    </div>
                </div>
                <h3 class="post-title">Security+</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Foundation-level security certification covering threats, vulnerabilities, and security best practices.</p>
                <span class="post-category category-cert">Target: Feb 9, 2026</span>
            </div>

            <!-- CCNA Card -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; box-shadow: var(--md-sys-elevation-3);">
                    <div style="color: white; font: var(--md-sys-typescale-headline-large);">
                        <div style="font-size: 3rem; font-weight: 700;">CCNA</div>
                        <div style="font-size: 0.75rem; opacity: 0.9; margin-top: -8px;">Cisco</div>
                    </div>
                </div>
                <h3 class="post-title">CCNA</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Networking fundamentals, IP connectivity, security fundamentals, and automation basics.</p>
                <span class="post-category category-cert">Target: Q1 2026</span>
            </div>

            <!-- AWS Card -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; box-shadow: var(--md-sys-elevation-3);">
                    <div style="color: white; font: var(--md-sys-typescale-headline-large);">
                        <div style="font-size: 2.5rem; font-weight: 700;">AWS</div>
                        <div style="font-size: 0.65rem; opacity: 0.9; margin-top: -4px;">ADVANCED NET</div>
                    </div>
                </div>
                <h3 class="post-title">AWS Advanced Networking</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Specialty certification for complex AWS networking and hybrid connectivity solutions.</p>
                <span class="post-category category-cert">Target: Q2 2026</span>
            </div>

            <!-- CCNP Card -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; box-shadow: var(--md-sys-elevation-3);">
                    <div style="color: white; font: var(--md-sys-typescale-headline-large);">
                        <div style="font-size: 2.75rem; font-weight: 700;">CCNP</div>
                        <div style="font-size: 0.65rem; opacity: 0.9; margin-top: -4px;">ENTERPRISE</div>
                    </div>
                </div>
                <h3 class="post-title">CCNP Enterprise</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Professional-level certification for advanced enterprise networking solutions.</p>
                <span class="post-category category-cert">Target: Q3-Q4 2026</span>
            </div>
        </div>
    `
};

// Store original timeline content
let currentView = 'timeline';

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.nav-button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const view = this.dataset.view;
        currentView = view;

        // Update main content
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = viewsContent[view];
    });
});

// Animate progress bars on load
window.addEventListener('load', function() {
    document.querySelectorAll('.progress-fill').forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
});

// Exam countdown
function updateCountdown() {
    const examDate = new Date('2026-02-09');
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('examCountdown').textContent = diffDays;
}
updateCountdown();

// Typing animation
function typeText(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('done');
        }
    }
    type();
}

window.addEventListener('load', function() {
    const titleElement = document.getElementById('typed-title');
    if (titleElement) {
        setTimeout(() => typeText(titleElement, "Hi I'm Steven", 80), 500);
    }
});

// Scramble text effect on hover using word's own letters
function scrambleText(element, originalText) {
    const duration = 1500;
    const frameRate = 30;
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;

    // Get only the letters from the text (no spaces or punctuation)
    const letters = originalText.replace(/[^a-zA-Z]/g, '').split('');

    const interval = setInterval(() => {
        let scrambled = '';
        let letterIndex = 0;

        for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === ' ' || originalText[i] === "'") {
                scrambled += originalText[i];
            } else if (frame / totalFrames > i / originalText.length) {
                scrambled += originalText[i];
            } else {
                scrambled += letters[Math.floor(Math.random() * letters.length)];
            }
        }
        element.textContent = scrambled;
        frame++;

        if (frame >= totalFrames) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 1000 / frameRate);
}

// Add hover listener after typing is done
setTimeout(() => {
    const titleElement = document.getElementById('typed-title');
    if (titleElement) {
        const originalText = "Hi I'm Steven";
        titleElement.addEventListener('mouseenter', () => {
            scrambleText(titleElement, originalText);
        });
    }
}, 2500);

