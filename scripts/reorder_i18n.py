import sys

with open('src/lib/i18n.ts', 'r') as f:
    lines = f.readlines()

header = lines[0:1] # export const translations = {
en_block = lines[1:298] # EN up to comma
cn_block = lines[298:595] # CN up to comma
de_block = lines[595:892] # DE up to bracket
footer = lines[892:] # };

# Prepare blocks
# DE block currently ends with '    }' at 891. Needs a comma if followed by others.
# CN block currently ends with '    },' at 594.
# EN block currently ends with '    },' at 297.

new_de = [l for l in de_block]
if not new_de[-1].strip().endswith(','):
    new_de[-1] = new_de[-1].rstrip() + ',\n'

new_en = [l for l in en_block]
if not new_en[-1].strip().endswith(','):
    new_en[-1] = new_en[-1].rstrip() + ',\n'

new_cn = [l for l in cn_block]
if new_cn[-1].strip().endswith(','):
    new_cn[-1] = new_cn[-1].rstrip().rstrip(',') + '\n'

new_content = header + new_de + new_en + new_cn + footer

with open('src/lib/i18n.ts', 'w') as f:
    f.writelines(new_content)
