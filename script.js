// ============================================================
// Blog Posts - Add new posts here
// ============================================================
const blogPosts = [
    {
        id: 'passing-security-plus',
        title: 'I Passed Security+ -- Here\'s What I Learned',
        date: '2026-02-14',
        category: 'Career',
        categoryClass: 'category-career',
        featuredImage: null,
        excerpt: 'After weeks of intense study, I passed the CompTIA Security+ exam. Here are my takeaways, study strategies, and what surprised me on test day.',
        content: `
            <p>After weeks of grinding through Professor Messer videos, practice exams, and late-night flashcard sessions, I sat down at the testing center on February 13th and passed the CompTIA Security+ SY0-701 exam.</p>

            <h2>My Study Approach</h2>
            <p>I used a combination of video lectures, hands-on labs, and spaced repetition. The key was consistency -- studying every single day, even if only for 30 minutes on busy days. I logged around 60 hours of total study time across 20 active days.</p>

            <h2>What Surprised Me</h2>
            <p>The exam leaned heavily into scenario-based questions. Memorizing definitions wasn't enough; you need to understand <em>when</em> and <em>why</em> to apply each concept. The performance-based questions at the start tested practical knowledge of network diagrams and security configurations.</p>

            <h2>Resources That Helped Most</h2>
            <p>Professor Messer's free video series was the backbone. I supplemented with practice exams to identify weak areas, then went back and drilled those sections. Taking notes by hand for key concepts like the CIA triad, authentication models, and cryptographic solutions helped cement the material.</p>

            <h2>What's Next</h2>
            <p>CCNA is the next target. I'm shifting gears from security theory to hands-on networking. The foundation from Security+ -- especially the networking and infrastructure sections -- gives me a head start. Stay tuned for that journey.</p>
        `
    },
    // Add new blog posts above this line
];

// ============================================================
// Modal Functions
// ============================================================
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

// ============================================================
// Confetti effect for Security+ logo
// ============================================================
function createConfetti(container) {
    const colors = ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#ffffff', '#fbbf24'];
    const confettiCount = 40;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 1) + 's';
        confetti.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        container.appendChild(confetti);
    }

    setTimeout(() => {
        container.querySelectorAll('.confetti-piece').forEach(p => p.remove());
    }, 2000);
}

// ============================================================
// Blog View Functions
// ============================================================
function generateBlogView() {
    if (blogPosts.length === 0) {
        return `
            <div class="section-header">
                <h2 class="section-title">Blog</h2>
            </div>
            <div class="post-card" style="text-align: center; padding: var(--spacing-3xl);">
                <h3 class="post-title" style="font-size: 2rem; margin-bottom: var(--spacing-lg);">Coming Soon</h3>
                <p class="post-content" style="font-size: 1.1rem;">Blog posts are on the way.</p>
            </div>
        `;
    }

    const cards = blogPosts.map(post => `
        <article class="post-card blog-card" onclick="openBlogPost('${post.id}')">
            ${post.featuredImage
                ? `<img src="${post.featuredImage}" alt="${post.title}" class="blog-card-image" loading="lazy">`
                : `<div class="blog-card-image-placeholder">&mdash;</div>`
            }
            <div class="blog-card-body">
                <div class="post-header">
                    <span class="post-category ${post.categoryClass}">${post.category}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
            </div>
        </article>
    `).join('');

    return `
        <div class="section-header">
            <h2 class="section-title">Blog</h2>
        </div>
        <div class="blog-grid">
            ${cards}
        </div>
    `;
}

function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="blog-post-full">
            <button class="blog-post-back" onclick="returnToBlogList()">&#8592; Back to Blog</button>
            ${post.featuredImage
                ? `<img src="${post.featuredImage}" alt="${post.title}" class="blog-post-hero-image">`
                : ''
            }
            <div class="blog-post-meta">
                <span class="post-category ${post.categoryClass}">${post.category}</span>
                <span class="post-date">${post.date}</span>
            </div>
            <h1 class="blog-post-title">${post.title}</h1>
            <div class="blog-post-body">
                ${post.content}
            </div>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function returnToBlogList() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = generateBlogView();
    currentView = 'blog';
}

