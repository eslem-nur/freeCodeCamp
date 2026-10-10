// scripts-fcc.js - Sadece FCC sayfası için
let ratingInitialized = false;
let themeInitialized = false;
let menuInitialized = false;

// --- TEMA YÖNETİMİ ---
function initTheme() {
    if (themeInitialized) return;
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeInitialized = true;
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    const btn = document.querySelector('#themeToggle');
    if (icon && btn) {
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

// --- SEKME YÖNETİMİ ---
function switchSkillTab(tabName) {
    const buttons = document.querySelectorAll('#skills .skill-tab-btn');
    const groups = document.querySelectorAll('#skills .skill-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    groups.forEach(group => group.style.display = 'none');

    const targetGroup = document.getElementById('group-' + tabName);
    if (targetGroup) {
        targetGroup.style.display = 'grid';
    }
}

function switchProjectTab(tabName) {
    const buttons = document.querySelectorAll('#projects .project-tab-btn');
    const groups = document.querySelectorAll('#projects .project-group');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    groups.forEach(group => group.style.display = 'none');

    const targetGroup = document.getElementById('group-' + tabName);
    if (targetGroup) {
        targetGroup.style.display = 'grid';
        localStorage.setItem('lastFCCProjectTab', tabName); // Farklı key
    }
}

// --- YIL GÜNCELLEME ---
function updateYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// --- SAYFA YÜKLENDİĞİNDE ---
document.addEventListener('DOMContentLoaded', () => {
    // Project tabs
    const savedProjectTab = localStorage.getItem('lastFCCProjectTab');
    const projectBtns = document.querySelectorAll('#projects .project-tab-btn');
    const projectGroups = document.querySelectorAll('#projects .project-group');

    if (projectGroups.length > 0) {
        projectGroups.forEach(g => g.style.display = 'none');
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
                grp.style.display = 'grid';
            }
        } else {
            const defBtn = Array.from(projectBtns).find(b => b.getAttribute('onclick').includes("'python'"));
            const defGrp = document.getElementById('group-python');
            if (defBtn && defGrp) {
                defBtn.classList.add('active');
                defBtn.setAttribute('aria-selected', 'true');
                defGrp.style.display = 'grid';
            }
        }
    }

    // Skill tabs
    const skillBtns = document.querySelectorAll('#skills .skill-tab-btn');
    const skillGroups = document.querySelectorAll('#skills .skill-group');
    
    if (skillGroups.length > 0) {
        skillGroups.forEach(g => g.style.display = 'none');
        skillBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });

        const defBtn = Array.from(skillBtns).find(b => b.getAttribute('onclick').includes("'programming'"));
        const defGrp = document.getElementById('group-programming');
        if (defBtn && defGrp) {
            defBtn.classList.add('active');
            defBtn.setAttribute('aria-selected', 'true');
            defGrp.style.display = 'grid';
        }
    }

    initTheme();
    initThemeToggle();
    updateYear();
});