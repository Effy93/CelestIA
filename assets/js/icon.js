// assets/js/icon.js

// Liste par défaut des icônes Font Awesome
export const defaultIcons = [
    'fa-regular fa-lightbulb',
    'fa-solid fa-fire-flame-curved',
    'fa-solid fa-moon',
    'fa-solid fa-wand-magic-sparkles',
    'fa-solid fa-crown',
    'fa-solid fa-dragon',
];

// Liste de couleurs possibles
const defaultColors = ['#b0b0ff', '#70d6ff'];

// Crée ou récupère le container pour les icônes
function getContainerIcons() {
    let container = document.querySelector('.floating-icons-container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('floating-icons-container');

        const main = document.querySelector('main');
        if (main) {
            main.prepend(container);
        } else {
            document.body.prepend(container);
        }
    }
    return container;
}

// Initialise les icônes animées
export function InitIcons({
    numberOfIcons = 20,
    iconList = defaultIcons,
    colors = defaultColors
} = {}) {
    const container = getContainerIcons();
    if (!container) return;

    for (let i = 0; i < numberOfIcons; i++) {
        const icon = document.createElement('i');

        // Icône et couleur aléatoire
        const randomIcon = iconList[Math.floor(Math.random() * iconList.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        icon.className = randomIcon + ' float-icons';
        icon.style.color = randomColor;
        icon.style.opacity = 0.2;

        // Position et animation aléatoires
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.fontSize = (Math.random() * 1.5 + 0.7) + 'rem';
        icon.style.animationDuration = (Math.random() * 10 + 20) + 's';
        icon.style.animationDelay = '-' + (Math.random() * 20) + 's';

        container.appendChild(icon);
    }
}
