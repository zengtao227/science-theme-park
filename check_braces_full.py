
def check_braces(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    balance = 0
    in_trans = False
    for i, line in enumerate(lines):
        if 'export const translations = {' in line:
            in_trans = True
            balance = 1
            print(f"Start: Line {i+1}, Balance {balance}")
            continue
        
        if in_trans:
            for char in line:
                if char == '{': balance += 1
                elif char == '}': balance -= 1
            
            if balance == 1:
                 # Check what line this is. If it is high up, we closed translations too early.
                 if i > 100:
                    print(f"CRITICAL: Balance hit 1 at line {i+1}: {line.strip()}")
            if balance == 0:
                 print(f"DEAD: Balance hit 0 at line {i+1}: {line.strip()}")
                 break

check_braces('/Users/zengtao/science-theme-park/src/lib/i18n.ts')
