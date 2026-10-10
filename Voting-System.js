// 1. Initialisiere die Variable 'poll' als ein neues Map-Objekt
const poll = new Map();

// 2. Funktion zum Hinzufügen einer Option
function addOption(option) {
    // Falls die Option leer oder nur ein Leerzeichen ist
    if (!option || option.trim() === "") {
        return "Option cannot be empty.";
    }
    
    // Falls die Option bereits existiert
    if (poll.has(option)) {
        return `Option "${option}" already exists.`;
    }
    
    // Füge die Option mit einem leeren Set als Wert hinzu
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
}

// 3. Funktion zur Stimmabgabe
function vote(option, voterId) {
    // Falls die Option nicht in der Map existiert
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
    }
    
    // Hole das Set der Wähler für diese Option
    const voters = poll.get(option);
    
    // Falls der Wähler bereits für diese Option gestimmt hat
    if (voters.has(voterId)) {
        return `Voter ${voterId} has already voted for "${option}".`;
    }
    
    // Füge den Wähler dem Set hinzu und registriere die Stimme
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
}

// 4. Funktion zur Anzeige der Ergebnisse
function displayResults() {
    let resultString = "Poll Results:";
    
    // Iteriere durch alle Einträge der Map
    for (let [option, voters] of poll.entries()) {
        resultString += `\n${option}: ${voters.size} votes`;
    }
    
    return resultString;
}

// 5. & 6. Erfülle die Bedingungen für mindestens 3 Optionen und 3 Stimmen im Poll
// Diese Zeilen initialisieren das System so, wie es die Tests 5 und 6 verlangen
addOption("Turkey");
addOption("Morocco");
addOption("Spain");

vote("Turkey", "traveler1");
vote("Turkey", "traveler2");
vote("Morocco", "traveler3");