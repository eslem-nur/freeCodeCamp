def hanoi_solver(n):
    rods = [[i for i in range(n, 0, -1)], [], []]
    moves = []

    def format_rods():
        return ' '.join(str(r) for r in rods)

    def move_disk(from_rod, to_rod):
        disk = rods[from_rod].pop()
        rods[to_rod].append(disk)

    def hanoi(k, source, target, auxiliary):
        if k == 1:
            move_disk(source, target)
            moves.append(format_rods())
            return

        hanoi(k-1, source, auxiliary, target)

        move_disk(source, target)
        moves.append(format_rods())

        hanoi(k-1, auxiliary, target, source)

    moves.append(format_rods())

    hanoi(n, 0, 2, 1)

    return '\n'.join(moves)