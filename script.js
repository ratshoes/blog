// ============================================================
// Blog Posts - Add new posts here
// ============================================================
const blogPosts = [
    {
        id: 'passing-security-plus',
        title: 'I Passed the Security+. Now What?',
        date: '2026-02-14',
        category: 'Career',
        categoryClass: 'category-career',
        featuredImage: 'blog-images/Screenshot 2026-02-14 at 3.36.26 AM.png',
        excerpt: 'Walked into a testing center on February 13th not sure if I was ready. Walked out with a Security+ certification. Here\'s the honest rundown.',
        content: `
            <p>So yeah. I passed.</p>

            <p>February 13th, I sat down at the Pearson VUE center, clicked through the NDA stuff they make you agree to, and stared at the first question on the CompTIA Security+ SY0-701. My hands were honestly a little shaky. Probably shouldn't have had that second cup of coffee but here we are.</p>

            <p>I won't lie and say I felt confident going in. I'd been studying for about 20 days, maybe 60 hours total if you count the nights where I dozed off mid-flashcard. But something clicked during the exam. All those random acronyms and frameworks actually started making sense when they threw real scenarios at me.</p>

            <h2>How I Actually Studied</h2>

            <p>Look, there's no secret formula here. Professor Messer on YouTube was my go-to. Free, thorough, and the guy just explains things in a way that sticks. I watched his entire SY0-701 series probably one and a half times through.</p>

            <p>The thing that really helped though? Writing stuff down by hand. Old school, I know. But something about physically writing out the CIA triad for the tenth time, or sketching out how Kerberos authentication works, that made it click in a way that just watching videos never did. My notebook looked like a mess by the end. Diagrams everywhere, sticky notes falling out. It worked though.</p>

            <p>Practice exams were huge too. Not because they predict what's on the real test (they don't, not really) but because they show you where your gaps are. I kept bombing questions about cryptographic implementations early on, so I went back and drilled that section until I could explain symmetric vs asymmetric encryption to my cat. She wasn't impressed but I got better at it.</p>

            <h2>The Exam Itself</h2>

            <p>Here's what caught me off guard. The PBQs (performance-based questions) hit you right at the start. No warmup. You're immediately looking at network diagrams and trying to configure firewall rules or identify what's wrong with a security setup. I'd heard people say "skip them and come back" and honestly that's solid advice. I flagged them, knocked out the multiple choice stuff to build some momentum, then circled back with a clearer head.</p>

            <p>The multiple choice questions were heavier on scenarios than I expected. It wasn't just "what is a buffer overflow?" It was more like "a user reports they can't access the company VPN after a recent update, and logs show repeated failed authentication attempts from an unusual IP, what should you do first?" That kind of thing. You gotta think through problems, not just recall definitions.</p>

            <h2>What Got Me Through It</h2>

            <p>Consistency more than anything. Some days I only studied for half an hour because life happens. Other days I'd lock in for three or four hours straight. But I touched the material every single day for those 20 days. No days off. Even when I didn't feel like it, even when the content was dry (looking at you, governance and compliance), I showed up.</p>

            <p>Also, and this might sound weird, but talking about what I learned out loud helped a ton. I'd explain concepts to nobody in particular while making dinner or driving. If I stumbled trying to explain something, that told me I didn't actually understand it yet.</p>

            <h2>So What Now?</h2>

            <p>CCNA is next on the list. I'm pivoting from security theory into networking, which honestly feels like a natural progression. A lot of what Security+ covered around network infrastructure and protocols gave me a decent foundation. But networking is its own beast and I know the CCNA is going to be a different kind of challenge.</p>

            <p>No exam date set yet. I want to actually take my time with this one and build up some lab experience along the way. But the momentum is there. One cert down, three to go.</p>

            <p>If you're thinking about going for the Security+ yourself, just start. Seriously. Stop reading Reddit threads about whether it's worth it and just start studying. You'll figure out the rest as you go.</p>
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
