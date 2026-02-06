
def check_braces(filename, start_line, end_line):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    balance = 0
    for i in range(start_line - 1, end_line):
        line = lines[i]
        for char in line:
            if char == '{':
                balance += 1
            elif char == '}':
                balance -= 1
        if balance <= 0:
            print(f"Balance hit {balance} at line {i+1}: {line.strip()}")
    print(f"Final balance from line {start_line} to {end_line}: {balance}")

check_braces('/Users/zengtao/science-theme-park/src/lib/i18n.ts', 2364, 4729)
