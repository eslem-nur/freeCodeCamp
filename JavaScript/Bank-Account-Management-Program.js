// 1. Definiere die Klasse BankAccount
class BankAccount {
    constructor() {
        // 2. Initialisiere das Startguthaben mit 0 und ein leeres Array für Transaktionen
        this.balance = 0;
        this.transactions = [];
    }

    // 3. Methode für Einzahlungen
    deposit(amount) {
        if (amount <= 0) {
            return "Deposit amount must be greater than zero.";
        }

        // Transaktion als Objekt speichern
        this.transactions.push({ type: 'deposit', amount: amount });
        // Guthaben aktualisieren
        this.balance += amount;

        return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    }

    // 4. Methode für Auszahlungen
    withdraw(amount) {
        if (amount <= 0 || amount > this.balance) {
            return "Insufficient balance or invalid amount.";
        }

        // Transaktion als Objekt speichern
        this.transactions.push({ type: 'withdraw', amount: amount });
        // Guthaben aktualisieren
        this.balance -= amount;

        return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    }

    // 5. Methode zur Guthabenabfrage
    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    // 6. Methode zum Auflisten aller Einzahlungen
    listAllDeposits() {
        const deposits = this.transactions
            .filter(t => t.type === 'deposit')
            .map(t => t.amount);
            
        return `Deposits: ${deposits.join(',')}`;
    }

    // 7. Methode zum Auflisten aller Auszahlungen
    listAllWithdrawals() {
        const withdrawals = this.transactions
            .filter(t => t.type === 'withdraw')
            .map(t => t.amount);
            
        return `Withdrawals: ${withdrawals.join(',')}`;
    }
}

// 18. Erstelle eine Instanz der Klasse namens myAccount
const myAccount = new BankAccount();



myAccount.deposit(200); // Einzahlung 1
myAccount.deposit(150); // Einzahlung 2
myAccount.withdraw(50);  // Auszahlung 1
myAccount.withdraw(30);  // Auszahlung 2
myAccount.deposit(50);  // Einzahlung 3 (Transaktion Nr. 5)