// ============================================================
// Navigation between views
// ============================================================
const viewsContent = {
    timeline: document.getElementById('main-content').innerHTML,
    certs: `
        <div class="section-header">
            <h2 class="section-title">Certifications</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--spacing-xl);">
            <!-- Security+ Card - COMPLETED 100% -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div id="secplus-logo" class="cert-logo-container" style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); position: relative; border-radius: var(--radius-lg); overflow: visible; box-shadow: var(--md-sys-elevation-3); cursor: pointer;">
                    <div style="width: 100%; height: 100%; position: relative; border-radius: var(--radius-lg); overflow: hidden;">
                        <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #052e16, #022c22);"></div>
                        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100%; background: linear-gradient(135deg, #22c55e, #16a34a); transition: height 0.5s ease-out;"></div>
                        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                            <div style="color: white; font: var(--md-sys-typescale-headline-large); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                                <div style="font-size: 3rem; font-weight: 700;">SEC+</div>
                                <div style="font-size: 0.75rem; opacity: 0.9; margin-top: -8px;">CompTIA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="post-title">Security+</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Foundation-level security certification covering threats, vulnerabilities, and security best practices.</p>
                <span class="post-category" style="background: #052e16; color: #22c55e; border: 1px solid #22c55e;">COMPLETED</span>
            </div>

            <!-- CCNA Card - 0% progress -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--md-sys-elevation-3);">
                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #0a2a3a, #051a25);"></div>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(135deg, #0ea5e9, #0284c7); transition: height 0.5s ease-out;"></div>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                        <div style="color: white; font: var(--md-sys-typescale-headline-large); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                            <div style="font-size: 3rem; font-weight: 700;">CCNA</div>
                            <div style="font-size: 0.75rem; opacity: 0.9; margin-top: -8px;">Cisco</div>
                        </div>
                    </div>
                </div>
                <h3 class="post-title">CCNA</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Networking fundamentals, IP connectivity, security fundamentals, and automation basics.</p>
                <span class="post-category category-cert">Target: Q1 2026</span>
            </div>

            <!-- AWS Card - 0% progress -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--md-sys-elevation-3);">
                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #3a2a0a, #2a1f05);"></div>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(135deg, #f59e0b, #d97706); transition: height 0.5s ease-out;"></div>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                        <div style="color: white; font: var(--md-sys-typescale-headline-large); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                            <div style="font-size: 2.5rem; font-weight: 700;">AWS</div>
                            <div style="font-size: 0.65rem; opacity: 0.9; margin-top: -4px;">ADVANCED NET</div>
                        </div>
                    </div>
                </div>
                <h3 class="post-title">AWS Advanced Networking</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Specialty certification for complex AWS networking and hybrid connectivity solutions.</p>
                <span class="post-category category-cert">Target: Q2 2026</span>
            </div>

            <!-- CCNP Card - 0% progress -->
            <div class="post-card" style="text-align: center; padding: var(--spacing-2xl);">
                <div style="width: 150px; height: 150px; margin: 0 auto var(--spacing-lg); position: relative; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--md-sys-elevation-3);">
                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #1f1535, #150f25);"></div>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(135deg, #8b5cf6, #7c3aed); transition: height 0.5s ease-out;"></div>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                        <div style="color: white; font: var(--md-sys-typescale-headline-large); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                            <div style="font-size: 2.75rem; font-weight: 700;">CCNP</div>
                            <div style="font-size: 0.65rem; opacity: 0.9; margin-top: -4px;">ENTERPRISE</div>
                        </div>
                    </div>
                </div>
                <h3 class="post-title">CCNP Enterprise</h3>
                <p class="post-content" style="margin-bottom: var(--spacing-lg);">Professional-level certification for advanced enterprise networking solutions.</p>
                <span class="post-category category-cert">Target: Q3-Q4 2026</span>
            </div>
        </div>
    `
};

let currentView = 'timeline';

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.nav-button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const view = this.dataset.view;
        currentView = view;

        const mainContent = document.getElementById('main-content');

        if (view === 'blog') {
            mainContent.innerHTML = generateBlogView();
        } else {
            mainContent.innerHTML = viewsContent[view];
        }

        if (view === 'certs') {
            attachConfettiListener();
        }
    });
});

function attachConfettiListener() {
    const secplusLogo = document.getElementById('secplus-logo');
    if (secplusLogo) {
        secplusLogo.addEventListener('mouseenter', function() {
            createConfetti(this);
        });
    }
}

// ============================================================
// Animations & Effects
// ============================================================

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

    const letters = originalText.replace(/[^a-zA-Z]/g, '').split('');

    const interval = setInterval(() => {
        let scrambled = '';

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
