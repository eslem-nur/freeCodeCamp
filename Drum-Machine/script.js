const soundNames = {
    'Q': 'Heater 1',
    'W': 'Heater 2',
    'E': 'Heater 3',
    'A': 'Heater 4',
    'S': 'Clap',
    'D': 'Open HH',
    'Z': 'Kick n Hat',
    'X': 'Kick',
    'C': 'Closed HH'
};

function playDrumSound(letter) {
    // Holt das Audio-Element strikt über die ID (entspricht dem Buchstaben)
    const audio = document.getElementById(letter);
    
    if (audio) {
        // Setzt die Zeit zurück, damit schneller Klicks funktionieren
        audio.currentTime = 0;
        audio.play();

        // Aktualisiert das Display (User Story 10)
        const display = document.getElementById('display');
        if (display && soundNames[letter]) {
            display.innerText = soundNames[letter];
        }

        // Visueller Effekt (Optional, aber hilfreich)
        const button = audio.parentElement;
        if (button) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        }
    }
}

// User Story 8: Klick-Event auf document (Delegation)
document.addEventListener('click', function(event) {
    // Prüft, ob das geklickte Element (oder ein Kind davon) ein drum-pad ist
    const pad = event.target.closest('.drum-pad');
    
    if (pad && document.getElementById('pad-bank').contains(pad)) {
        const audioChild = pad.querySelector('.clip');
        if (audioChild) {
            playDrumSound(audioChild.id);
        }
    }
});

document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    if (soundNames[key]) {
        playDrumSound(key);
    }
});