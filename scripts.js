// ============================================
// ESLEM NUR | FCC PROJE SAYFASI - SCRIPTS
// Ana Portfolyo Sitesi ile Uyumlu
// ============================================

// --- TEMA YÖNETİMİ ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

// --- MOBİL MENÜ ---
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// --- DİL MENÜSÜ ---
function toggleLangMenu() {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.toggle('active');
    }
}

document.addEventListener('click', function(e) {
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// --- SEKME YÖNETİMİ (Skills) ---
function switchSkillTab(tabName) {
    const buttons = document.querySelectorAll('#skills .skill-tab-btn');
    const groups = document.querySelectorAll('#skills .skill-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    groups.forEach(group => group.classList.add('hidden'));

    const targetGroup = document.getElementById('group-' + tabName);
    const targetBtn = Array.from(buttons).find(b => b.getAttribute('onclick').includes(`'${tabName}'`));
    
    if (targetGroup) {
        targetGroup.classList.remove('hidden');
    }
    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }
}

// --- SEKME YÖNETİMİ (Projects) ---
function switchProjectTab(tabName) {
    const buttons = document.querySelectorAll('#projects .project-tab-btn');
    const groups = document.querySelectorAll('#projects .project-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    groups.forEach(group => group.classList.add('hidden'));

    const targetGroup = document.getElementById('group-' + tabName);
    const targetBtn = Array.from(buttons).find(b => b.getAttribute('onclick').includes(`'${tabName}'`));
    
    if (targetGroup) {
        targetGroup.classList.remove('hidden');
        localStorage.setItem('lastFCCProjectTab', tabName);
    }
    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }
}

// --- YIL GÜNCELLEME ---
function updateYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// --- EMAIL KOPYALAMA ---
function copyEmail() {
    const email = 'eslemnur-official@proton.me';
    const feedback = document.getElementById('copyFeedback');
    
    if (!feedback) return;
    
    navigator.clipboard.writeText(email).then(() => {
        feedback.style.opacity = '1';
        
        const lang = document.documentElement.lang || 'tr';
        
        switch(lang) {
            case 'en':
                feedback.textContent = 'Copied!';
                break;
            case 'de':
                feedback.textContent = 'Kopiert!';
                break;
            case 'fr':
                feedback.textContent = 'Copié!';
                break;
            case 'ar':
                feedback.textContent = 'نُسِخَ!';
                break;
            default:
                feedback.textContent = 'Kopyalandı!';
        }
        
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        feedback.style.opacity = '1';
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    });
}

// --- SAYFA YÜKLENDİĞİNDE ---
document.addEventListener('DOMContentLoaded', () => {
    // Project tabs restore
    const savedProjectTab = localStorage.getItem('lastFCCProjectTab');
    const projectBtns = document.querySelectorAll('#projects .project-tab-btn');
    const projectGroups = document.querySelectorAll('#projects .project-group');

    if (projectGroups.length > 0) {
        projectGroups.forEach(g => g.classList.add('hidden'));
        projectBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        if (savedProjectTab) {
            const btn = Array.from(projectBtns).find(b => b.getAttribute('onclick').includes(`'${savedProjectTab}'`));
            const grp = document.getElementById('group-' + savedProjectTab);
            if (btn && grp) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                grp.classList.remove('hidden');
            }
        } else {
            const defBtn = Array.from(projectBtns).find(b => b.getAttribute('onclick').includes("'python'"));
            const defGrp = document.getElementById('group-python');
            if (defBtn && defGrp) {
                defBtn.classList.add('active');
                defBtn.setAttribute('aria-selected', 'true');
                defGrp.classList.remove('hidden');
            }
        }
    }

    // Skill tabs initialize
    const skillBtns = document.querySelectorAll('#skills .skill-tab-btn');
    const skillGroups = document.querySelectorAll('#skills .skill-group');
    
    if (skillGroups.length > 0) {
        skillGroups.forEach(g => g.classList.add('hidden'));
        skillBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        const defBtn = Array.from(skillBtns).find(b => b.getAttribute('onclick').includes("'programming'"));
        const defGrp = document.getElementById('group-programming');
        if (defBtn && defGrp) {
            defBtn.classList.add('active');
            defBtn.setAttribute('aria-selected', 'true');
            defGrp.classList.remove('hidden');
        }
    }

    // Initialize theme
    initTheme();
    initThemeToggle();
    updateYear();
    
    // Enter key support for email copy
    const emailWrapper = document.querySelector('.email-copy-wrapper');
    if (emailWrapper) {
        emailWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyEmail();
            }
        });
    }
});