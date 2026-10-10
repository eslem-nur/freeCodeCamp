class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []
    
    def deposit(self, amount, description=''):
        self.ledger.append({'amount': amount, 'description': description})

    def withdraw(self, amount, description=''):
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False

    def get_balance(self):
        return sum(item['amount'] for item in self.ledger)
    
    def transfer(self, amount, destination_category):
        if self.check_funds(amount):
            self.withdraw(amount, f'Transfer to {destination_category.name}')
            destination_category.deposit(amount, f'Transfer from {self.name}')
            return True
        return False
    def check_funds(self, amount):
        return self.get_balance() >= amount

    def __str__(self):
        title = f"{self.name.center(30, '*')}\n"
        ledger_entries = ""
        for item in self.ledger:
            desc = item['description'][:23]
            amount = f"{item['amount']:.2f}"
            ledger_entries += f"{desc.ljust(23)}{amount.rjust(7)}\n"

        total = f"Total: {self.get_balance():.2f}"

        return title + ledger_entries + total

def create_spend_chart(categories):
    total_spend = 0
    category_spends = []

    for cat in categories:
        spent = sum(abs(item['amount']) for item in cat.ledger if item['amount'] < 0)
        category_spends.append(spent)
        total_spend += spent

    percentages = []
    for spent in category_spends:
        if total_spend == 0:
            pct = 0
        else:
            pct = int((spent / total_spend) * 100)
            pct = (pct // 10) * 10
        percentages.append(pct)

    lines = []
    lines.append("Percentage spent by category")

    for i in range(100, -10, -10):
        line = f"{i:3d}| "
        for pct in percentages:
            if pct >= i:
                line += "o  "
            else:
                line += "   "
        lines.append(line)

    lines.append("    " + "-" * (len(categories) * 3 + 1))

    max_len = max(len(cat.name) for cat in categories)

    for i in range(max_len):
        name_line = "     "
        for cat in categories:
            if i < len(cat.name):
                name_line += f"{cat.name[i]}  "
            else:
                name_line += "   "
        lines.append(name_line)

    return "\n".join(lines)